# 🥾 Bizkaibide — Excursiones de Día desde Bilbao

**Bizkaibide** es un sitio web dedicado a las mejores rutas de senderismo y excursiones de un día partiendo de Bilbao y la provincia de Bizkaia. Descubre senderos costeros, cimas emblemáticas y bosques mágicos del País Vasco.

> Proyecto personal desarrollado en el bootcamp **Peñascal F5** — Desarrollador Web Full Stack.

---

## 📸 Vista previa

| Página de inicio | Catálogo de rutas |
|:-:|:-:|
| Bienvenida con imagen interactiva y fecha del día | Tarjetas de rutas con filtros por dificultad, búsqueda y ordenación |

---

## ✨ Funcionalidades

- **Página de inicio** con imagen interactiva que cambia al pasar el ratón y muestra la fecha actual en formato legible.
- **Catálogo de rutas** con 8 rutas de senderismo reales de Bizkaia (Pagasarri, Flysch de Barrika, Bosque de Oma, Amboto, Gaztelugatxe, Salto del Nervión, Monte Gorbea y Acantilados de La Galea).
- **Sistema de filtros** por dificultad (Fácil, Fácil/Moderada, Moderada, Alta) con chips interactivos.
- **Búsqueda en tiempo real** por nombre o palabras clave.
- **Ordenación** por relevancia, distancia, tiempo o desnivel.
- **Página "Conócenos"** con información del proyecto, misión y pilares del equipo.
- **Formulario de contacto** con validación de campos y aceptación de políticas de privacidad.
- **Sistema de autenticación** (simulado) con páginas de Login y Registro.
- **Diseño responsive** adaptado a escritorio, tablet y móvil.
- **Estética premium** con glassmorphism, gradientes, micro-animaciones y paleta de colores inspirada en la naturaleza (verde bosque, ámbar dorado).

---

## 🗂️ Estructura del proyecto

```
bizkaibide/
├── index.html              # Página principal (Inicio)
├── style.css               # Hoja de estilos global (variables, header, footer, formularios)
├── README.md               # Documentación del proyecto
│
├── conocenos/              # Página "Conócenos"
│   ├── conocenos.html
│   └── conocenos.css
│
├── rutas/                  # Catálogo de rutas de senderismo
│   ├── rutas.html
│   └── rutas.css
│
├── icontacto/              # Formulario de contacto
│   ├── icontacto.html
│   └── icontacto.css
│
├── ilogin/                 # Inicio de sesión
│   ├── ilogin.html
│   ├── ilogin.css
│   └── informacion.html    # Página post-login
│
├── registro/               # Registro de usuario
│   ├── registro.html
│   └── registro.css
│
├── js/                     # Scripts de JavaScript
│   ├── fechadia.js         # Muestra la fecha actual en el header
│   ├── eventoimg.js        # Cambio interactivo de imagen en la home
│   ├── rutas.js            # Filtrado, búsqueda y ordenación de rutas
│   ├── login.js            # Validación del formulario de login
│   ├── registro.js         # Validación del formulario de registro
│   └── contacto.js         # Validación del formulario de contacto
│
└── img/                    # Recursos gráficos
    ├── logo_bizkaibide.svg # Logotipo del sitio (SVG vectorizado)
    ├── imagen1.jpeg        # Imagen de la home
    ├── imagen2.jpeg        # Cañón de Delika
    ├── imagen3.jpeg        # San Juan de Gaztelugatxe
    ├── imagen4.jpeg        # Parque Natural de Urkiola
    ├── imagen5.jpeg        # Monte Pagasarri
    ├── imagen7.jpeg        # Flysch de Barrika
    ├── imagen8.jpeg        # Bosque Pintado de Oma
    ├── gorbea.jpeg          # Imagen de Monte Gorbea
    └── la_galea.png        # Imagen de Acantilados de La Galea
```

---

## 🛠️ Tecnologías utilizadas

