/**
 * Tests para validación del formulario de contacto.
 * Ejecutar: `node --test lib/contact_validation.test.mjs`
 */

import { test } from "node:test";
import assert from "node:assert/strict";
import { validate_contact_payload } from "./contact_validation.js";

const MINIMAL_VALID = {
  nombre: "Juan Pérez",
  correo: "juan@ejemplo.cl",
  telefono: "+56 9 1234 5678",
  tipo_servicio: "equipos",
  mensaje: "Necesito cotizar un notebook para oficina",
};

test("payload válido pasa la validación", () => {
  const r = validate_contact_payload(MINIMAL_VALID);
  assert.equal(r.ok, true);
  if (r.ok) {
    assert.equal(r.value.nombre, "Juan Pérez");
    assert.equal(r.value.correo, "juan@ejemplo.cl");
  }
});

test("honeypot website detecta spam", () => {
  const r = validate_contact_payload({ ...MINIMAL_VALID, website: "spam" });
  assert.equal(r.ok, false);
  if (!r.ok) assert.equal(r.error, "spam");
});

test("nombre vacío se rechaza", () => {
  const r = validate_contact_payload({ ...MINIMAL_VALID, nombre: "" });
  assert.equal(r.ok, false);
  if (!r.ok) assert.equal(r.error, "nombre_invalido");
});

test("nombre muy largo se rechaza", () => {
  const r = validate_contact_payload({
    ...MINIMAL_VALID,
    nombre: "A".repeat(121),
  });
  assert.equal(r.ok, false);
  if (!r.ok) assert.equal(r.error, "nombre_invalido");
});

test("correo inválido se rechaza", () => {
  const r = validate_contact_payload({ ...MINIMAL_VALID, correo: "sin-arroba" });
  assert.equal(r.ok, false);
  if (!r.ok) assert.equal(r.error, "correo_invalido");
});

test("correo sin dominio se rechaza", () => {
  const r = validate_contact_payload({ ...MINIMAL_VALID, correo: "usuario@" });
  assert.equal(r.ok, false);
  if (!r.ok) assert.equal(r.error, "correo_invalido");
});

test("teléfono chileno inválido se rechaza", () => {
  const r = validate_contact_payload({
    ...MINIMAL_VALID,
    telefono: "12345",
  });
  assert.equal(r.ok, false);
  if (!r.ok) assert.equal(r.error, "telefono_invalido");
});

test("teléfono chileno sin +56 se rechaza", () => {
  const r = validate_contact_payload({
    ...MINIMAL_VALID,
    telefono: "9 1234 5678",
  });
  assert.equal(r.ok, false);
  if (!r.ok) assert.equal(r.error, "telefono_invalido");
});

test("teléfono chileno válido pasa (móvil, con espacios)", () => {
  const r = validate_contact_payload({
    ...MINIMAL_VALID,
    telefono: "+56 9 8765 4321",
  });
  assert.equal(r.ok, true);
});

test("teléfono chileno válido pasa (móvil, sin espacios)", () => {
  const r = validate_contact_payload({
    ...MINIMAL_VALID,
    telefono: "+5698765432",
  });
  assert.equal(r.ok, true);
});

test("teléfono fijo Antofagasta válido pasa", () => {
  const r = validate_contact_payload({
    ...MINIMAL_VALID,
    telefono: "+56 55 2123456",
  });
  assert.equal(r.ok, true);
});

test("tipo_servicio inválido se rechaza", () => {
  const r = validate_contact_payload({
    ...MINIMAL_VALID,
    tipo_servicio: "inexistente",
  });
  assert.equal(r.ok, false);
  if (!r.ok) assert.equal(r.error, "tipo_invalido");
});

test("mensaje vacío se rechaza", () => {
  const r = validate_contact_payload({ ...MINIMAL_VALID, mensaje: "" });
  assert.equal(r.ok, false);
  if (!r.ok) assert.equal(r.error, "mensaje_invalido");
});

test("mensaje demasiado largo se rechaza", () => {
  const r = validate_contact_payload({
    ...MINIMAL_VALID,
    mensaje: "x".repeat(4001),
  });
  assert.equal(r.ok, false);
  if (!r.ok) assert.equal(r.error, "mensaje_invalido");
});

test("null body se rechaza", () => {
  const r = validate_contact_payload(null);
  assert.equal(r.ok, false);
  if (!r.ok) assert.equal(r.error, "payload_invalido");
});

test("body no objeto se rechaza", () => {
  const r = validate_contact_payload("una cadena");
  assert.equal(r.ok, false);
  if (!r.ok) assert.equal(r.error, "payload_invalido");
});

test("todos los servicios permitidos pasan", () => {
  for (const tipo of ["equipos", "reparacion", "accesorios", "otro"]) {
    const r = validate_contact_payload({ ...MINIMAL_VALID, tipo_servicio: tipo });
    assert.equal(r.ok, true, `tipo_servicio "${tipo}" debería pasar`);
  }
});
