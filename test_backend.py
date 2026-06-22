#!/usr/bin/env python3
"""
Diagnostic script to test backend API and database connectivity.
Run this while the backend server is running to verify everything works.
"""
import requests
import sys

BASE_URL = "http://localhost:5050"

def test_endpoint(name, url):
    """Test a single API endpoint."""
    try:
        response = requests.get(url, timeout=5)
        if response.status_code == 200:
            data = response.json()
            print(f"[OK] {name}: {response.status_code}")
            if isinstance(data, dict) and 'status' in data:
                print(f"     Status: {data['status']}")
                if 'games_count' in data:
                    print(f"     Games in DB: {data['games_count']}")
                if 'error' in data:
                    print(f"     ERROR: {data['error']}")
            elif isinstance(data, list):
                print(f"     Items returned: {len(data)}")
                if data:
                    print(f"     Sample: {data[0] if data else 'None'}")
            return True
        else:
            print(f"[FAIL] {name}: HTTP {response.status_code}")
            print(f"     Response: {response.text[:200]}")
            return False
    except requests.exceptions.ConnectionError:
        print(f"[FAIL] {name}: Connection refused - is backend running?")
        return False
    except Exception as e:
        print(f"[FAIL] {name}: {str(e)}")
        return False

def main():
    print("=" * 60)
    print("XZY GAMES - Backend Diagnostic Test")
    print("=" * 60)
    print()
    
    tests = [
        ("Health Check", f"{BASE_URL}/api/health"),
        ("Games List", f"{BASE_URL}/api/games"),
        ("Movies List", f"{BASE_URL}/api/movies"),
        ("Stats", f"{BASE_URL}/api/stats"),
        ("Category Banners", f"{BASE_URL}/api/category-banners/Action"),
        ("Trending", f"{BASE_URL}/api/trending"),
    ]
    
    results = []
    for name, url in tests:
        results.append(test_endpoint(name, url))
        print()
    
    print("=" * 60)
    passed = sum(results)
    total = len(results)
    print(f"Results: {passed}/{total} tests passed")
    
    if passed == total:
        print("[SUCCESS] Backend is working correctly!")
        print("\nIf frontend still shows no data:")
        print("1. Check browser console for errors (F12)")
        print("2. Verify frontend is running on http://localhost:5173")
        print("3. Check that API_BASE in src/lib/api.ts points to correct backend URL")
    else:
        print("[ERROR] Some tests failed. Backend may not be running or configured incorrectly.")
        print("\nTroubleshooting:")
        print("1. Start backend: cd neo-web/backend && python -m uvicorn main:app --host 0.0.0.0 --port 5050")
        print("2. Check .env file has DATABASE_URL empty (for SQLite)")
        print("3. Verify xzy.db exists in neo-web/backend/")
    
    print("=" * 60)
    return 0 if passed == total else 1

if __name__ == "__main__":
    sys.exit(main())