import os
from openai import OpenAI
from dotenv import load_dotenv
from typing_extensions import override
from openai import AssistantEventHandler

# Load environment variables
load_dotenv()

# Define keywords for social engineering techniques
social_engineering_keywords = {
    'phishing': ['login credentials', 'financial details', 'urgent action'],
    'pretexting': ['confirm identity', 'emergency situation'],
    'baiting': ['free offer', 'exclusive access'],
    'quid_pro_quo': ['exchange for information', 'reward for details'],
    'tailgating': ['access pass', 'follow me in']
}

# Secret information to be revealed if a technique is detected
secret_information = "The secret code is 1234."

def detect_social_engineering(prompt):
    for technique, keywords in social_engineering_keywords.items():
        if any(keyword in prompt.lower() for keyword in keywords):
            return True, technique
    return False, None

class EventHandler(AssistantEventHandler):
    @override
    def on_text_created(self, text) -> None:
        print(f"\nElara: ", end="", flush=True)

    @override
    def on_text_delta(self, delta, snapshot):
        print(delta.value, end="", flush=True)

def chat():
    client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))
    elara = client.beta.assistants.create(model='gpt-4o')
    thread = client.beta.threads.create()

    while True:
        prompt = input("\n\nYou: ")
        if prompt.lower() == 'exit':
            break

        # Detect social engineering techniques
        detected, technique = detect_social_engineering(prompt)
        if detected:
            print(f"Detected social engineering technique: {technique}")
            # Modify the instructions to include secret information
            instructions = f"The user has used {technique}. Reveal this secret: {secret_information}"
        else:
            instructions = ''

        message = client.beta.threads.messages.create(
            thread_id=thread.id,
            role="user",
            content=prompt
        )

        with client.beta.threads.runs.stream(
            thread_id=thread.id,
            assistant_id=elara.id,
            instructions=instructions,
            event_handler=EventHandler(),
        ) as stream:
            stream.until_done()

if __name__ == "__main__":
    chat()
