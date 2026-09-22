# Novu | Tienda de zapatillas de segunda mano

Tienda de zapatillas hecha con Next.js 16, React 19, TypeScript, Tailwind CSS v4 y Zustand.

Proyecto 2ASIR con Victor.

## Requisitos

- Node.js 20 o superior (`node -v` para comprobarlo). Descarga: https://nodejs.org
- npm (viene incluido con Node.js)
- Conexión a internet la primera vez, para instalar dependencias y cargar las fotos de las zapatillas (están alojadas en Unsplash).

## Cómo ejecutarlo en local

```bash
git clone https://github.com/Jldomingo17/tienda_zapas.git
cd tienda_zapas
npm install
npm run dev
```

Abre http://localhost:3000 en el navegador.

## Comandos disponibles

| Comando | Qué hace |
| --- | --- |
| `npm run dev` | Servidor de desarrollo en http://localhost:3000 |
| `npm run build` | Compila la versión de producción |
| `npm run start` | Sirve la versión ya compilada |
| `npm run lint` | Pasa ESLint |

## Estructura

```
src/
├── app/
│   ├── page.tsx           # Catálogo de zapatillas
│   ├── checkout/page.tsx  # Página de pago
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── Navbar.tsx         # Barra superior y carrito
│   └── SneakerCard.tsx    # Tarjeta de producto
├── data/sneakers.ts       # Catálogo (datos de ejemplo)
└── store/cartStore.ts     # Estado del carrito (Zustand)
```

## Problemas frecuentes

- **`npm install` falla**: comprueba que tienes Node 20+ con `node -v`. Con versiones anteriores Next.js 16 no funciona.
- **El puerto 3000 está ocupado**: arranca con `npm run dev -- -p 3001`.
- **No se ven las fotos de las zapatillas**: son enlaces externos a Unsplash, necesitas internet para que carguen.
