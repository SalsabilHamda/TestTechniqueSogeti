FROM node:17-alpine
WORKDIR /app
ENV PATH /usr/src/app/node_modules/.bin:$PATH
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . ./ /app/
RUN npm run build
EXPOSE 3000
CMD ["npm","start"]