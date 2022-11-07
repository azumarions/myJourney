from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.conf import settings
import uuid


def uuid4():
    return uuid.uuid4().hex


def upload_avatar_path(instance, filename):
    ext = filename.split('.')[-1]
    return '/'.join(['avatars', str(instance.userProfile.id)+str(instance.name)+str(".")+str(ext)])


def upload_post_path(instance, filename):
    ext = filename.split('.')[-1]
    return '/'.join(['post', str(instance.userPost.id)+str(instance.title)+str(".")+str(ext)])


class UserManager(BaseUserManager):
    def create_user(self, email, password=None):
        if not email:
            raise ValueError('email is must')

        user = self.model(email=self.normalize_email(email))
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password):
        user = self.create_user(email, password)
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)

        return user


class User(AbstractBaseUser, PermissionsMixin):
    id = models.CharField(primary_key=True, default=uuid4,
                          editable=False, max_length=33, unique=True)
    email = models.EmailField(max_length=50, unique=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = 'email'

    def __str__(self):
        return self.email


class Profile(models.Model):
    id = models.CharField(primary_key=True, default=uuid4,
                          editable=False, max_length=33, unique=True)
    userProfile = models.OneToOneField(
        settings.AUTH_USER_MODEL, related_name='userProfile',
        on_delete=models.CASCADE
    )
    name = models.CharField(verbose_name='名前', max_length=50)
    statusMessage = models.CharField(
        verbose_name='ステータスメッセージ', max_length=255, blank=True, null=True)
    description = models.TextField(
        verbose_name='概要', max_length=1000, blank=True, null=True)
    img = models.ImageField(verbose_name='画像', blank=True,
                            null=True, upload_to=upload_avatar_path)
    created_at = models.DateTimeField(verbose_name='作成日', auto_now_add=True)
    updated_at = models.DateTimeField(verbose_name='更新日', auto_now=True)

    def __str__(self):
        return self.name


class Post(models.Model):
    id = models.CharField(primary_key=True, default=uuid4,
                          editable=False, max_length=33, unique=True)
    userPost = models.ForeignKey(
        settings.AUTH_USER_MODEL, related_name='userPost',
        on_delete=models.CASCADE
    )
    title = models.CharField(verbose_name='タイトル', max_length=50)
    description = models.TextField(
        verbose_name='概要', max_length=1000, blank=True, null=True)
    img = models.ImageField(verbose_name='画像', blank=True,
                            null=True, upload_to=upload_post_path)
    created_at = models.DateTimeField(verbose_name='作成日', auto_now_add=True)
    updated_at = models.DateTimeField(verbose_name='更新日', auto_now=True)
    liked = models.ManyToManyField(
        settings.AUTH_USER_MODEL, related_name='liked', blank=True)

    def __str__(self):
        return self.title


class Comment(models.Model):
    sentence = models.CharField(verbose_name='センテンス', max_length=100)
    comment = models.ForeignKey(
        settings.AUTH_USER_MODEL, related_name='comment',
        on_delete=models.CASCADE
    )
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    created_at = models.DateTimeField(verbose_name='作成日', auto_now_add=True)
    updated_at = models.DateTimeField(verbose_name='更新日', auto_now=True)

    def __str__(self):
        return self.sentence


class Like(models.Model):
    postLike = models.ForeignKey(Post, on_delete=models.CASCADE)
    userLike = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.userLike.email
