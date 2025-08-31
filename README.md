🚀Tienda en línea de videojuegos - Frontend y Backend

📌Descripción
Este proyecto es una tienda en línea de videojuegos, que incluye un carrito de compras y un panel administrativo integrado.

-Los usuarios normales pueden explorar el catálogo de videojuegos, agregar productos al carrito y realizar compras seguras mediante Stripe.

-Los administradores tienen acceso adicional al panel de administración, desde donde gestionan productos, usuarios y pedidos.

El sistema combina frontend y backend en una misma aplicación, integrando tanto la interfaz de usuario como la lógica de negocio.

🛠️Tecnologías utilizadas
1.-Frontend
-Next.js – framework de React para aplicaciones web modernas.
-Emotion Styled – librería de estilos CSS-in-JS.
-Animate.css – animaciones predefinidas.
-FontAwesome – íconos para la UI.
-Axios – cliente HTTP.
-Stripe.js + @stripe/react-stripe-js – integración de pagos con tarjeta.

2.-Backend
-Node.js + Express – servidor backend.
-MongoDB (Mongoose) – base de datos NoSQL.
-JSON Web Tokens (JWT) + bcryptjs – autenticación y seguridad.
-Multer – gestión de archivos (imágenes de productos).
-dotenv y cors – configuración y seguridad.

⚙️Instalación y ejecución

1.-Clonar el repositorio:
git clone https://github.com/EdannyDev/games-app

2.-Instalar dependencias:
npm install

3.-Configurar variables de entorno:
En la raíz del proyecto (Next.js):
.env.local
STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxxx
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=pk_test_xxxxxxxxxxxxx

4.-Dentro de la carpeta backend:
.env
PORT=5000
MONGO_URI=mongodb://localhost:27017/gamesDB
JWT_SECRET=tu_secreto_jwt

5.-Levantar la aplicación en modo desarrollo:
npm run dev

6.-Acceder desde el navegador:
Frontend (Tienda + Panel Admin): http://localhost:3000
Backend API (Express): http://localhost:5000

✨Características principales
-Carrito de compras con pagos seguros mediante Stripe.
-Catálogo dinámico de videojuegos, con detalles y búsqueda.
-Autenticación de usuarios con roles (usuario y administrador).
-Panel administrativo:
    1.Gestión de productos.
    2.Gestión de usuarios.
-Subida de imágenes para productos mediante Multer.
-Interfaz moderna y animada con Emotion Styled, Animate.css y FontAwesome.