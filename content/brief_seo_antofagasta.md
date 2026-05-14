# Brief de contenido y SEO — Computación y mantenimiento (Antofagasta)

## Objetivo del sitio

Generar **cotizaciones** (leads) para tres líneas: equipos computacionales, reparación/mantenimiento (mensaje central: **ahorra con mantenimiento**) y venta de accesorios. **Sin e-commerce** ni checkout.

## Audiencia

- Empresas, estudiantes y particulares en **Antofagasta, Chile** que buscan alargar la vida útil de sus equipos, reparar con transparencia o comprar accesorios compatibles.
- Búsquedas típicas: reparación notebook Antofagasta, mantenimiento PC, venta accesorios computación, cotización equipo oficina.

## Propuesta de valor (mensajes clave)

1. **Ahorra con mantenimiento:** revisiones y limpieza para evitar fallas costosas.
2. **Cobertura local:** servicio en Antofagasta y comunas cercanas (ajustar según operación real).
3. **Respuesta rápida:** formulario de cotización y canal telefónico/WhatsApp (completar datos reales en `lib/site_config.js` y página contacto).
4. **Tres pilares claros:** equipos, taller de reparación, accesorios.

## Tono

Profesional, directo, sin promesas técnicas no verificables. Evitar “garantizamos 100%” sin respaldo legal/técnico.

## SEO on-page (implementado en `metadata` de cada ruta)

| Ruta | Enfoque de keywords |
|------|---------------------|
| Home | computación, mantenimiento, reparación, accesorios, Antofagasta |
| `/equipos` | venta PC Antofagasta, notebook cotización |
| `/servicios/reparacion` | reparación notebook, mantenimiento preventivo, taller |
| `/servicios/accesorios` | accesorios computación, periféricos, compatibilidad |
| `/contacto` | contacto, cotización, Antofagasta |

## Formulario de cotización

Campos: nombre, correo, teléfono, tipo de servicio, mensaje. Política de datos: enlazar a texto legal cuando exista página de privacidad.

## Próximos pasos editoriales (fuera de código)

- Sustituir textos placeholder por datos reales de la empresa (RUT, razón social, dirección, horario).
- Añadir **Política de privacidad** y revisión legal chilena (Ley 19.628) si se almacenan datos personales.
- Schema.org `LocalBusiness` (JSON-LD) cuando los datos NAP estén definidos.