| Tecnología | Uso |
|---|---|
| **HTML5** | Estructura semántica de todas las páginas |
| **CSS3** | Estilos con variables CSS, flexbox, media queries, glassmorphism y gradientes |
| **JavaScript (ES6+)** | Interactividad: filtros, validación de formularios, manipulación del DOM |
| **Google Fonts** | Tipografía [Outfit](https://fonts.google.com/specimen/Outfit) |

---

## 🚀 Instalación y uso

Este proyecto es una aplicación web estática, no requiere ningún tipo de instalación ni servidor de backend.

### Opción 1: Abrir directamente

1. Clona el repositorio:
   ```bash
   git clone https://github.com/JuanCarlos0977/bizkaibide.git
   ```
2. Abre `index.html` en tu navegador.

### Opción 2: Usar Live Server (recomendado)

1. Clona el repositorio.
2. Abre la carpeta en **Visual Studio Code**.
3. Instala la extensión [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer).
4. Haz clic derecho sobre `index.html` → **"Open with Live Server"**.

### 🧩 Backend local con SQLite y API REST

Se ha añadido un backend en la carpeta `backend/` con una API REST para gestionar:
- `Excursiones` (título, descripción, imágenes, categoría, tiempo estimado, transporte y coordenadas)
- `Usuarios` (nombre, email, contraseña encriptada y rol)
- `Reseñas` (opcional: puntuación y texto)

Para ejecutar el backend:

```bash
cd backend
python3 -m pip install -r requirements.txt
python3 app.py
```

El servidor quedará disponible en `http://localhost:4000` y las rutas principales son:

- `GET /api/excursiones`
- `GET /api/excursiones/:id`
- `POST /api/excursiones`
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/reviews?excursionId=<id>`

---

## 🗺️ Páginas del sitio

| Página | Ruta | Descripción |
|---|---|---|
| **Inicio** | `index.html` | Landing page con bienvenida, imagen interactiva y fecha del día |
| **Conócenos** | `conocenos/conocenos.html` | Información sobre el proyecto, misión y valores |
| **Rutas** | `rutas/rutas.html` | Catálogo de 8 rutas con filtros, búsqueda y ordenación |
| **Contacto** | `icontacto/icontacto.html` | Formulario de contacto con validación |
| **Login** | `ilogin/ilogin.html` | Inicio de sesión (usuario de prueba: `juan@juan.es` / `1234567`) |
| **Registro** | `registro/registro.html` | Creación de cuenta con validación de contraseñas |

---

## 🏔️ Rutas disponibles

| Ruta | Dificultad | Distancia | Tiempo | Desnivel |
|---|---|---|---|---|
| Monte Pagasarri y Ganekogorta | 🟠 Moderada | 12 km | 4.0 h | +800 m |
| Flysch de Barrika a Plentzia | 🟢 Fácil | 8 km | 2.5 h | +150 m |
| Bosque de Oma y Santimamiñe | 🟡 Fácil / Med. | 7.5 km | 2.5 h | +200 m |
| Urkiola y Cresta del Amboto | 🔴 Alta | 10 km | 4.5 h | +850 m |
| San Juan de Gaztelugatxe | 🟢 Fácil | 3.5 km | 1.5 h | +250 m |
| Cañón de Delika y Salto del Nervión | 🟡 Fácil / Med. | 9 km | 3.0 h | +200 m |
| Monte Gorbea | 🟠 Moderada | 14 km | 5.0 h | +900 m |
| Acantilados de La Galea | 🟢 Fácil | 6 km | 2.0 h | +120 m |

---

## 🎨 Diseño y estética

El proyecto utiliza un sistema de diseño cohesionado con las siguientes características:

- **Paleta de colores** inspirada en la naturaleza vasca:
  - 🌲 Verde bosque oscuro (`#2d5016`) — Cabecera y acentos principales
  - 🌿 Verde bosque medio (`#3a6b22`) — Fondo secundario
  - 🌾 Ámbar dorado (`#d4a847`) — Acentos y llamadas a la acción
  - ☀️ Ámbar claro (`#f0d78c`) — Highlights y textos de énfasis
- **Glassmorphism** en formularios y tarjetas con `backdrop-filter: blur()`.
- **Gradientes** de fondo fijos para crear profundidad visual.
- **Micro-animaciones** con transiciones suaves en hover, botones y tarjetas.
- **Responsive design** con breakpoints en 992px, 768px y 480px.

---

## 👤 Autor

**Juan Carlos Gil**

- GitHub: [github.com/JuanCarlos0977](https://github.com/JuanCarlos0977)
- Bootcamp: Peñascal F5 — Desarrollador Web Full Stack

---

## 📄 Licencia

© 2026 Proyecto Personal. Todos los derechos reservados.
