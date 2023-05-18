# Stage 1 - the build process
# base image
FROM node:18.12.1-alpine as build-deps
# set working directory
WORKDIR /usr/src/app
# copy package files and install dependencies
COPY package*.json ./
RUN npm install
# copy app files
COPY . ./
# build app
RUN npm run build

# Stage 2 - the production environment
FROM node:18.12.1-alpine
WORKDIR /usr/src/app
ENV NODE_ENV production
COPY --from=build-deps /usr/src/app/package*.json ./
RUN npm install --only=production
COPY --from=build-deps /usr/src/app/.next ./.next
COPY --from=build-deps /usr/src/app/public ./public
COPY --from=build-deps /usr/src/app/server.ts ./server.ts
# expose port
EXPOSE 3000
# start command
CMD ["npm", "start"]
