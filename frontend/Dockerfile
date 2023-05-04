# base image
FROM node

# set working directory
WORKDIR /app

# copy package files and install dependencies
COPY package*.json ./

RUN npm install

# copy app files
COPY . .

# build app
RUN npm run build

# expose port
EXPOSE 3000

# start command
CMD ["npm", "start"]
