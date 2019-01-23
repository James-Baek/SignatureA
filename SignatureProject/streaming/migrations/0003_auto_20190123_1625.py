# Generated by Django 2.1.2 on 2019-01-23 07:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('streaming', '0002_auto_20190123_1551'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='tmusic_source',
            options={'ordering': ['music_id']},
        ),
        migrations.RemoveField(
            model_name='tmusic_source',
            name='id',
        ),
        migrations.AlterField(
            model_name='tmusic_source',
            name='music_id',
            field=models.AutoField(primary_key=True, serialize=False, verbose_name='음원ID'),
        ),
    ]
