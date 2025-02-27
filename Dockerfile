# build stage 
FROM node:20 AS builder

WORKDIR /app

COPY package.json .

RUN npm config set registry https://registry.npmmirror.com

RUN npm install

COPY . .

RUN npm run build 

# production stage
FROM node:20 AS production

WORKDIR /app

COPY --from=builder /app/dist ./dist

COPY --from=builder /app/package.json ./package.json

RUN npm config set registry https://registry.npmmirror.com

RUN npm install --production

EXPOSE 3000

CMD ["node", "./dist/main.js"]
