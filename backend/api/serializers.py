from dataclasses import fields
from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import Like, Post, Profile, Comment


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = get_user_model()
        fields = ('id', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = get_user_model().objects.create_user(**validated_data)
        return user


class ProfileSerializer(serializers.ModelSerializer):
    created_at = serializers.DateTimeField(
        format="%Y-%m-%d %H:%M:%S", read_only=True)
    updated_at = serializers.DateTimeField(
        format="%Y-%m-%d %H:%M:%S", read_only=True)

    # user = UserSerializer(read_only=True)

    class Meta:
        model = Profile
        fields = ('id', 'userProfile', 'name', 'statusMessage',
                  'description', 'img', 'created_at', 'updated_at')
        extra_kwargs = {'userProfile': {'read_only': True}}


class PostSerializer(serializers.ModelSerializer):
    created_at = serializers.DateTimeField(
        format="%Y-%m-%d %H:%M:%S", read_only=True)
    updated_at = serializers.DateTimeField(
        format="%Y-%m-%d %H:%M:%S", read_only=True)

    class Meta:
        model = Post
        fields = ('id', 'userPost', 'title', 'description', 'img',
                  'created_at', 'updated_at', 'liked')
        extra_kwargs = {'userPost': {'read_only': True}}


class CommentSerializer(serializers.ModelSerializer):
    created_at = serializers.DateTimeField(
        format="%Y-%m-%d %H:%M:%S", read_only=True)
    updated_at = serializers.DateTimeField(
        format="%Y-%m-%d %H:%M:%S", read_only=True)

    class Meta:
        model = Comment
        fields = ('id', 'sentence', 'comment',
                  'post', 'created_at', 'updated_at')
        extra_kwargs = {'comment': {'read_only': True}}


class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = ('id', 'userLike', 'postLike', 'created_at')
        extra_kwargs = {'userLike': {'read_only': True}}
