FROM node:18

WORKDIR /usr/src/app

COPY tsconfig.json ./

COPY package*.json ./

RUN npm i

COPY . .

RUN apt-get update && apt-get install -y net-tools

RUN npm run build

CMD ["npm", "run", "start"]
