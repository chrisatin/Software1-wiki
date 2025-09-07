#!/bin/bash

# Software1 Wiki Deployment Script for EC2
# This script automates the deployment process on an EC2 instance

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
APP_NAME="software1-wiki"
DOCKER_IMAGE="$APP_NAME:latest"
CONTAINER_NAME="software1-wiki"
PORT="80"

echo -e "${BLUE}🚀 Starting deployment of Software1 Wiki...${NC}"

# Function to print colored output
print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    print_error "Docker is not installed. Please install Docker first."
    echo "Run: curl -fsSL https://get.docker.com -o get-docker.sh && sh get-docker.sh"
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    print_error "Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

print_status "Docker and Docker Compose are available"

# Stop and remove existing container if it exists
if [ "$(docker ps -aq -f name=$CONTAINER_NAME)" ]; then
    print_warning "Stopping existing container..."
    docker stop $CONTAINER_NAME || true
    docker rm $CONTAINER_NAME || true
    print_status "Existing container removed"
fi

# Remove existing image if it exists
if [ "$(docker images -q $DOCKER_IMAGE)" ]; then
    print_warning "Removing existing image..."
    docker rmi $DOCKER_IMAGE || true
    print_status "Existing image removed"
fi

# Build the Docker image
print_status "Building Docker image..."
docker build -t $DOCKER_IMAGE .

if [ $? -eq 0 ]; then
    print_status "Docker image built successfully"
else
    print_error "Failed to build Docker image"
    exit 1
fi

# Start the container
print_status "Starting container..."
docker run -d \
    --name $CONTAINER_NAME \
    --restart unless-stopped \
    -p $PORT:80 \
    $DOCKER_IMAGE

if [ $? -eq 0 ]; then
    print_status "Container started successfully"
else
    print_error "Failed to start container"
    exit 1
fi

# Wait for container to be ready
print_status "Waiting for application to be ready..."
sleep 10

# Health check
print_status "Performing health check..."
if curl -f http://localhost/health > /dev/null 2>&1; then
    print_status "Application is healthy and responding"
else
    print_warning "Health check failed, but container is running"
fi

# Show container status
echo -e "\n${BLUE}📊 Container Status:${NC}"
docker ps -f name=$CONTAINER_NAME

# Show logs
echo -e "\n${BLUE}📋 Recent Logs:${NC}"
docker logs --tail 20 $CONTAINER_NAME

# Show access information
echo -e "\n${GREEN}🎉 Deployment completed successfully!${NC}"
echo -e "\n${BLUE}📱 Access Information:${NC}"
echo -e "   Local: http://localhost"
echo -e "   External: http://$(curl -s ifconfig.me)"

# Show useful commands
echo -e "\n${BLUE}🔧 Useful Commands:${NC}"
echo -e "   View logs: docker logs -f $CONTAINER_NAME"
echo -e "   Stop app: docker stop $CONTAINER_NAME"
echo -e "   Start app: docker start $CONTAINER_NAME"
echo -e "   Restart app: docker restart $CONTAINER_NAME"
echo -e "   Remove app: docker stop $CONTAINER_NAME && docker rm $CONTAINER_NAME"

echo -e "\n${GREEN}✨ Software1 Wiki is now running on your EC2 instance!${NC}"
