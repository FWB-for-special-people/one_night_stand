import random
import numpy as np
import pandas as pd

flashcard_data = {
    'id': list(range(1, 1001)),
    'topic': random.choices(
        ['Python', 'JavaScript', 'Java', 'C++', 'SQL', 'HTML/CSS', 'Ruby', 'Algorithms'], k=1000),
    'type': random.choices(
        ['text', 'open_question', 'multiple_choice', 'true_false', 'fill_in_the_blank'], k=1000),
    'difficulty': random.choices(['easy', 'medium', 'hard'], k=1000),
    'time_to_complete': random.choices(range(5, 16), k=1000),
    'success': np.random.randint(0, 2, size=1000)
}

flashcards_df = pd.DataFrame(flashcard_data)
