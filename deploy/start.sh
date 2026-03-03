#!/bin/bash

# Change to the backend directory
cd /var/www/qa-chat/backend

# Run Gunicorn with 4 workers, binding to port 5000
gunicorn --workers 4 --bind 0.0.0.0:5000 app:app
