#!/usr/bin/env python3
"""
Quick test script to check all API endpoints.
Run this while backend is running on localhost:5050
"""
import requests
import sys

BASE_URL = "http://localhost:5050"

endpoints = [
    ("Health Check", "/api/health"),
    ("Random Trailer", "/api/random-trailer"),
    ("Stats", "/api/stats"),
    ("Games List", "/api/games"),
    ("Movies List", "/api/movies"),
    ("Activity Feed", "/api/activity?limit=5"),
    ("Home Banner", "/api/category-banners/Home"),
    ("Games Banner", "/api/category-banners/GamesPad"),
    ("Software Banner", "/api/category-banners/SoftwarePad"),
    ("Movies Banner", "/api/category-banners/MoviesPad"),
]

print("=" * 60)
print("TESTING ALL API ENDPOINTS")
print("=" * 60)
print()

errors = []
passed = 0
failed = 0

for name, endpoint in endpoints:
    try:
        response = requests.get(f"{BASE_URL}{endpoint}", timeout=5)
        if response.status_code == 200:
            print(f"[OK] {name:20s} - Working")
            passed += 1
        else:
            print(f"[FAIL] {name:20s} - Status {response.status_code}")
            failed += 1
            errors.append(f"{name} ({endpoint}): HTTP {response.status_code}")
    except requests.exceptions.ConnectionError:
        print(f"[FAIL] {name:20s} - Backend not running")
        print(f"  -> Start backend first: python neo-web/backend/main.py")
        failed += 1
        errors.append(f"{name}: Cannot connect to backend")
    except Exception as e:
        print(f"[FAIL] {name:20s} - ERROR: {e}")
        failed += 1
        errors.append(f"{name}: {e}")

print()
print("=" * 60)
print(f"RESULTS: {passed} passed, {failed} failed")
print("=" * 60)

if errors:
    print("\nERRORS FOUND:")
    for error in errors:
        print(f"  • {error}")
    print("\nCheck the backend terminal for detailed error messages.")
    print("Look for 'ERROR' or 'Traceback' in the terminal output.")
    sys.exit(1)
else:
    print("\n[SUCCESS] ALL TESTS PASSED! Everything is working correctly.")
    sys.exit(0)