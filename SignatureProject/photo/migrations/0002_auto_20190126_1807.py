# Generated by Django 2.1.2 on 2019-01-26 09:07

from django.db import migrations
import photo.fields


class Migration(migrations.Migration):

    dependencies = [
        ('photo', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='photo',
            name='image',
            field=photo.fields.ThumbnailImageField(upload_to='none'),
        ),
    ]