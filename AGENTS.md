# AGENTS — computacionWeb

Este workspace **mezcla** la plantilla Cursor (`.cursor/`, `ai-team/`, `STACK.md`) con una **app Next.js** ejecutable en la raíz. Es una copia temática de **electricWeb** con foco en equipos computacionales, reparación, accesorios y el mensaje **«ahorra con mantenimiento»**.

- **Cómo correr el producto:** [README.md](README.md) (`npm install`, `npm run dev`).
- **Perfiles y stack:** [STACK.md](STACK.md) — perfil activo típico `next-tailwind`.
- **Arquitectura de carpetas Next:** [.cursor/skills/frontend/next_architecture.md](.cursor/skills/frontend/next_architecture.md).
- **Tema claro/oscuro:** clase `dark` en `<html>`, Tailwind `darkMode: 'class'`, persistencia `localStorage` (`lib/theme_constants.js`), botón en [components/shared/public_navbar.js](components/shared/public_navbar.js).
- **Tests y orquestación:** `npm test` y relación con `ai-team/orchestrator.md` en [README.md](README.md) (sección *Tests*).
