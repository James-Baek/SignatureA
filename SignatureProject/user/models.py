from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.db import models
from django.utils import timezone
from django.core.mail import send_mail


class UserManager(BaseUserManager):
    use_in_migrations = True

    def _create_user(self, email, password, **extra_fields):
        if not email:
            raise ValueError('The given email must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email=None, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self._create_user(email, password, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField('email', unique=True)
    nname = models.CharField('닉네임', max_length=45, null=True, unique=True)
    profile = models.ImageField('프로필 이미지', upload_to='img/profile/', max_length=150, null=True, blank=True, default='')
    coin = models.BigIntegerField('총보유 코인', default=0)
    nation = models.IntegerField('국적(코드)', default=0)
    is_listener = models.BooleanField('일반 사용자 권한', default=True)
    is_artist = models.BooleanField('아티스트 사용자 권한', default=False)
    is_company = models.BooleanField('기업 사용자 권한', default=False)
    artist_id = models.CharField('아티스트 ID', max_length=32, null=True, unique=True)
    artist_name = models.CharField('아티스트 이름', max_length=100)
    artist_opendate = models.DateField('데뷔일', null=True)
    artist_company = models.CharField('소속 기업 ID', max_length=32, default='none', null=True, blank=True)
    company_id = models.CharField('기업 ID', max_length=32, null=True, unique=True)
    company_name = models.CharField('기업명', max_length=45,  null=True, blank=True)
    company_ceo = models.CharField('기업 대표이름', max_length=32)
    company_tel = models.CharField('기업 전화번호', max_length=32)
    company_adr = models.CharField('기업 주소', max_length=255)
    date_joined = models.DateTimeField('가입일', default=timezone.now)
    is_staff = models.BooleanField('스테프 권한', default=False)
    is_active = models.BooleanField('이메일 인증 활성화', default=False)

    objects = UserManager()
    
    USERNAME_FIELD = 'email'                     # email을 사용자의 식별자로 설정
    # REQUIRED_FIELDS = ['email']                   # 필수입력값

    def email_user(self, subject, message, from_email=None, **kwargs):
        """Send an email to this user."""
        send_mail(subject, message, from_email, [self.email], **kwargs)