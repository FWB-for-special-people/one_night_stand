import os

from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"))


def transform_to_catchy_text(simple_message):
    messages = [
        {"role": "system",
         "content": "You are an expert copywriter skilled at creating catchy, engaging text that grabs attention "
                    "like content on TikTok."},
        {"role": "user",
         "content": f"Transform the following text into a more catchy, engaging style:\n\n'{simple_message}'"}
    ]

    response = client.chat.completions.create(
        model="gpt-4o",
        messages=messages,
        max_tokens=100,
        temperature=0.7
    )

    catchy_text = response.choices[0].message.content
    return catchy_text


def violence_detect(flashcard_text):
    response = client.moderations.create(
        model="omni-moderation-latest",
        input=flashcard_text)
    return response.results[0].flagged
