
FROM node:20.11.1 as build

WORKDIR /usr/local/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build
 

FROM nginx:latest

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /usr/local/app/dist/task-flow /usr/share/nginx/html