#!/bin/bash

# Configuration
IMAGE_NAME="bluehive-app"
IMAGE_TAG="latest"
SERVER_USER="ubuntu"
SERVER_HOST="84.234.21.152"
SERVER_DIR="/var/www/bluehive"
REMOTE_IMAGE="bluehive"

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}🐳 Building Docker image for AMD64...${NC}"
docker buildx build --platform linux/amd64 -t ${IMAGE_NAME}:${IMAGE_TAG} --load .

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Docker build failed${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Docker image built successfully${NC}"

echo -e "${BLUE}💾 Saving Docker image to tar file...${NC}"
docker save ${IMAGE_NAME}:${IMAGE_TAG} | gzip > bluehive-app.tar.gz

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Failed to save Docker image${NC}"
    exit 1
fi

FILE_SIZE=$(du -h bluehive-app.tar.gz | cut -f1)
echo -e "${GREEN}✓ Docker image saved and compressed (size: ${FILE_SIZE})${NC}"

echo -e "${BLUE}📤 Uploading image to server...${NC}"
scp bluehive-app.tar.gz ${SERVER_USER}@${SERVER_HOST}:${SERVER_DIR}/

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Failed to transfer file${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Image uploaded successfully${NC}"

echo -e "${BLUE}🔧 Loading image on remote server...${NC}"
ssh ${SERVER_USER}@${SERVER_HOST} "cd ${SERVER_DIR} && gunzip -c bluehive-app.tar.gz | docker load"

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Failed to load image on remote server${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Image loaded on remote server${NC}"

# Clean up
read -p "Delete local bluehive-app.tar.gz? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    rm bluehive-app.tar.gz
    echo -e "${GREEN}✓ Local file deleted${NC}"
fi

echo -e "${GREEN}✅ Complete! Image ready on ${SERVER_HOST}${NC}"
echo ""
echo -e "${YELLOW}📝 Deployment Instructions:${NC}"
echo ""
echo -e "${BLUE}1. SSH to your server:${NC}"
echo -e "   ssh ${SERVER_USER}@${SERVER_HOST}"
echo ""
echo -e "${BLUE}2. Go to project directory:${NC}"
echo -e "   cd ${SERVER_DIR}"
echo ""
echo -e "${YELLOW}3. Stop existing containers (preserves DB):${NC}"
echo -e "   docker-compose down"
echo ""
echo -e "${YELLOW}4. Start with new image:${NC}"
echo -e "   docker-compose up -d"
echo ""
echo -e "${BLUE}Or manually without docker-compose:${NC}"
echo -e "   docker stop bluehive_app_1"
echo -e "   docker rm bluehive_app_1"
echo -e "   docker run -d --name bluehive_app_1 --network bluehive_network \\"
echo -e "     -e DATABASE_URI='postgres://...' -p 4000:3000 bluehive-app:latest"
echo ""
echo -e "${GREEN}✅ DB volume 'postgres_data' will be preserved${NC}"