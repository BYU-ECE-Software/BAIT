import os
from openai import OpenAI
from dotenv import load_dotenv

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),
)

prompt = input("Enter prompt: ")

chat_completion = client.chat.completions.create(
    messages=[
        {
            "role": "system", 
            "content": "You are a helpful assistant"},
        {
            "role": "user",
            "content": prompt,
        }
    ],
    model="chatgpt-4o-latest"
)

print(chat_completion.choices[0].message)