# Tulipanes para Nancy 🌷

Experiencia web romántica, móvil y animada. Es una página estática sin proceso de compilación ni dependencias externas, lista para GitHub Pages.

## Estructura

- `index.html`: escenario y SVG articulado del personaje.
- `css/styles.css`: dirección artística, responsive, animación ambiental y estados.
- `js/animation.js`: timeline central, entrega, carta, final y reinicio.
- `js/main.js`: creación del campo, partículas, interacción y arranque.
- `assets/`: lugares claramente separados para reemplazar personaje, flores, fondos y UI.

## Ejecutar localmente

Desde la raíz:

```bash
python3 -m http.server 8000
```

Visita `http://localhost:8000`. También se puede abrir `index.html` directamente, aunque un servidor local reproduce mejor las condiciones de publicación.

## Publicar en GitHub Pages

1. Sube el repositorio a GitHub.
2. Abre **Settings → Pages**.
3. En **Build and deployment**, selecciona **Deploy from a branch**.
4. Elige la rama principal y la carpeta `/ (root)`.
5. Guarda. No se requiere ninguna acción de build.

## Reemplazar arte

El personaje es SVG inline para animar sus piezas. Reemplaza los grupos dentro de `.bob` sin cambiar las clases `body`, `arm`, `leg` y `bouquet`. El tulipán reutilizable está en `assets/flowers/tulip.svg`; los README de cada carpeta explican el destino de futuros assets.

La experiencia incluye una alternativa `prefers-reduced-motion`: conserva toda la historia y acorta o elimina movimientos repetitivos.
