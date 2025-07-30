#!/bin/bash

# Переходим в папку сервера
cd server

# Проверяем, установлены ли зависимости
if [ ! -d "node_modules" ]; then
    echo "Installing server dependencies..."
    npm install
fi

# Проверяем наличие .env файла
if [ ! -f ".env" ]; then
    echo "Creating .env file from example..."
    cp env.example .env
    echo "Please configure your .env file with your email settings!"
fi

# Запускаем сервер
echo "Starting server..."
npm run dev 