# computacionWeb — sitio Next.js (Antofagasta)



Plantilla Cursor del repo + **aplicación Next.js 15** (App Router, JavaScript, Tailwind) para equipos computacionales, reparación, venta de accesorios y mensaje central **«ahorra con mantenimiento»**, con **solo cotización** (sin checkout).



## Requisitos



- Node.js 20+



## Arranque



```bash

npm install

cp .env.example .env.local

npm run dev

```



**CSP y scripts `$RC` / `$RB`:** esos nombres son código interno de Next/React para hidratación; es normal que aparezcan si el navegador muestra el fragmento bloqueado. Este proyecto **no define** cabecera `Content-Security-Policy` en la app (evita romper `npm run dev` y `localhost`). Si igual ves CSP, suele ser **extensión del navegador**, **antivirus** o un **proxy**; prueba ventana de incógnito sin extensiones o revisa en DevTools → pestaña *Red* → documento HTML → *Encabezados de respuesta* quién envía `Content-Security-Policy`. Tras cambiar `next.config.mjs`, borra `.next` y reinicia: `Remove-Item -Recurse -Force .next` y luego `npm run dev`.



Abre [http://localhost:3000](http://localhost:3000). Healthcheck: [http://localhost:3000/api/health](http://localhost:3000/api/health).



**TypeScript en `.js` (App Router):** `jsconfig.json` declara `jsx: "preserve"`, referencias Next en `next-env.d.ts` y dependencias de desarrollo `@types/react` / `@types/react-dom`, para que el analizador no marque TS17004 (*Cannot use JSX unless the '--jsx' flag is provided*) en páginas con JSX. Si el IDE sigue mostrando el aviso, recarga la ventana del editor.



## SDD (OpenSpec)

Especificaciones versionadas en [openspec/](openspec/): configuración del proyecto en [openspec/config.yaml](openspec/config.yaml), spec base en [openspec/specs/web/spec.md](openspec/specs/web/spec.md), cambios activos en `openspec/changes/{nombre}/`.

## Tests



`npm test` ejecuta `lib/*.test.mjs` y, si existe la carpeta, `scripts/*.test.mjs`. Los de `lib/` cubren validación y límites del flujo de contacto (entrada de usuario hacia la API). Los de `scripts/` cubren el middleware de guardrails descrito en [ai-team/orchestrator.md](ai-team/orchestrator.md) (sanitizado de comandos, rutas y secretos). Ese archivo define el **rol del orquestador** entre agentes; la suite no sustituye una revisión manual de seguridad, solo automatiza comprobaciones acotadas del código.



## Estructura relevante



- Rutas públicas: [app/(public)/](app/(public)/) — `/equipos`, `/servicios/reparacion`, `/servicios/accesorios`, `/contacto`

- Formulario: [components/forms/cotizacion_form.js](components/forms/cotizacion_form.js)

- API contacto: [app/api/contacto/route.js](app/api/contacto/route.js)

- Brief SEO/contenido: [content/brief_seo_antofagasta.md](content/brief_seo_antofagasta.md)

- Tokens de marca (sincronizar con Figma): [app/globals.css](app/globals.css) define paleta **clara** en `:root` y **oscura** en `.dark`; [tailwind.config.js](tailwind.config.js)

- Tema: script `beforeInteractive` + botón sol/luna en la barra superior; preferencia en `localStorage` (`lib/theme_constants.js`).

- Fotos remotas (Unsplash): [lib/photo_refs.js](lib/photo_refs.js) — dominios permitidos en [next.config.mjs](next.config.mjs)



## Variables de entorno



Ver [.env.example](.env.example). `CONTACT_WEBHOOK_URL` es opcional: si está definida, el POST `/api/contacto` reenvía el JSON validado al webhook.



## Figma



Archivo de referencia en Figma (`fileKey` `epNqrpzcyg7yc6hCivMva6`): [abrir en Figma](https://www.figma.com/design/epNqrpzcyg7yc6hCivMva6/Sin-t%C3%ADtulo). Sincronizar colores y tipografías desde Figma cuando el diseño esté definido.



## Revisión de seguridad (implementada en código)

- Validación server-side de campos y longitudes en [lib/contact_validation.js](lib/contact_validation.js).

- Honeypot `website` en el formulario; respuesta neutra si se rellena ([app/api/contacto/route.js](app/api/contacto/route.js)).

- Rate limiting básico por IP en memoria ([lib/contact_rate_limit.js](lib/contact_rate_limit.js)) — en serverless multi-instancia conviene sustituir por Redis/edge limiter.

- Respuestas de error genéricas (`code` corto) sin volcar stack al cliente.

- Secretos solo en `.env.local` (no versionado).

- Cabecera **HSTS** opcional en producción: define `ENABLE_HSTS=true` solo detrás de HTTPS (ver [.env.example](.env.example)). **CSP** no se envía desde esta app; configurarla en el edge/proxy con nonces si la necesitas.



## Plantilla Cursor original



Sigue existiendo la guía en [START_HERE.md](START_HERE.md) y el pipeline en la documentación que copiaste con `npm run setup:cursor` en otros proyectos.



## Origen



Copia temática de [electricWeb](../electricWeb) (mismo diseño y stack), orientada a computación y **ahorra con mantenimiento**.


