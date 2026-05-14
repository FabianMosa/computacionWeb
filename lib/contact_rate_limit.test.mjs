/**
 * Tests para rate limiter del formulario de contacto.
 * Ejecutar: `node --test lib/contact_rate_limit.test.mjs`
 */

import { test, after } from "node:test";
import assert from "node:assert/strict";
import { is_rate_limited } from "./contact_rate_limit.js";

const TEST_KEY = "test-client-127.0.0.1";

after(() => {
  // Consumir todas las entradas del test para no contaminar otros tests
  for (let i = 0; i < 10; i++) {
    is_rate_limited(TEST_KEY);
  }
});

test("primeras solicitudes no están rate-limited", () => {
  // El bucket podría tener datos residuales de otros tests,
  // así que usamos una clave única.
  const fresh_key = `fresh-${Date.now()}`;
  for (let i = 0; i < 8; i++) {
    assert.equal(is_rate_limited(fresh_key), false, `intento ${i + 1} debería pasar`);
  }
});

test("solicitud que excede el límite es rate-limited", () => {
  const burst_key = `burst-${Date.now()}`;
  // Llenar 8 slots
  for (let i = 0; i < 8; i++) {
    is_rate_limited(burst_key);
  }
  // La número 9 debería estar limitada
  assert.equal(is_rate_limited(burst_key), true);
});

test("claves diferentes tienen buckets separados", () => {
  const key_a = `sep-a-${Date.now()}`;
  const key_b = `sep-b-${Date.now()}`;

  // Llenar key_a
  for (let i = 0; i < 8; i++) {
    is_rate_limited(key_a);
  }
  assert.equal(is_rate_limited(key_a), true, "key_a debería estar limitada");

  // key_b debería seguir libre
  assert.equal(is_rate_limited(key_b), false, "key_b NO debería estar limitada");
});
