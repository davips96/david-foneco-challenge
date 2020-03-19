FROM node:10
WORKDIR /client
ENV PATH /client/node_modules/.bin:$PATH
COPY package.json /client/package.json
RUN npm install --silent
RUN npm install react-scripts@3.1.2 -g --silent
COPY . .
EXPOSE 3000
CMD react-scripts start