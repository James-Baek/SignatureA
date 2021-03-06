# Generated by Django 2.1.4 on 2019-02-18 08:21

from django.db import migrations, models
import django.utils.timezone
import user.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0009_alter_user_last_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('email', models.EmailField(max_length=254, unique=True, verbose_name='email')),
                ('nname', models.CharField(max_length=45, null=True, unique=True, verbose_name='닉네임')),
                ('profile', models.ImageField(blank=True, default='', max_length=150, null=True, upload_to='img/profile/', verbose_name='프로필 이미지')),
                ('coin', models.BigIntegerField(default=0, verbose_name='총보유 코인')),
                ('nation', models.IntegerField(default=0, verbose_name='국적(코드)')),
                ('is_listener', models.BooleanField(default=True, verbose_name='일반 사용자 권한')),
                ('is_artist', models.BooleanField(default=False, verbose_name='아티스트 사용자 권한')),
                ('is_company', models.BooleanField(default=False, verbose_name='기업 사용자 권한')),
                ('artist_id', models.CharField(max_length=32, null=True, unique=True, verbose_name='아티스트 ID')),
                ('artist_name', models.CharField(max_length=100, verbose_name='아티스트 이름')),
                ('artist_opendate', models.DateField(null=True, verbose_name='데뷔일')),
                ('artist_company', models.CharField(blank=True, default='none', max_length=32, null=True, verbose_name='소속 기업 ID')),
                ('company_id', models.CharField(max_length=32, null=True, unique=True, verbose_name='기업 ID')),
                ('company_name', models.CharField(blank=True, max_length=45, null=True, verbose_name='기업명')),
                ('company_ceo', models.CharField(max_length=32, verbose_name='기업 대표이름')),
                ('company_tel', models.CharField(max_length=32, verbose_name='기업 전화번호')),
                ('company_adr', models.CharField(max_length=255, verbose_name='기업 주소')),
                ('date_joined', models.DateTimeField(default=django.utils.timezone.now, verbose_name='가입일')),
                ('is_staff', models.BooleanField(default=False, verbose_name='스테프 권한')),
                ('is_active', models.BooleanField(default=False, verbose_name='이메일 인증 활성화')),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.Group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.Permission', verbose_name='user permissions')),
            ],
            options={
                'abstract': False,
            },
            managers=[
                ('objects', user.models.UserManager()),
            ],
        ),
    ]
