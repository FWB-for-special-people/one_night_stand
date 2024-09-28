import numpy as np
import pandas as pd
import logging

from sklearn.model_selection import train_test_split
from .fake_data_generator import flashcards_df
from .ai_model import train_model

logger = logging.getLogger(__name__)

model = train_model(flashcards_df)
flashcards_df = flashcards_df


def filter_flashcards_for_user(df, user_topic_preference, user_difficulty_preference):
    filtered_flashcards_df = df
    if user_topic_preference:
        filtered_flashcards_df = filtered_flashcards_df[filtered_flashcards_df['topic'].isin(user_topic_preference)]

    if user_difficulty_preference:
        filtered_flashcards_df = filtered_flashcards_df[
            filtered_flashcards_df['difficulty'].isin(user_difficulty_preference)]

    return filtered_flashcards_df


def recommend_flashcards_for_user(user_id, user_topic_preference, user_difficulty_preference, num_recommendations=10):
    # TODO DELETE LOGGER
    logger.info(f'user_topic_preference: {user_topic_preference}')
    logger.info(f'user_difficulty_preference: {user_difficulty_preference}')

    filtered_flashcards = filter_flashcards_for_user(flashcards_df,
                                                     user_topic_preference=user_topic_preference,
                                                     user_difficulty_preference=user_difficulty_preference)

    recommendations = []

    for index, row in filtered_flashcards.iterrows():
        topic_encoded = pd.Series([row['topic']]).astype('category').cat.codes[0]
        difficulty_encoded = pd.Series([row['difficulty']]).astype('category').cat.codes[0]

        input_data = np.array([[topic_encoded, row['type_encoded'], difficulty_encoded, row['time_to_complete']]])

        predicted_success = model.predict(input_data)

        if predicted_success > 0.5:
            recommendations.append((row['id'], predicted_success))

    recommendations.sort(key=lambda x: x[1], reverse=True)

    recommended_flashcards = [rec[0] for rec in recommendations[:num_recommendations]]
    logger.info(f'user_difficulty_preference: {recommended_flashcards}')
    return recommended_flashcards
