FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

ENV PORT=${PORT:-5000}

EXPOSE ${PORT}
CMD ["node","server.js"]
