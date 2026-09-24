# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

## Catálogo de contenidos

La home consulta `GET /api/contents` al montarse y separa `AUDIOBOOK` y `VIDEO`.
Por ahora muestra todos los cursos. El destacado usa el primer audiolibro con
`featured: true`, o el primero disponible si ninguno está destacado.

Configura `VITE_API_URL=http://localhost:8080` en `front/.env` (URL base, sin
`/api`) y reinicia Vite si cambias esa variable. Arranca el backend con su
configuración de base de datos y el front con `npm run dev` desde `front`.
El CORS del backend permite `http://localhost:5173`.

Comprobación manual en `/home`:

- El catálogo debe mostrar los 4 vídeos y 3 audiolibros insertados.
- Los audios usan la portada, si existe, y controles de reproducción.
- Los vídeos no usan miniaturas: se reproducen silenciados al entrar en pantalla,
  con controles para activar sonido; se pausan al salir de pantalla.
- Al reproducir otro contenido, el anterior se pausa.
- Si falla la petición aparece «Reintentar»; sin registros, aparecen mensajes de catálogo vacío.
- Si falla un archivo multimedia se ofrece un enlace para abrirlo.

Estas llamadas solo leen contenidos: aún no guardan progreso ni conceden puntos.
