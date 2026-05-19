Para registrarte por primera vez necesitas tener los dos levantados:

Levanta MongoDB.
Si usas MongoDB local, asegúrate de que el servicio esté iniciado. En Windows puedes revisar “Services” y buscar MongoDB, o iniciar desde terminal si lo tienes configurado.

Levanta el backend:
cd todoapp/backend
pnpm dev

MongoDB Conectado: 127.0.0.1
Servidor corriendo en puerto 5000

cd todoapp/frontend/todoapp
pnpm dev



npm install -g pnpm@latest-11
 @pnpm/exe ^11.1.2
+ bcryptjs 3.0.3
+ cors 2.8.6
+ dotenv 17.4.2
+ express 5.2.1
+ jsonwebtoken 9.0.3
+ mongoose 9.6.2
+ pnpm ^11.1.2
+ nodemon 3.1.14


pnpm run dev Normalmente usa nodemon, que reinicia el servidor automáticamente cuando guardas cambios.Sirve para:
Programar rápido
Ver errores detallados
Hacer pruebas

pnpm start Aquí NO se usa nodemon porque consumiría recursos innecesarios. 
Producción busca:
Mejor rendimiento
Más seguridad
Menos logs innecesarios 


-----------

Cómo se entrelazan las carpetas
El archivo principal real es server.js. Ahí pasa esto:
txt



server.js
  -> carga .env
  -> conecta MongoDB con config/db.js
  -> activa cors y express.json
  -> monta rutas /api/auth y /api/tasks
  -> activa errorHandler
  -> escucha en PORT

La estructura queda así:
txt



src/
  config/
    db.js
  models/
    User.js
    Task.js
  routes/
    authRoutes.js
    taskRoutes.js
  controllers/
    authController.js
    taskController.js
  middleware/
    auth.js
  services/
    authServices.js
    taskServices.js
  utils/
    errorHandler.js

Flujo de autenticación
Cuando llamas:
txt



POST /api/auth/register
POST /api/auth/login
GET  /api/auth/me

pasa por:
txt



routes/authRoutes.js
  -> controllers/authController.js
  -> models/User.js

En login, si el usuario existe y la contraseña coincide, el backend genera un JWT. Luego para rutas protegidas debes enviar:
txt



Authorization: Bearer TU_TOKEN

El middleware auth.js valida ese token y pone el usuario en:
js



req.user

Flujo de tareas
Las tareas usan:
txt



routes/taskRoutes.js
  -> middleware/auth.js
  -> controllers/taskController.js
  -> models/Task.js

Endpoints principales:
txt



GET    /api/tasks       -> lista tareas del usuario autenticado
POST   /api/tasks       -> crea tarea para ese usuario
DELETE /api/tasks/:id   -> elimina tarea si pertenece al usuario
PATCH  /api/tasks/:id   -> actualiza completed
