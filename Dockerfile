FROM node:8.11.2-alpine

CMD mkdir /app
WORKDIR /app

COPY app.js .
COPY package.json .
COPY README.md .
COPY public ./public
COPY node_modules ./node_modules

# RUN npm install - let jenkins build stage do the install

EXPOSE 3000

CMD ["node", "app.js"]