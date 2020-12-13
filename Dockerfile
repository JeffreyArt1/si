FROM node:12
WORKDIR /
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000/tcp
CMD [ "node", "dist/main.js" ]