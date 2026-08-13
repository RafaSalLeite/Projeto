# Estágio 1: Instalação das dependências (PrimeReact, Icons, etc.) e Build
FROM node:18-alpine AS build-step
WORKDIR /app
COPY package.json ./
# Este comando abaixo baixa tudo o que você me mostrou no JSON:
RUN npm install 
COPY . .
RUN npm run build

# Estágio 2: Servidor Nginx para o front-end
FROM nginx:alpine
# Copiamos a pasta 'dist' porque seu projeto usa Vite:
COPY --from=build-step /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]