from datetime import timedelta
from collections import defaultdict
from django.utils import timezone
# from ..cards.models import Card, CardLike, Comment, CardView
from .fake_data_generator import flashcards_df, liked_cards_df, viewed_cards_df

# def recommend_cards_based_on_recent_activity(user):
#     now = timezone.now()
#
#     liked_cards = CardLike.objects.filter(
#         user=user,
#         liked_at__gte=now - timedelta(hours=24)
#     ).values_list('card_id', flat=True)
#
#     commented_cards = Comment.objects.filter(
#         created_by=user,
#         is_positive=True,
#         created_at__gte=now - timedelta(hours=24)
#     ).values_list('card_id', flat=True)
#
#     recent_activity_cards = set(liked_cards).union(set(commented_cards))
#
#     if not recent_activity_cards:
#         return []
#
#     recent_activity_tags = Card.objects.filter(id__in=recent_activity_cards).values_list('tags', flat=True)
#
#     recommended_cards = Card.objects.filter(
#         tags__overlap=recent_activity_tags
#     ).exclude(
#         viewed_by=user
#     ).distinct()
#
#     card_scores = defaultdict(int)
#
#     for card in recommended_cards:
#         common_tags = set(card.tags).intersection(set(recent_activity_tags))
#         card_scores[card.id] = len(common_tags)
#
#     sorted_cards = sorted(recommended_cards, key=lambda card: card_scores[card.id], reverse=True)
#
#     return sorted_cards[:10]


import pandas as pd
from datetime import timedelta
import random
import logging


def recommend_cards_based_on_recent_activity(user_id):
    now = pd.Timestamp.now()

    liked_cards = liked_cards_df[
        (liked_cards_df['user'] == user_id) &
        (liked_cards_df['liked_at'] >= now - timedelta(days=150))
        ]['card_id'].tolist()

    commented_cards = []

    recent_activity_cards = set(liked_cards).union(set(commented_cards))

    if not recent_activity_cards:
        return []

    recent_activity_tags = flashcards_df[flashcards_df['id'].isin(recent_activity_cards)]['tags'].tolist()

    viewed_cards_by_user = viewed_cards_df[viewed_cards_df['user'] == user_id]['card_id'].tolist()

    recommended_cards = flashcards_df[
        flashcards_df['tags'].apply(lambda tags: any(tag in recent_activity_tags for tag in tags)) &
        ~flashcards_df['id'].isin(viewed_cards_by_user)
        ]

    if recommended_cards.empty:
        return flashcards_df.sample(5)['id'].tolist()

    return recommended_cards['id']
