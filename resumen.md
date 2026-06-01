# Resumen del proceso de creación de Bizkaibide

## 1. Objetivo del proyecto
Bizkaibide es una aplicación web de rutas de senderismo diseñada para mostrar excursiones de un día desde Bilbao y Bizkaia. El objetivo fue crear una experiencia visual atractiva, práctica y responsive con filtros, búsqueda y una interfaz moderna basada en glassmorphism.

## 2. Tecnologías utilizadas
- HTML5 para la estructura semántica de las páginas.
- CSS3 para los estilos globales, componentes y diseño responsive.
- JavaScript (ES6+) para la lógica de interacción, validación y manipulación del DOM.
- Google Fonts para la tipografía `Outfit`.
- Backend en Python con Flask para la API REST local (carpeta `backend/`).

## 3. Estructura principal del proyecto
- `index.html` — página de inicio con imagen interactiva y fecha del día.
- `style.css` — estilos globales, variables y componentes comunes.
- `conocenos/` — página de presentación del proyecto.
- `rutas/` — catálogo de rutas con filtros, búsqueda y ordenación.
- `icontacto/` — formulario de contacto con validación.
- `ilogin/` — páginas de login y post-login.
- `registro/` — formulario de registro con validación de contraseñas.
- `js/` — scripts de interacción y validación.
- `img/` — recursos gráficos e imágenes de las rutas.
- `backend/` — servidor local con API REST y datos estructurados.

## 4. Proceso de desarrollo: paso a paso
1. Definir la idea general: una web de rutas de senderismo con experiencia visual y filtros útiles.
2. Crear la página de inicio (`index.html`) con un hero interactivo, fecha dinámica y navegación clara.
3. Diseñar la hoja de estilos global (`style.css`) para gestionar colores, tipografía, layout y responsive.
4. Construir la página de rutas (`rutas/rutas.html`) con tarjetas de excursiones y lógica de filtrado/búsqueda en `js/rutas.js`.
5. Añadir funcionalidades de búsqueda en tiempo real y ordenación por relevancia, distancia, tiempo y desnivel.
6. Integrar páginas secundarias: `conocenos/conocenos.html`, `icontacto/icontacto.html`, `ilogin/ilogin.html`, `registro/registro.html`.
7. Implementar validación de formularios en `js/contacto.js`, `js/login.js` y `js/registro.js`.
8. Crear el backend local en `backend/` para simular API REST con rutas de excursiones, usuarios y reseñas.
9. Probar el sitio en distintos dispositivos y ajustar media queries para diseños móviles y tablet.
10. Documentar el proyecto en `README.md` y mantener una estructura clara de archivos.

## 5. Desarrollo del backend local
- Se incluyó un servidor Flask en `backend/app.py`.
- Se configuró una API REST con endpoints para excursiones, autenticación y reseñas.
- Se agregaron rutas de ejemplo para `GET /api/excursiones`, `POST /api/auth/register` y `POST /api/auth/login`.
- Se incorporó un archivo `requirements.txt` para instalar dependencias del backend.

## 6. Ejecución del proyecto
### Frontend
- Abrir `index.html` directamente en el navegador.
- O usar Live Server desde VS Code para un flujo de desarrollo más cómodo.

### Backend local
- Navegar a la carpeta `backend/`.
- Ejecutar:
  ```bash
  python3 -m pip install -r requirements.txt
  python3 app.py
  ```
- El servidor se ejecuta en `http://localhost:4000`.

## 7. Cómo avanzar en el proyecto
- Añadir más rutas y contenido real en la página de rutas.
- Conectar el frontend directamente con la API REST del backend.
- Implementar almacenamiento persistente con SQLite en el backend.
- Mejorar la gestión de usuarios y autenticación real.
- Añadir reseñas y valoraciones para cada excursión.

---

Este archivo resume los pasos clave y la estructura del proyecto Bizkaibide, desde la idea inicial hasta la construcción de la interfaz y el backend local.