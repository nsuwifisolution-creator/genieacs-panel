version: "3.9"

services:
  mongodb:
    image: mongo:8
    container_name: genieacs-mongo
    restart: unless-stopped
    ports:
      - "27017:27017"
    volumes:
      - mongo-data:/data/db

  backend:
    build: ./backend
    container_name: genieacs-panel-backend
    restart: unless-stopped
    env_file:
      - ./backend/.env
    depends_on:
      - mongodb
    ports:
      - "5000:5000"

  frontend:
    build: ./frontend
    container_name: genieacs-panel-frontend
    restart: unless-stopped
    depends_on:
      - backend
    ports:
      - "5173:5173"

volumes:
  mongo-data:
