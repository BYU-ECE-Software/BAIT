import asyncio
import aiohttp

# Configuration
URL = "https://cybergames.byu.edu/"
REQUESTS_PER_SECOND = 1000  # Adjust as needed
DURATION = 15  # Duration in seconds

async def send_request(session):
    """Sends a GET request to the specified URL."""
    try:
        async with session.get(URL) as response:
            status = response.status
            print(f"Response: {status}")
    except Exception as e:
        print(f"Request failed: {e}")

async def load_test():
    """Performs the load test by making requests at the specified rate."""
    async with aiohttp.ClientSession() as session:
        start_time = asyncio.get_event_loop().time()
        while asyncio.get_event_loop().time() - start_time < DURATION:
            tasks = [send_request(session) for _ in range(REQUESTS_PER_SECOND)]
            await asyncio.gather(*tasks)
            await asyncio.sleep(1)  # Maintain the request rate

if __name__ == "__main__":
    asyncio.run(load_test())