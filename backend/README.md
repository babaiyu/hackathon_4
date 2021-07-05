# Backend - Hackathon 4.0
This project created using Fastify + Typescript

## Install `pnpm`

### Update `npm` using `nvm`

```
nvm install v14.15.1 

nvm use v14.15.1 

```

Make sure you have your npm version >= 14 to be able to install `pnpm`

```
npm i -g pnpm
```

### Local Development

```
pnpm run dev
```

### Run Production
```
pnpm run clean-build && pnpm run build
pnpm run start
```

### Build & Running for Docker
```
pnpm run docker-build
pnpm run docker-start
```
