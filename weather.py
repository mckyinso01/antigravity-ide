import requests

city = "Manila"
api_url = f"https://wttr.in/{city}?format=%C+%t"

response = requests.get(api_url)
print(f"Weather in {city}: {response.text}")
