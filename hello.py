import requests
import numpy as np

# Test requests: fetch data from an API
response = requests.get("https://api.github.com")
print("GitHub API status:", response.status_code)

# Test numpy: simple array math
arr = np.array([1, 2, 3, 4, 5])
print("Numpy array:", arr)
print("Array squared:", arr ** 2)
