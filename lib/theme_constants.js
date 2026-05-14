/** Clave de `localStorage` para la preferencia de tema. */
export const theme_storage_key = "electricweb_theme";

/** Valor almacenado para tema claro. */
export const theme_value_light = "light";

/** Valor almacenado para tema oscuro. */
export const theme_value_dark = "dark";

/**
 * Script inline (sin etiquetas) que aplica la clase `dark` en `<html>` según preferencia guardada o por defecto oscuro.
 * Debe ejecutarse antes del primer paint para evitar flash.
 * @returns {string}
 */
export function get_theme_bootstrap_script_source() {
  const key = theme_storage_key;
  const light = theme_value_light;
  const dark = theme_value_dark;
  return `(function(){try{var k=${JSON.stringify(key)};var v=localStorage.getItem(k);var root=document.documentElement;if(v===${JSON.stringify(light)}){root.classList.remove("dark");}else{root.classList.add("dark");}}catch(e){document.documentElement.classList.add("dark");}})();`;
}
