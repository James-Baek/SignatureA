from django.contrib.auth import get_user_model
from django.views.generic import CreateView, FormView
from django.contrib.auth.views import LoginView

from user.forms import UserRegistrationForm, LoginForm, VerificationEmailForm

from user.models import User

#메일 인증
from django.contrib import messages
from django.contrib.auth.tokens import default_token_generator
from SignatureProject import settings
from django.http import HttpResponseRedirect
from django.views.generic.base import TemplateView
from user.mixin import VerifyEmailMixin


# import js2py
# from js2py.internals import seval


# 회원가입
class UserRegistrationView(VerifyEmailMixin, CreateView):
    model = get_user_model()
    template_name_suffix = '_signup'
    form_class = UserRegistrationForm
    success_url = '/user/login/'
    verify_url = '/user/varify/'


    def form_valid(self, form):
        email = form.cleaned_data['email']
        print(email)

        # f = open("D:/github/SignatureA/SignatureProject/user/createuser.js", "rt")
        # text = f.read()
        # print(text)
        # f.close()

        # try:
        #     f = open("SignatureProject/user/createuser.js", "rt")
        #     text = f.read()
        # except FileNotFoundError:
        #     print("파일이 없습니다.")
        # finally:
        #     f.close()

        # chain = js2py.eval_js(text)
        # seval.eval_js_vm(code)
        # print(chain(email))
        
        response = super().form_valid(form)
        if form.instance:
            self.send_verification_email(form.instance)
        return response




        


# 로그인
class UserLoginView(LoginView):
    authentication_form = LoginForm
    template_name = 'user/user_login.html'

    def form_invalid(self, form):
        messages.error(self.request, '로그인에 실패하였습니다.', extra_tags='danger')
        return super().form_invalid(form)




# 인증뷰
class UserVerificationView(TemplateView):

    model = get_user_model()
    redirect_url = '/user/login/'
    token_generator = default_token_generator

    def get(self, request, *args, **kwargs):
        pk = kwargs.get('pk')
        token = kwargs.get('token')
        if self.is_valid_token(pk, token):
            messages.info(request, '인증이 완료되었습니다.')
        else:
            messages.error(request, '인증이 실패되었습니다.')
        return HttpResponseRedirect(self.redirect_url)   # 인증 성공여부와 상관없이 무조건 로그인 페이지로 이동

    def is_valid_token(self, pk, token):

        user = self.model.objects.get(pk=pk)
        is_valid = self.token_generator.check_token(user, token)
        if is_valid:
            user.is_active = True
            user.save()     # 데이터가 변경되면 반드시 save() 메소드 호출
        return is_valid



# 인증 메일 재발송
class ResendVerifyEmailView(VerifyEmailMixin, FormView):
    model = get_user_model()
    form_class = VerificationEmailForm
    success_url = '/user/login/'
    template_name = 'user/resend_verify_email.html'

    def form_valid(self, form):
        email = form.cleaned_data['email']
        try:
            user = self.model.objects.get(email=email)
        except self.model.DoesNotExist:
            messages.error(self.request, '알 수 없는 사용자 입니다.')
        else:
            self.send_verification_email(user)
        return super().form_valid(form)

