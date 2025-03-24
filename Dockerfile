FROM node:18-slim

WORKDIR /app
COPY index.js ./

RUN npm init -y && \
    npm install express axios && \
    npm pkg set type="module"

ENV PORT=3000

CMD ["node", "index.js"]
