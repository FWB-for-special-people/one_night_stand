import pandas as pd
import numpy as np
import tensorflow as tf

from sklearn.model_selection import train_test_split


def preprocess_data(df):
    df['engagement'] = ((df['num_likes'] > 0) | (df['num_positive_comments'] > 0)).astype(int)

    df['tags_encoded'] = df['tags'].astype('category').cat.codes
    df['difficulty_encoded'] = df['difficulty'].astype('category').cat.codes

    return df


def train_model(df):
    df = preprocess_data(df)

    X = df[['tags_encoded', 'difficulty_encoded', 'time_to_learn', 'num_likes', 'num_positive_comments']].values
    y = df['engagement'].values

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    model = tf.keras.Sequential([
        tf.keras.layers.Input(shape=(X_train.shape[1],)),
        tf.keras.layers.Dense(16, activation='relu'),
        tf.keras.layers.Dense(8, activation='relu'),
        tf.keras.layers.Dense(1, activation='sigmoid')
    ])

    model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])

    model.fit(X_train, y_train, epochs=10, batch_size=4, verbose=2)

    return model
