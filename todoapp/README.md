
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