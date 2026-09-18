# mini-lab
Pack de recursos para el desarrollo de embebidos usando el kit mini-lab

Para navegar el sitio localmente, ejecutá `python -m http.server 8000` desde la
raíz del proyecto y abrí `http://localhost:8000`. La página del kit necesita HTTP
para cargar `data/componentes.json`.

Las comprobaciones de regresión se ejecutan con `python tests/run_checks.py`.
Requieren Python 3.10 o posterior y Chrome, Chromium o Edge instalados; no
necesitan paquetes adicionales. Podés indicar el navegador con
`--browser "ruta/al/navegador"` o comprobar solamente archivos y enlaces locales
con `--links-only`.

El runner abre un servidor local temporal y el navegador sin ventana, con un
perfil descartable. Comprueba las seis páginas a 320, 375, 1024 y 1280 píxeles,
enlaces y referencias ARIA, navegación por teclado, cambios de tamaño, las siete
tarjetas y sus diálogos, el tema cuando el almacenamiento está bloqueado y la
recuperación ante errores de carga del catálogo. También monta el sitio en un
subdirectorio para detectar enlaces que fallarían al publicarlo de esa forma.
