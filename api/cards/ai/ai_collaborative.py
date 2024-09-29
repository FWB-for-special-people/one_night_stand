from django.utils import timezone

from ..models import CardView, CardLike
from .fake_data_generator import followers_df, liked_cards_df, viewed_cards_df


def recommend_collaborative_cards(user_id):
    followed_users = followers_df[followers_df['follower'] == user_id]['followed_user'].tolist()

    if not followed_users:
        return []

    liked_cards_by_followed = liked_cards_df[liked_cards_df['user'].isin(followed_users)]
    viewed_cards_by_followed = viewed_cards_df[viewed_cards_df['user'].isin(followed_users)]
    already_viewed_card_ids = viewed_cards_df[viewed_cards_df['user'] == user_id]['card_id'].tolist()

    recommended_liked_cards = liked_cards_by_followed[~liked_cards_by_followed['card_id'].isin(already_viewed_card_ids)]
    recommended_viewed_cards = viewed_cards_by_followed[
        ~viewed_cards_by_followed['card_id'].isin(already_viewed_card_ids)]

    recommended_cards_set = set()
    recommended_cards = []

    for _, card_like in recommended_liked_cards.iterrows():
        if card_like['card_id'] not in recommended_cards_set:
            recommended_cards_set.add(card_like['card_id'])
            recommended_cards.append(card_like['card_id'])

    for _, card_view in recommended_viewed_cards.iterrows():
        if card_view['card_id'] not in recommended_cards_set:
            recommended_cards_set.add(card_view['card_id'])
            recommended_cards.append(card_view['card_id'])

    return recommended_cards[:10]
