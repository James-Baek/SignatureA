# Generated by Django 2.1.4 on 2019-02-24 06:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('streaming', '0008_hash'),
    ]

    operations = [
        migrations.AddField(
            model_name='insertupload',
            name='hash',
            field=models.CharField(max_length=46, null=True, verbose_name='hash'),
        ),
    ]
