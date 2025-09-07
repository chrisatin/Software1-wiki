# Software1 Wiki - Aplicación Web

Una aplicación web moderna que contiene el contenido completo de la wiki de Ingeniería de Software I, optimizada para despliegue en Amazon EC2.

## 📋 Características

- **Interfaz moderna y responsiva** con diseño adaptativo
- **Navegación dinámica** con sidebar colapsible
- **Contenido completo** de todos los modelos de desarrollo de software
- **Optimizada para EC2** con Docker y nginx
- **Configuración de seguridad** con headers HTTP y usuario no-root
- **Health checks** integrados para monitoreo
- **Compresión gzip** para mejor rendimiento

## 🚀 Despliegue Rápido en EC2

### Prerrequisitos

1. **Instancia EC2** con Ubuntu 20.04+ o Amazon Linux 2
2. **Docker** instalado
3. **Docker Compose** instalado
4. **Puerto 80** abierto en el Security Group

### Instalación de Docker (si no está instalado)

```bash
# Para Ubuntu/Debian
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER

# Instalar Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Reiniciar sesión para aplicar cambios de grupo
exit
# Volver a conectarse por SSH
```

### Despliegue Automático

1. **Subir archivos a EC2:**
```bash
# Usando SCP
scp -i your-key.pem -r . ubuntu@your-ec2-ip:/home/ubuntu/software1-wiki/

# O clonar desde Git
git clone https://github.com/your-repo/software1-wiki.git
cd software1-wiki
```

2. **Ejecutar script de despliegue:**
```bash
chmod +x deploy.sh
./deploy.sh
```

### Despliegue Manual

```bash
# Construir la imagen
docker build -t software1-wiki:latest .

# Ejecutar el contenedor
docker run -d \
  --name software1-wiki \
  --restart unless-stopped \
  -p 80:80 \
  software1-wiki:latest
```

### Despliegue con Docker Compose

```bash
# Despliegue básico
docker-compose up -d

# Con SSL (requiere configuración adicional)
docker-compose --profile ssl up -d
```

## 🔧 Configuración

### Variables de Entorno

El archivo `docker-compose.yml` incluye configuraciones opcionales:

```yaml
environment:
  - NODE_ENV=production
```

### Configuración de nginx

El archivo `nginx.conf` incluye:
- Compresión gzip
- Headers de seguridad
- Cache de archivos estáticos
- Health check endpoint
- Configuración optimizada para producción

### SSL/HTTPS (Opcional)

Para habilitar SSL con Let's Encrypt:

1. Configurar dominio en `docker-compose.yml`
2. Actualizar email en la configuración de Traefik
3. Ejecutar con perfil SSL:
```bash
docker-compose --profile ssl up -d
```

## 📱 Acceso a la Aplicación

- **Local:** http://localhost
- **Externo:** http://your-ec2-public-ip
- **Health Check:** http://your-ec2-public-ip/health

## 🛠️ Comandos Útiles

### Gestión del Contenedor

```bash
# Ver logs
docker logs -f software1-wiki

# Reiniciar aplicación
docker restart software1-wiki

# Detener aplicación
docker stop software1-wiki

# Iniciar aplicación
docker start software1-wiki

# Eliminar aplicación
docker stop software1-wiki && docker rm software1-wiki
```

### Monitoreo

```bash
# Estado del contenedor
docker ps -f name=software1-wiki

# Uso de recursos
docker stats software1-wiki

# Health check manual
curl -f http://localhost/health
```

### Actualización

```bash
# Detener contenedor actual
docker stop software1-wiki && docker rm software1-wiki

# Reconstruir imagen
docker build -t software1-wiki:latest .

# Iniciar nuevo contenedor
docker run -d --name software1-wiki --restart unless-stopped -p 80:80 software1-wiki:latest
```

## 🔒 Seguridad

La aplicación incluye:

- **Usuario no-root** en el contenedor
- **Headers de seguridad** HTTP
- **Configuración de nginx** optimizada
- **Health checks** para monitoreo
- **Logs de acceso** y errores

### Headers de Seguridad Incluidos

- `X-Frame-Options: SAMEORIGIN`
- `X-XSS-Protection: 1; mode=block`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: no-referrer-when-downgrade`
- `Content-Security-Policy`

## 📊 Estructura del Proyecto

```
software1-wiki/
├── index.html          # Página principal de la aplicación
├── styles.css          # Estilos CSS responsivos
├── script.js           # JavaScript para navegación dinámica
├── Dockerfile          # Configuración de Docker
├── nginx.conf          # Configuración de nginx
├── docker-compose.yml  # Orquestación con Docker Compose
├── deploy.sh           # Script de despliegue automatizado
├── .dockerignore       # Archivos a ignorar en Docker
└── README.md           # Esta documentación
```

## 🎯 Contenido de la Wiki

La aplicación incluye todo el contenido de la wiki original:

- **Página de Inicio** con objetivos del curso
- **Ciclo de Vida del Software** - Introducción general
- **Modelo en Cascada** - Desarrollo secuencial
- **Modelo de Prototipos** - Desarrollo iterativo
- **Modelo RAD** - Desarrollo rápido de aplicaciones
- **Modelo Evolutivo** - Desarrollo incremental
- **Modelo en Espiral** - Gestión de riesgos
- **Modelo en V** - Verificación y validación
- **Información del Docente** - Datos de contacto

## 🐛 Solución de Problemas

### Puerto 80 en uso

```bash
# Verificar qué proceso usa el puerto 80
sudo netstat -tlnp | grep :80

# Detener Apache si está corriendo
sudo systemctl stop apache2
```

### Problemas de permisos

```bash
# Asegurar que el usuario esté en el grupo docker
sudo usermod -aG docker $USER
newgrp docker
```

### Logs de errores

```bash
# Ver logs de nginx
docker logs software1-wiki

# Ver logs del sistema
sudo journalctl -u docker
```

## 📈 Optimizaciones de Rendimiento

- **Compresión gzip** habilitada
- **Cache de archivos estáticos** (1 año)
- **Configuración optimizada de nginx**
- **Imagen Docker ligera** (nginx:alpine)
- **Configuración de worker processes** automática

## 🤝 Contribuciones

Para contribuir al proyecto:

1. Fork el repositorio
2. Crear una rama para tu feature
3. Hacer commit de los cambios
4. Push a la rama
5. Crear un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo LICENSE para más detalles.

## 📞 Soporte

Para soporte técnico o preguntas sobre el despliegue:

- **Email:** jeisonmauriciod@saber.uis.edu.co
- **LinkedIn:** [Jeison Mauricio Delgado González](https://www.linkedin.com/in/jeisonmauriciod/)

---

**Desarrollado para el curso de Ingeniería de Software I**  
*Universidad Industrial de Santander*
