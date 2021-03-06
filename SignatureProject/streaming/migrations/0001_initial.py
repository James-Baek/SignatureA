# Generated by Django 2.1.4 on 2019-02-18 08:21

from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Album',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=100, verbose_name='앨범이름')),
                ('music_w', models.CharField(max_length=30, null=True, verbose_name='작사가')),
                ('music_m', models.CharField(blank=True, max_length=30, null=True, verbose_name='작곡가')),
                ('agency', models.CharField(max_length=30, null=True, verbose_name='기획사')),
                ('price', models.IntegerField(null=True, verbose_name='음원가격')),
                ('url', models.URLField(max_length=254, verbose_name='photo및 상세앨범')),
                ('hash', models.URLField(max_length=254, verbose_name='해쉬값')),
            ],
            options={
                'ordering': ['name'],
            },
        ),
        migrations.CreateModel(
            name='Artist',
            fields=[
                ('name', models.CharField(max_length=100)),
                ('mbid', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('url', models.URLField(max_length=254, verbose_name='아티스트 사진 설명페이지url')),
            ],
        ),
        migrations.CreateModel(
            name='InsertUpload',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('email', models.EmailField(max_length=72)),
                ('artist', models.CharField(max_length=32, verbose_name='아티스트')),
                ('music_m', models.CharField(max_length=32, verbose_name='작곡가')),
                ('price', models.BigIntegerField(verbose_name='가격')),
            ],
        ),
        migrations.CreateModel(
            name='Streaming',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('music_w', models.CharField(max_length=30, null=True, verbose_name='작사가')),
                ('music_img', models.URLField(blank=True, null=True, verbose_name='음원 이미지 경로')),
                ('music_genre', models.IntegerField(null=True, verbose_name='음악장르')),
            ],
        ),
        migrations.AddField(
            model_name='artist',
            name='album',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='artists', to='streaming.Streaming'),
        ),
        migrations.AddField(
            model_name='album',
            name='streaming',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='albums', to='streaming.Streaming'),
        ),
        migrations.AlterUniqueTogether(
            name='album',
            unique_together={('url', 'name')},
        ),
    ]
