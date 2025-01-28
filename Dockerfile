# Usamos la imagen oficial de Node.js
FROM node:18-alpine

# Establecemos el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiamos el archivo de dependencias y lo instalamos
COPY package*.json ./
RUN npm install

# Copiamos todo el contenido de nuestro proyecto
COPY . .

# Exponemos el puerto que usará Next.js
EXPOSE 3000

# Comando por defecto para ejecutar la aplicación
CMD ["npm", "run", "dev"]
