# ==========================================
# ETAPA 1: El Constructor (Builder)
# ==========================================
# Usamos una imagen oficial de Node (versión 18, versión ligera 'alpine')
FROM node:18-alpine as builder

# Le decimos a Docker: "Ponte en esta carpeta dentro del contenedor"
WORKDIR /app

# Copiamos solo los archivos de dependencias primero (buena práctica de caché)
COPY package.json package-lock.json ./

# Instalamos las dependencias
RUN npm install

# Ahora sí, copiamos todo el resto de tu código fuente
COPY . .

# Define an argument that Docker will expect during the build process
ARG VITE_API_URL

# Convert that argument into an Environment Variable for the Node/Vite process
ENV VITE_API_URL=$VITE_API_URL

# Compilamos la aplicación de React/TS (esto generará la carpeta /dist o /build)
RUN npm run build


# ==========================================
# ETAPA 2: El Servidor Web (Producción)
# ==========================================
# Usamos Nginx, un servidor web rapidísimo y súper ligero
FROM nginx:alpine

# ¡Aquí ocurre la magia! 
# Vamos a la ETAPA 1 (builder) y le "robamos" la carpeta compilada.
# La copiamos en la ruta donde Nginx sirve los archivos estáticos por defecto.
# Nota: Si usas Vite, la carpeta es 'dist'. Si usas Create React App, es 'build'.
COPY --from=builder /app/dist /usr/share/nginx/html

# Opcional: Exponemos el puerto 80 para indicar por dónde escucha Nginx
EXPOSE 80

# Arrancamos Nginx
CMD ["nginx", "-g", "daemon off;"]