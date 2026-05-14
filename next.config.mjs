/** @type {import('next').NextConfig} */
const next_config = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },

  /**
   * Cabeceras de seguridad HTTP (sin CSP global aquí).
   * Next.js inyecta scripts inline de hidratación/RSC (`$RC`, `$RB`, etc. en el HTML).
   * Una CSP mal calibrada (p. ej. con `strict-dynamic` o `upgrade-insecure-requests`
   * sobre `http://localhost`) bloquea esos scripts y la app parece “rota”.
   * Para CSP en producción, usar proxy con nonces (guía oficial de Next) o CDN.
   * @returns {Promise<Array<{ source: string; headers: Array<{ key: string; value: string }> }>>}
   */
  async headers() {
    const headers_list = [
      { key: "X-Frame-Options", value: "DENY" },
      { key: "X-Content-Type-Options", value: "nosniff" },
      {
        key: "Referrer-Policy",
        value: "strict-origin-when-cross-origin",
      },
      {
        key: "Permissions-Policy",
        value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
      },
    ];

    if (process.env.NODE_ENV === "production" && process.env.ENABLE_HSTS === "true") {
      headers_list.push({
        key: "Strict-Transport-Security",
        value: "max-age=63072000; includeSubDomains; preload",
      });
    }

    return [{ source: "/(.*)", headers: headers_list }];
  },
};

export default next_config;
