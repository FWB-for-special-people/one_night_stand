import json
import os
from json import JSONDecodeError

from django.core.exceptions import BadRequest
from attr import filters
from django.db.models import Count
from django.utils import timezone
from openai import OpenAI
from rest_framework import viewsets, generics, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.views import APIView

from cards import serializers, models
from . import models, serializers
from .helpers import fake_data_generator
from .helpers.ai_recommendation import recommend_flashcards_for_user
from .recommendations import recommend_collaborative_cards
from users.views import logger
from . import serializers, models


class CardViewSet(viewsets.ViewSetMixin, generics.ListAPIView, generics.CreateAPIView):
    serializer_class = serializers.CardSerializer
    queryset = models.Card.objects.all()
    client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))

    def filter_queryset(self, queryset):
        if channel := self.request.query_params.get("channel"):
            queryset = queryset.filter(channels=channel)

        return queryset

    def perform_create(self, serializer):

        card = serializer.save(created_by=self.request.user, difficulty=self.request.data["difficulty"],
                        expected_time=int(self.request.data[
                            "expected_time"]))

        tags = self.request.data["tags"]
        for tag in tags:
            tag, _ = models.Tag.objects.get_or_create(name=tag)
            card.tags.add(tag)


    @action(methods=["PATCH"], detail=True)
    def view(self, *args, **kwargs):
        models.CardView.objects.update_or_create(
            card=self.get_object(),
            user=self.request.user,
            create_defaults={
                "viewed_at": timezone.now(),
            }
        )
        return Response(status=status.HTTP_200_OK)

    @action(methods=["PATCH"], detail=True)
    def like(self, *args, **kwargs):
        models.CardLike.objects.update_or_create(
            card=self.get_object(),
            user=self.request.user,
            create_defaults={
                "liked_at": timezone.now(),
            },
        )
        return Response(status=status.HTTP_200_OK)

    @action(detail=False, methods=["post"], url_path="")
    def content(self, request):
        theme = self.request.data['theme']
        if self._violence_detect(theme):
            return Response({"detail"}, status=status.HTTP_400_BAD_REQUEST)
        tags = models.Tag.objects.all().values_list('name', flat=True)

        card_data = self.client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {
                    "role": "system",
                    "content": "You are an expert copywriter skilled at creating catchy, engaging text that grabs attention "
                               "like content on TikTok."
                },
                {
                    "role": "user",
                    "content": [{
                        "type": "text",
                        "text": f"Create catchy text in polish language for this prompt: {theme}. "
                                f"Return response in JSON format {{ text: text, tags: array, difficulty: text, expected_time: int }} "
                                f"Max character count for text is 500 be sure to safe escape all characters in string, "
                                f"Choices for difficulty are: beginner, intermediate, advanced, expert."
                                f"Expected time is integer value in seconds to read the content of text."
                                f"Assign tags from this list {tags}, if you don't find appropriate tag, you can add a different one, but try to add them in polish language."
                                f"Do not return as code snippet."
                    }]
                }
            ]
        )
        try:

            json_data = json.loads(card_data.choices[0].message.content)
        except JSONDecodeError as e:
            raise BadRequest(f"Not able to decode value: {card_data.choices[0].message.content}")

        return Response(json_data)

    def _violence_detect(self, flashcard_text):
        response = self.client.moderations.create(
            model="omni-moderation-latest",
            input=flashcard_text)
        return response.results[0].flagged


class CommentViewSet(viewsets.ViewSetMixin, generics.ListAPIView, generics.CreateAPIView):
    serializer_class = serializers.CommentSerializer
    queryset = models.Comment.objects.all().order_by("created_at")

    def filter_queryset(self, queryset):
        return queryset.filter(card_id=self.kwargs['card_id'])

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user, card_id=self.kwargs["card_id"])





class DataView(APIView):

    def post(self, request):
        user_id = request.data.get('user_id')
        user_topic_preference = request.data.get('user_topic_preference')
        user_difficulty_preference = request.data.get('user_difficulty_preference')

        if user_topic_preference is None or user_difficulty_preference is None:
            return Response({"detail": "Both user_topic_preference and user_difficulty_preference are required."},
                            status=400)

        recommendations = recommend_flashcards_for_user(user_id, user_topic_preference, user_difficulty_preference)

        response_data = [rec for rec in recommendations]

        return Response(response_data)


    class CardRecommendationView(APIView):

        def get(self, request):
            # Pobierz aktualnie zalogowanego użytkownika
            user = request.user

            # Wygeneruj rekomendacje kart
            recommended_cards = recommend_collaborative_cards(user.id)

            # Serializuj dane i zwróć jako odpowiedź
            recommended_data = [{'id': card.id, 'text': card.text, 'tags': card.tags} for card in recommended_cards]

            return Response(recommended_data)
