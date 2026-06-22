import sys
sys.path.insert(0, "neo-web/backend")

from api_engine import load_api_keys, ask_groq

# Test 1: Can we read the key from api_keys.json?
keys = load_api_keys()
if keys.get("groq"):
    print(f"[OK] Key found in api_keys.json: {keys['groq'][:20]}...")
else:
    print("[FAIL] KEY NOT FOUND in api_keys.json!")

# Test 2: Quick AI call
print("\n[TEST] Calling AI...")
result = ask_groq("Say hello in one sentence")
print(f"[RESULT] {result}")