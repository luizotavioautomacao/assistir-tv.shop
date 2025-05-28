FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

ARG BACKEND_PORT=3000
EXPOSE ${BACKEND_PORT}

CMD ["npm", "run", "start:prod"]
