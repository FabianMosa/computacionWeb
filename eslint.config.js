/**
 * ESLint flat config — ESLint 9+ (migrado desde .eslintrc.json legacy).
 * eslint-config-next@16 exporta directamente un array de config flat.
 *
 * @type {import("eslint").Linter.Config[]}
 */
import nextConfig from "eslint-config-next";

export default [
  { ignores: [".next/**", "node_modules/**"] },
  ...nextConfig,
  {
    rules: {
      // Silenciar PropTypes — proyecto JS sin PropTypes
      "react/prop-types": "off",
    },
  },
];
