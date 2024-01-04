FROM node:latest
RUN mkdir /app
RUN mkdir /app/node_modules
WORKDIR /app
COPY . .
CMD ["npm", "install"]