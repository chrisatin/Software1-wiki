# Guía de Despliegue en EC2 - Software1 Wiki

Esta guía detallada te ayudará a desplegar la aplicación Software1 Wiki en una instancia de Amazon EC2.

## 📋 Tabla de Contenidos

1. [Prerrequisitos](#prerrequisitos)
2. [Configuración de EC2](#configuración-de-ec2)
3. [Instalación de Dependencias](#instalación-de-dependencias)
4. [Despliegue de la Aplicación](#despliegue-de-la-aplicación)
5. [Configuración de Dominio (Opcional)](#configuración-de-dominio-opcional)
6. [Monitoreo y Mantenimiento](#monitoreo-y-mantenimiento)
7. [Solución de Problemas](#solución-de-problemas)

## Prerrequisitos

### 1. Instancia EC2

- **Sistema Operativo:** Ubuntu 20.04 LTS o Amazon Linux 2
- **Tipo de Instancia:** t2.micro (gratuita) o superior
- **Almacenamiento:** Mínimo 8 GB
- **Security Group:** Puerto 80 (HTTP) y 22 (SSH) abiertos

### 2. Acceso SSH

- Par de claves EC2 descargado
- Permisos correctos en el archivo de clave (chmod 400)

## Configuración de EC2

### 1. Conectar a la Instancia

```bash
ssh -i "tu-clave.pem" ubuntu@tu-ip-publica
```

### 2. Actualizar el Sistema

```bash
sudo apt update && sudo apt upgrade -y
```

### 3. Configurar Security Group

En la consola de AWS EC2:

1. Ir a **Security Groups**
2. Seleccionar el Security Group de tu instancia
3. **Inbound Rules** → **Edit inbound rules**
4. Agregar regla:
   - **Type:** HTTP
   - **Port:** 80
   - **Source:** 0.0.0.0/0

## Instalación de Dependencias

### 1. Instalar Docker

```bash
# Descargar script de instalación
curl -fsSL https://get.docker.com -o get-docker.sh

# Ejecutar instalación
sudo sh get-docker.sh

# Agregar usuario al grupo docker
sudo usermod -aG docker $USER

# Verificar instalación
docker --version
```

### 2. Instalar Docker Compose

```bash
# Descargar Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

# Dar permisos de ejecución
sudo chmod +x /usr/local/bin/docker-compose

# Verificar instalación
docker-compose --version
```

### 3. Reiniciar Sesión

```bash
# Cerrar sesión SSH
exit

# Reconectar para aplicar cambios de grupo
ssh -i "tu-clave.pem" ubuntu@tu-ip-publica
```

## Despliegue de la Aplicación

### Método 1: Despliegue Automático (Recomendado)

#### 1. Subir Archivos

```bash
# Crear directorio
mkdir -p ~/software1-wiki
cd ~/software1-wiki

# Subir archivos desde tu máquina local
# (Ejecutar en tu máquina local)
scp -i "tu-clave.pem" -r . ubuntu@tu-ip-publica:~/software1-wiki/
```

#### 2. Ejecutar Script de Despliegue

```bash
# Dar permisos de ejecución
chmod +x deploy.sh

# Ejecutar despliegue
./deploy.sh
```

### Método 2: Despliegue Manual

#### 1. Crear Archivos de la Aplicación

```bash
# Crear directorio
mkdir -p ~/software1-wiki
cd ~/software1-wiki

# Crear archivos (copiar contenido desde tu máquina local)
nano index.html
nano styles.css
nano script.js
nano Dockerfile
nano nginx.conf
```

#### 2. Construir y Ejecutar

```bash
# Construir imagen Docker
docker build -t software1-wiki:latest .

# Ejecutar contenedor
docker run -d \
  --name software1-wiki \
  --restart unless-stopped \
  -p 80:80 \
  software1-wiki:latest
```

### Método 3: Docker Compose

```bash
# Crear docker-compose.yml
nano docker-compose.yml

# Ejecutar con Docker Compose
docker-compose up -d
```

## Verificación del Despliegue

### 1. Verificar Estado del Contenedor

```bash
docker ps -f name=software1-wiki
```

### 2. Verificar Logs

```bash
docker logs software1-wiki
```

### 3. Health Check

```bash
curl -f http://localhost/health
```

### 4. Acceso Web

Abrir en navegador: `http://tu-ip-publica`

## Configuración de Dominio (Opcional)

### 1. Configurar DNS

1. En tu proveedor de DNS, crear registro A:
   - **Name:** wiki (o subdominio deseado)
   - **Value:** IP pública de tu EC2

### 2. Configurar SSL con Let's Encrypt

```bash
# Crear directorio para certificados
mkdir -p ~/letsencrypt

# Actualizar docker-compose.yml con tu dominio
nano docker-compose.yml

# Ejecutar con SSL
docker-compose --profile ssl up -d
```

## Monitoreo y Mantenimiento

### 1. Comandos de Monitoreo

```bash
# Estado del contenedor
docker ps

# Uso de recursos
docker stats software1-wiki

# Logs en tiempo real
docker logs -f software1-wiki

# Espacio en disco
df -h
```

### 2. Actualización de la Aplicación

```bash
# Detener contenedor actual
docker stop software1-wiki && docker rm software1-wiki

# Reconstruir imagen
docker build -t software1-wiki:latest .

# Iniciar nuevo contenedor
docker run -d \
  --name software1-wiki \
  --restart unless-stopped \
  -p 80:80 \
  software1-wiki:latest
```

### 3. Backup

```bash
# Crear backup de la configuración
tar -czf software1-wiki-backup-$(date +%Y%m%d).tar.gz ~/software1-wiki/

# Backup de la imagen Docker
docker save software1-wiki:latest | gzip > software1-wiki-image-$(date +%Y%m%d).tar.gz
```

## Solución de Problemas

### Problema: Puerto 80 en uso

```bash
# Verificar qué proceso usa el puerto 80
sudo netstat -tlnp | grep :80

# Detener Apache si está corriendo
sudo systemctl stop apache2
sudo systemctl disable apache2
```

### Problema: Permisos de Docker

```bash
# Verificar grupo del usuario
groups $USER

# Agregar usuario al grupo docker
sudo usermod -aG docker $USER
newgrp docker
```

### Problema: Contenedor no inicia

```bash
# Ver logs detallados
docker logs software1-wiki

# Verificar configuración
docker inspect software1-wiki

# Reconstruir imagen
docker build --no-cache -t software1-wiki:latest .
```

### Problema: No se puede acceder desde internet

1. **Verificar Security Group:**
   - Puerto 80 debe estar abierto para 0.0.0.0/0

2. **Verificar firewall local:**
```bash
sudo ufw status
sudo ufw allow 80
```

3. **Verificar que el contenedor esté corriendo:**
```bash
docker ps
curl localhost
```

### Problema: Aplicación lenta

```bash
# Verificar recursos
docker stats software1-wiki
htop

# Optimizar nginx
# Editar nginx.conf para ajustar worker_processes
```

## Comandos de Emergencia

### Reinicio Completo

```bash
# Detener todo
docker stop software1-wiki
docker rm software1-wiki

# Limpiar imágenes
docker rmi software1-wiki:latest

# Reconstruir y ejecutar
docker build -t software1-wiki:latest .
docker run -d --name software1-wiki --restart unless-stopped -p 80:80 software1-wiki:latest
```

### Logs de Sistema

```bash
# Logs de Docker
sudo journalctl -u docker

# Logs del sistema
sudo journalctl -f

# Logs de nginx dentro del contenedor
docker exec software1-wiki tail -f /var/log/nginx/access.log
docker exec software1-wiki tail -f /var/log/nginx/error.log
```

## Configuración Avanzada

### 1. Configurar Logs Centralizados

```bash
# Instalar rsyslog
sudo apt install rsyslog

# Configurar para enviar logs a servicio externo
# (Configuración específica según el servicio)
```

### 2. Configurar Monitoreo

```bash
# Instalar herramientas de monitoreo
sudo apt install htop iotop nethogs

# Configurar alertas (ejemplo con cron)
crontab -e
# Agregar: */5 * * * * /home/ubuntu/check-app.sh
```

### 3. Configurar Auto-scaling

Para configurar auto-scaling en AWS:

1. Crear Launch Template
2. Configurar Auto Scaling Group
3. Configurar Application Load Balancer
4. Configurar Health Checks

## Costos Estimados

### EC2 t2.micro (Free Tier)
- **Costo:** $0/mes (primer año)
- **Especificaciones:** 1 vCPU, 1 GB RAM
- **Adecuado para:** Desarrollo y pruebas

### EC2 t3.small
- **Costo:** ~$15/mes
- **Especificaciones:** 2 vCPU, 2 GB RAM
- **Adecuado para:** Producción ligera

### EC2 t3.medium
- **Costo:** ~$30/mes
- **Especificaciones:** 2 vCPU, 4 GB RAM
- **Adecuado para:** Producción con tráfico moderado

## Conclusión

Con esta guía deberías poder desplegar exitosamente la aplicación Software1 Wiki en EC2. La aplicación está optimizada para ser ligera, segura y fácil de mantener.

Para soporte adicional, contacta a:
- **Email:** jeisonmauriciod@saber.uis.edu.co
- **LinkedIn:** [Jeison Mauricio Delgado González](https://www.linkedin.com/in/jeisonmauriciod/)
