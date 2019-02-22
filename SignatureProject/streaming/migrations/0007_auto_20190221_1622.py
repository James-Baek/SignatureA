# Generated by Django 2.1.4 on 2019-02-21 07:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('streaming', '0006_auto_20190221_1605'),
    ]

    operations = [
        migrations.RenameField(
            model_name='insertupload',
            old_name='music_m',
            new_name='songwriter',
        ),
        migrations.AddField(
            model_name='insertupload',
            name='song_name',
            field=models.CharField(max_length=32, null=True, verbose_name='노래 이름'),
        ),
    ]