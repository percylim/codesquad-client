#!/bin/bash
# Build & deploy frontend to Ubuntu server

SERVER_USER=percy
SERVER_IP=percy@centralsoft.com.my         #percy@172-26-3-137    # change to your actual server IP
SERVER_PATH=/var/www/frontend/build

echo "🛠️  Building React frontend..."
npm run build

echo "📦 Uploading build folder to server..."
scp -r build/* $SERVER_USER@$SERVER_IP:$SERVER_PATH

echo "🔄 Reloading Nginx on server..."
ssh $SERVER_USER@$SERVER_IP "sudo systemctl reload nginx"

echo "✅ Frontend deployment complete!"
