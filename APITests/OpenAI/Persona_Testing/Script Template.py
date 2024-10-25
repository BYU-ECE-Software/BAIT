import os
from openai import OpenAI
from dotenv import load_dotenv
from typing_extensions import override
from openai import AssistantEventHandler
#
#
#
load_dotenv()
client = OpenAI(
    api_key=os.getenv("OPENAI_API_KEY"),
)

elara = client.beta.assistants.create(
    model='gpt-4o',
)

# Insert prompt here
instuctPrompt='',

class EventHandler(AssistantEventHandler):    
  @override
  def on_text_created(self, text) -> None:
    print(f"\nElara: ", end="", flush=True)
      
  @override
  def on_text_delta(self, delta, snapshot):
    print(delta.value, end="", flush=True)


thread = client.beta.threads.create()

def chat():
  while True:
    prompt=input("\n\nYou: ")
    if prompt.lower() == 'exit':
      break

    message = client.beta.threads.messages.create(
        thread_id=thread.id,
        role="user",
        content=prompt
    )

    with client.beta.threads.runs.stream(
        thread_id=thread.id,
        assistant_id=elara.id,
        instructions=instuctPrompt,
        event_handler=EventHandler(),
    ) as stream:
        stream.until_done()

if __name__ == "__main__":
    chat()
