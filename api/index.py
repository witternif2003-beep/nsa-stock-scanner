import os
import sys

# Add backend directory to sys.path
backend_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "backend"))
if backend_path not in sys.path:
    sys.path.insert(0, backend_path)

from server import app

# Vercel Serverless Function entrypoint
# The 'app' ASGI object is automatically detected and served by Vercel
