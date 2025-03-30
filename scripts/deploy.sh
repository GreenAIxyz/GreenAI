#!/bin/bash

# Build frontend
echo "Building frontend..."
cd apps/frontend
npm run build

# Build backend
echo "Building backend..."
cd ../backend
npm run build

# Build and deploy smart contract
echo "Building and deploying smart contract..."
cd ../../contracts
anchor build
anchor deploy

# Deploy to AWS
echo "Deploying to AWS..."
cd ..

# Build Docker images
docker build -t greenai-frontend:latest ./apps/frontend
docker build -t greenai-backend:latest ./apps/backend

# Push to ECR
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin $AWS_ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com
docker tag greenai-frontend:latest $AWS_ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com/greenai-frontend:latest
docker tag greenai-backend:latest $AWS_ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com/greenai-backend:latest
docker push $AWS_ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com/greenai-frontend:latest
docker push $AWS_ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com/greenai-backend:latest

# Update ECS services
aws ecs update-service --cluster greenai-cluster --service frontend-service --force-new-deployment
aws ecs update-service --cluster greenai-cluster --service backend-service --force-new-deployment

echo "Deployment complete! 🚀" 