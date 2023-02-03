# Stage 1
FROM node:18-alpine as builder

# without this line, it would run as root, which is unsafe
USER node

# -p, --parents will create all folders tree
RUN mkdir -p /home/node/app
WORKDIR /home/node/app

COPY --chown=node:node package*.json ./

ARG GITHUB_TOKEN
RUN npm config set //npm.pkg.github.com/:_authToken=$GITHUB_TOKEN
RUN npm config set @aikray:registry=https://npm.pkg.github.com/
RUN npm ci

COPY --chown=node:node . ./

RUN npm run build

# Stage 2 to minimize image size
FROM nginx:alpine
COPY /nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /home/node/app/build /usr/share/nginx/html
# CMD is not needed since default nginx command will be used to start the server
