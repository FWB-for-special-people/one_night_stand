import numpy as np
import pandas as pd
import logging

from sklearn.model_selection import train_test_split
from .fake_data_generator import flashcards_df
from .ai_model import train_model

model = train_model(flashcards_df)
flashcards_df = flashcards_df


def filter_flashcards_for_user(df, user_topic_preference):
    filtered_flashcards_df = df
    if user_topic_preference:
        filtered_flashcards_df = filtered_flashcards_df[filtered_flashcards_df['tags'].isin(user_topic_preference)]

    return filtered_flashcards_df


def recommend_flashcards_for_user(user_topic_preference, num_recommendations=10):
    filtered_flashcards = filter_flashcards_for_user(flashcards_df, user_topic_preference=user_topic_preference)

    recommendations = []

    for index, row in filtered_flashcards.iterrows():
        tags_encoded = pd.Series([row['tags']]).astype('category').cat.codes[0]
        difficulty_encoded = pd.Series([row['difficulty']]).astype('category').cat.codes[0]

        input_data = np.array([[
            tags_encoded,
            difficulty_encoded,
            row['time_to_learn'],
            row['num_likes'],
            row['num_positive_comments']
        ]])

        predicted_engagement = model.predict(input_data)

        if predicted_engagement > 0.5:
            recommendations.append((row['id'], predicted_engagement))

    recommendations.sort(key=lambda x: x[1], reverse=True)

    recommended_flashcards = [rec[0] for rec in recommendations[:num_recommendations]]

    return recommended_flashcards
