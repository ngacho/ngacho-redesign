FROM node:19
WORKDIR /Users/ngacho/Desktop/everything-code/web-dev-resources/web-pages/ngacho-redesign
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3030
CMD [ "npm", "start" ]
