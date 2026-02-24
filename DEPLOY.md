# Despliegue

## Si ves pantalla negra al desplegar

Si tu sitio está en una **subruta** (ej: `tudominio.com/miportafolio/`), edita `vite.config.js`:

```js
base: '/miportafolio/',  // nombre de tu repo o carpeta
```

Luego vuelve a hacer `npm run build`.

## Si está en la raíz

`base: '/'` (por defecto) está bien para Vercel, Netlify o dominio propio en raíz.
