from django.http import HttpResponse
from django.views.generic import TemplateView
from django.contrib.auth.mixins import LoginRequiredMixin
from user.models import User

class MainFirstView(TemplateView):
    template_name = 'main/base.html'
    queryset = User.objects.all()

    def get(self, request, *args, **kwargs):
        ctx = {
            'view': self.__class__.__name__,
            'data': self.queryset
        }
        return self.render_to_response(ctx)


class MainDetailView(LoginRequiredMixin, TemplateView):
    template_name = 'main/main.html'
    queryset = User.objects.all()
    pk_url_kwargs = 'email'                 # 검색데이터의 primary key를 전달받을 이름

    def get_object(self, queryset=None):
        queryset = queryset or self.queryset     # queryset 파라미터 초기화
        pk = self.kwargs.get(self.pk_url_kwargs) # pk는 모델에서 정의된 pk값, 즉 모델의 id
        return queryset.filter(pk=pk).first()    # pk로 검색된 데이터가 있다면 그 중 첫번째 데이터 없다면 None 반환

    def get(self, request, *args, **kwargs):
        userinfo = self.get_object()
        if not userinfo:
            raise Http404('invalid email')  # 검색된 데이터가 없다면 에러 발생

        ctx = {
            'view': self.__class__.__name__,
            'data': userinfo
        }
        return self.render_to_response(ctx)


def hello(request, to):
    return HttpResponse('Hello {}.'.format(to))