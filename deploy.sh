#!/bin/bash
# 🚀 Deploy React build to server

# 1. Build React app
echo "📦 Building React app..."
npm run build || { echo "❌ Build failed"; exit 1; }

# 2. Define server info
SERVER_USER=percy
SERVER_HOST=centralsoft.com.my
SERVER_PATH=/var/www/frontend

# 3. Upload build files to server
echo "📤 Uploading build to server..."
scp -r build/* $SERVER_USER@$SERVER_HOST:$SERVER_PATH/

# 4. SSH into server and set permissions
ssh $SERVER_USER@$SERVER_HOST << 'EOF'
  echo "🔧 Setting permissions..."
  sudo chown -R www-data:www-data /var/www/frontend
  sudo chmod -R 755 /var/www/frontend
  echo "✅ Deploy finished!"
EOF
