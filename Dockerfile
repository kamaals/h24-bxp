FROM node:latest

WORKDIR /app
COPY package.json package-lock.json* ./

RUN yarn install

COPY . .

RUN yarn build
EXPOSE 3000

CMD ["npm", "run", "start"]
