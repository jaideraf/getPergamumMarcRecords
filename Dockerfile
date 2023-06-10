FROM node:18.16.0-bullseye-slim

# Following https://snyk.io/blog/10-best-practices-to-containerize-nodejs-web-applications-with-docker

RUN apt-get update && apt-get install -y --no-install-recommends dumb-init
ENV NODE_ENV production

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY --chown=node:node package*.json ./
RUN npm ci --only=production && npm cache clean --force

# Bundle app source
COPY --chown=node:node . .

EXPOSE 8080

USER node
CMD ["dumb-init", "node", "app.js" ]