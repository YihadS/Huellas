# Sistema de Gestión de Clínica Veterinaria

Bienvenido al Sistema de Gestión de Clínica Veterinaria HUELLAS. Este sistema es una herramienta diseñada para ayudar a las clínicas veterinarias a gestionar sus operaciones diarias de manera eficiente. Desde el seguimiento de pacientes y sus historiales médicos hasta la programación de citas y la gestión de facturación, nuestro sistema tiene como objetivo simplificar y optimizar las tareas relacionadas con la atención médica y el funcionamiento de la clínica.

## Integrantes GRUPO E
- Yihad Salek Villalba
- Edward Viruez Roca
- Dabbya Jaimes Martínez
- Antonio de Jesus Peredo

## Instrucciones de Instalación
A continuación, se detallan los pasos para instalar y configurar el Sistema de Gestión de Clínica Veterinaria, que utiliza una combinación de tecnologías de React (front-end) y PHP (back-end).

### Paso 1: Instalar Laragon (o XAMPP)
1. Descargue e instale Laragon desde [laragon.org](https://laragon.org/download/). Alternativamente, puede optar por utilizar XAMPP siguiendo las instrucciones en [apachefriends.org](https://www.apachefriends.org/download.html).

### Paso 2: Configurar la Parte de PHP (Laragon)
1. Abra Laragon (o XAMPP) y asegúrese de que los servicios de Apache y MySQL estén activos.
2. Navegue a la carpeta "www" dentro de la instalación de Laragon (generalmente en `C:\laragon\www`).
3. Cree una nueva carpeta para el proyecto de la Clínica Veterinaria con el nombre "Huellas" y copie los archivos del proyecto en esta carpeta.

### Paso 3: Configurar la Comunicación entre React y PHP
1. Asegúrese de tener Node.js y npm (Node Package Manager) instalados en su sistema. Puede descargarlos desde [nodejs.org](https://nodejs.org/).
2. Abra una terminal y navegue a la carpeta de su proyecto de la Clínica Veterinaria.
3. Abra el archivo `src/App.js` en un editor de texto y realice las modificaciones necesarias para conectar con el back-end PHP a través de API REST u otras comunicaciones.

### Paso 4: Configurar la Base de Datos
1. Cree una base de datos llamada "huellas" en phpMyAdmin o su gestor de bases de datos preferido.
2. Importe el archivo `.sql` proporcionado en la base de datos "veterinaria". Este archivo contendrá las tablas y datos iniciales necesarios para la aplicación.
3. Para configurar la conexión a la base de datos en el backend PHP:
   - Abra la carpeta "backend" en su proyecto.
   - Busque el archivo `conn.php` en la carpeta y ábralo en un editor de texto.
   - Modifique los valores de host, usuario, contraseña y nombre de la base de datos para que coincidan con su configuración de base de datos. Por ejemplo:

     ```php
     $host = "localhost";  // Cambie esto al host de su base de datos
     $user = "root";       // Cambie esto al usuario de la base de datos
     $password = "";       // Cambie esto a la contraseña de la base de datos
     $database = "veterinaria";  // Cambie esto al nombre de su base de datos

### Paso 5: Ejecutar los Servidores
1. Abra Laragon (si no está abierto) y asegúrese de que los servicios de Apache y MySQL estén activos.
2. Navegue a la carpeta de su proyecto de la Clínica Veterinaria en una terminal.
3. Ejecute el siguiente comando para iniciar el servidor de desarrollo de React: [npm run start]
4. Abra su navegador y vaya a http://localhost:3000 para ver la aplicación de la Clínica Veterinaria en funcionamiento.

Con estos pasos, debería tener el Sistema de Gestión de Clínica Veterinaria funcionando en su entorno de desarrollo local. Recuerde que esta guía proporciona los pasos básicos para configurar el entorno. 


## Características Principales
- **Login:** Permite al usuario operador ingresar al sistema con sus respectivos credenciales.

- **Registro de Mascotas:** Mantenga un registro completo de todas las mascotas que visitan la clínica, incluidos sus datos, historial clínico y otra información relevante.

- **Registro de Clientes:** Mantenga un registro completo de todos los que visitan la clínica, incluidos sus datos y otra información relevante.

- **Interfaz Principal:** Permite visualizar la interfaz gráfica del sistema, en donde tendremos nuestro menú de navegación y otra información relevante.

- **Cerrar Sesión:** Permite que el usuario que ha ingresado pueda salirse del sistema.


