from datetime import timedelta
from collections import defaultdict
from django.utils import timezone
from ..cards.models import Card, CardLike, Comment, CardView


def recommend_cards_based_on_recent_activity(user):
    now = timezone.now()

    liked_cards = CardLike.objects.filter(
        user=user,
        liked_at__gte=now - timedelta(hours=24)
    ).values_list('card_id', flat=True)

    commented_cards = Comment.objects.filter(
        created_by=user,
        is_positive=True,
        created_at__gte=now - timedelta(hours=24)
    ).values_list('card_id', flat=True)

    recent_activity_cards = set(liked_cards).union(set(commented_cards))

    if not recent_activity_cards:
        return []

    recent_activity_tags = Card.objects.filter(id__in=recent_activity_cards).values_list('tags', flat=True)

    recommended_cards = Card.objects.filter(
        tags__overlap=recent_activity_tags
    ).exclude(
        viewed_by=user
    ).distinct()

    card_scores = defaultdict(int)

    for card in recommended_cards:
        common_tags = set(card.tags).intersection(set(recent_activity_tags))
        card_scores[card.id] = len(common_tags)

    sorted_cards = sorted(recommended_cards, key=lambda card: card_scores[card.id], reverse=True)

    return sorted_cards[:10]

