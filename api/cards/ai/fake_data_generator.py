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
