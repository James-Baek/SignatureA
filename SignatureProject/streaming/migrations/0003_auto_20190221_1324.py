# Generated by Django 2.1.4 on 2019-02-21 04:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('streaming', '0002_auto_20190221_1156'),
    ]

    operations = [
        migrations.AddField(
            model_name='insertupload',
            name='description',
            field=models.TextField(max_length=150, null=True, verbose_name='설명'),
        ),
        migrations.AddField(
            model_name='insertupload',
            name='genre',
            field=models.CharField(max_length=20, null=True, verbose_name='장르'),
        ),
    ]
