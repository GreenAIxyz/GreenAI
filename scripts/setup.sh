#!/bin/bash

# Install dependencies
echo "Installing dependencies..."
npm install

# Install frontend dependencies
echo "Installing frontend dependencies..."
cd apps/frontend
npm install

# Install backend dependencies
echo "Installing backend dependencies..."
cd ../backend
npm install

# Install contract dependencies
echo "Installing contract dependencies..."
cd ../../contracts
npm install

# Setup environment variables
echo "Setting up environment variables..."
cd ..
cp .env.example .env

# Initialize database
echo "Initializing database..."
docker-compose up -d db

echo "Setup complete! 🎉" 