FROM node:current-alpine
WORKDIR /home/app

COPY package.json package-lock.json ./
RUN ["npm", "ci"]

COPY . .
RUN ["npm", "run", "build"]

ENV PORT $PORT
ENTRYPOINT ["node", "dist"]
