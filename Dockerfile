FROM node:20-alpine
WORKDIR /app/react-search

COPY package.json ./
COPY yarn.lock ./
COPY vite.config.ts ./

RUN yarn install --non-interactive

COPY . .

RUN yarn run build

EXPOSE 4173

CMD ["yarn", "run", "preview"]