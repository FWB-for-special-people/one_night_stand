import random
import numpy as np
import pandas as pd

flashcard_data = {
    'id': list(range(1, 1001)),
    'tags': random.choices(
        ['Python', 'JavaScript', 'Java', 'C++', 'SQL', 'HTML/CSS', 'Ruby', 'Algorithms'], k=1000),
    'difficulty': random.choices(['beginner', 'intermediate', 'advanced', 'expert'], k=1000),
    'time_to_learn': random.choices(range(1, 10), k=1000),
    'num_likes': random.choices(range(0, 100), k=1000),
    'num_positive_comments': random.choices(range(0, 100), k=1000)
}

flashcards_df = pd.DataFrame(flashcard_data)

user_ids = list(range(1, 11))

followers_data = {
    'follower': random.choices(user_ids, k=50),
    'followed_user': random.choices(user_ids, k=50)
}

liked_cards_data = {
    'user': random.choices(user_ids, k=100),
    'card_id': random.choices(range(1, 1001), k=100),
    'liked_at': pd.to_datetime(random.choices(pd.date_range('2023-01-01', '2024-09-28', freq='D'), k=100))
}

viewed_cards_data = {
    'user': random.choices(user_ids, k=200),
    'card_id': random.choices(range(1, 1001), k=200),
    'viewed_at': pd.to_datetime(random.choices(pd.date_range('2023-01-01', '2024-09-28', freq='D'), k=200))
}

followers_df = pd.DataFrame(followers_data)
liked_cards_df = pd.DataFrame(liked_cards_data)
viewed_cards_df = pd.DataFrame(viewed_cards_data)
