# Generated by Django 2.1.2 on 2019-01-29 06:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('photo', '0003_auto_20190129_1531'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='photo',
            name='agency',
        ),
        migrations.AddField(
            model_name='album',
            name='agency',
            field=models.CharField(max_length=30, null=True, verbose_name='기획사'),
        ),
        migrations.AddField(
            model_name='album',
            name='title',
            field=models.CharField(max_length=50, null=True),
        ),
        migrations.AddField(
            model_name='album',
            name='upload_date',
            field=models.DateTimeField(auto_now_add=True, null=True, verbose_name='Upload Date'),
        ),
        migrations.AlterField(
            model_name='photo',
            name='title',
            field=models.CharField(max_length=50, null=True),
        ),
    ]