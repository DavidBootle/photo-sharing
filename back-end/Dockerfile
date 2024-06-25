# photoshare/backend

# use nodejs 22 image
FROM node:22

# create app directory and use it as the working directory
WORKDIR /usr/src/app

# copy package.json and install dependencies
COPY ./package*.json .
RUN npm ci

# expose app port
EXPOSE 4000

# Copy the rest of the source code into the container
COPY . .