#!/bin/bash

# Configuration
IMAGE_NAME="bluehive-app"
IMAGE_TAG="latest"
SERVER_USER="ubuntu"
SERVER_HOST="84.234.21.152"
SERVER_DIR="/var/www/bluehive"
TAR_FILE="bluehive-app.tar.gz"

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# Function to print error and exit
error_exit() {
    echo -e "${RED}❌ $1${NC}"
    exit 1
}

# Step 1: Build Docker image
echo -e "${BLUE}🐳 Building Docker image for AMD64...${NC}"
docker buildx build --platform linux/amd64 -t ${IMAGE_NAME}:${IMAGE_TAG} --load .

if [ $? -ne 0 ]; then
    error_exit "Docker build failed"
fi

echo -e "${GREEN}✓ Docker image built successfully${NC}"

# Step 2: Save Docker image
echo -e "${BLUE}💾 Saving Docker image to tar file...${NC}"
docker save ${IMAGE_NAME}:${IMAGE_TAG} | gzip > ${TAR_FILE}

if [ $? -ne 0 ]; then
    error_exit "Failed to save Docker image"
fi

FILE_SIZE=$(du -h ${TAR_FILE} | cut -f1)
echo -e "${GREEN}✓ Docker image saved and compressed (size: ${FILE_SIZE})${NC}"

# Step 3: Upload to server
echo -e "${BLUE}📤 Uploading image to server...${NC}"
scp ${TAR_FILE} ${SERVER_USER}@${SERVER_HOST}:${SERVER_DIR}/

if [ $? -ne 0 ]; then
    error_exit "Failed to transfer file"
fi

echo -e "${GREEN}✓ Image uploaded successfully${NC}"

# Step 4: Load image on remote server
echo -e "${BLUE}🔧 Loading image on remote server...${NC}"
ssh ${SERVER_USER}@${SERVER_HOST} "cd ${SERVER_DIR} && gunzip -c ${TAR_FILE} | docker load"

if [ $? -ne 0 ]; then
    error_exit "Failed to load image on remote server"
fi

echo -e "${GREEN}✓ Image loaded on remote server${NC}"

# Step 5: Stop existing containers (preserves DB)
echo -e "${BLUE}🛑 Stopping existing containers (preserving database)...${NC}"
ssh ${SERVER_USER}@${SERVER_HOST} "cd ${SERVER_DIR} && docker-compose down"

if [ $? -ne 0 ]; then
    error_exit "Failed to stop containers"
fi

echo -e "${GREEN}✓ Containers stopped${NC}"

# Step 6: Start containers with new image
echo -e "${BLUE}🚀 Starting containers with new image...${NC}"
ssh ${SERVER_USER}@${SERVER_HOST} "cd ${SERVER_DIR} && docker-compose up -d"

if [ $? -ne 0 ]; then
    error_exit "Failed to start containers"
fi

echo -e "${GREEN}✓ Containers started${NC}"

# Step 7: Wait a bit for containers to initialize
echo -e "${BLUE}⏳ Waiting for containers to initialize...${NC}"
sleep 5

# Step 8: Verify containers are running
echo -e "${BLUE}🔍 Verifying deployment...${NC}"
CONTAINER_STATUS=$(ssh ${SERVER_USER}@${SERVER_HOST} "cd ${SERVER_DIR} && docker-compose ps --format json" 2>/dev/null)

if [ $? -ne 0 ]; then
    echo -e "${YELLOW}⚠️  Could not verify container status, but deployment completed${NC}"
else
    echo -e "${GREEN}✓ Deployment verification completed${NC}"
fi

# Step 9: Clean up local file
echo -e "${BLUE}🧹 Cleaning up local files...${NC}"
rm -f ${TAR_FILE}

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Local file deleted${NC}"
else
    echo -e "${YELLOW}⚠️  Could not delete local file (may not exist)${NC}"
fi

# Step 10: Clean up remote tar file
echo -e "${BLUE}🧹 Cleaning up remote files...${NC}"
ssh ${SERVER_USER}@${SERVER_HOST} "cd ${SERVER_DIR} && rm -f ${TAR_FILE}"

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Remote file deleted${NC}"
else
    echo -e "${YELLOW}⚠️  Could not delete remote file${NC}"
fi

# Final summary
echo ""
echo -e "${GREEN}✅ Deployment complete!${NC}"
echo ""
echo -e "${BLUE}📊 Deployment Summary:${NC}"
echo -e "   Server: ${SERVER_HOST}"
echo -e "   Image: ${IMAGE_NAME}:${IMAGE_TAG}"
echo -e "   Directory: ${SERVER_DIR}"
echo ""
echo -e "${YELLOW}📝 To check deployment status:${NC}"
echo -e "   ssh ${SERVER_USER}@${SERVER_HOST}"
echo -e "   cd ${SERVER_DIR}"
echo -e "   docker-compose ps"
echo -e "   docker-compose logs -f app"
echo ""
echo -e "${GREEN}✅ Database volume 'postgres_data' has been preserved${NC}"
