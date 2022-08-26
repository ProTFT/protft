FROM node:16-alpine AS builder

WORKDIR "/app"

COPY . .

RUN yarn

WORKDIR "/app/packages/api"

RUN yarn build

FROM node:16-alpine AS production

WORKDIR "/app"

COPY --from=builder /app/.yarn ./.yarn
COPY --from=builder /app/packages/api/dist ./packages/api/dist
COPY --from=builder /app/packages/api/package.json ./packages/api/package.json
COPY --from=builder /app/.pnp.cjs ./.pnp.cjs
COPY --from=builder /app/.pnp.loader.mjs ./.pnp.loader.mjs
COPY --from=builder /app/.yarnrc.yml ./.yarnrc.yml
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/yarn.lock ./yarn.lock

EXPOSE 3001

WORKDIR "/app/packages/api"

CMD [ "sh", "-c", "yarn start:prod"]

