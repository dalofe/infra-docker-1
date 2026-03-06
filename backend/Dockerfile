# Usamos una imagen ligera de Node
FROM node:18-alpine

# Le decimos a Docker: "Ponte en esta carpeta dentro del contenedor"
WORKDIR /app

# Copiamos los archivos de dependencias primero para aprovechar la caché
COPY package*.json ./

# ¡DIFERENCIA CLAVE! Instalamos SOLO las dependencias de producción.
# Ignoramos nodemon, jest, eslint, etc., para que la imagen sea más ligera y segura.
RUN npm install --production

# Copiamos el resto del código de la API
COPY . .

# Exponemos el puerto donde escucha tu API (asumamos que es el 3000)
EXPOSE 3000

# El comando que mantendrá la aplicación viva
CMD ["node", "index.js"]