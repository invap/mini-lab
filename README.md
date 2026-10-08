# Mini Lab

Plataforma web de recursos y actividades para introducirse al desarrollo de
sistemas embebidos con Rust utilizando el kit Mini Lab.

El proyecto busca acompañar al usuario desde la preparación del entorno de
desarrollo hasta la ejecución de firmware y la realización de actividades
guiadas de dificultad progresiva.

## Hardware de referencia

Mini Lab toma como placa de referencia la **Raspberry Pi Pico 2**, basada en el
microcontrolador **RP2350**.

El recorrido inicial utiliza:

- Raspberry Pi Pico 2 como hardware de referencia.
- RP2350.
- Arquitectura ARM Cortex-M33.
- Rust como lenguaje de programación.
- Target `thumbv8m.main-none-eabihf`.

El RP2350 también permite trabajar con RISC-V, pero actualmente Mini Lab utiliza
ARM como recorrido inicial.

## Primeros pasos

La sección **Primeros pasos** guía al usuario durante la preparación del entorno
y la ejecución de su primer firmware.

El recorrido está dividido en seis etapas:

1. Preparar el entorno.
2. Instalar la toolchain de Rust.
3. Configurar Linux.
4. Verificar el entorno.
5. Crear y compilar el primer firmware.
6. Ejecutar y probar el firmware.

Actualmente el recorrido está orientado a **Linux**.


## Proyecto de firmware

Para crear el primer proyecto se utiliza
[`rp235x-project-template`](https://github.com/rp-rs/rp235x-project-template),
el template oficial de rp-rs para proyectos basados en RP2350.

El proyecto se genera mediante:

```bash
cargo generate --git https://github.com/rp-rs/rp235x-project-template
```

Durante la generación se selecciona `none` como método de flashing, ya que el
alcance actual de Primeros pasos está orientado a la ejecución mediante
simulador y no sobre hardware físico.

El firmware se compila con:

```bash
cargo build --release
```

Cargo genera un ejecutable ELF para ARM en:

```text
target/thumbv8m.main-none-eabihf/release/<nombre-del-proyecto>
```

## Simulación con Velxio

Actualmente Mini Lab utiliza
[Velxio](https://velxio.dev/) como entorno de simulación para ejecutar y probar
el firmware sin necesidad de contar con la placa física.

El flujo validado es:

```text
Rust
  ↓
Cargo
  ↓
ELF ARM
  ↓
Velxio
  ↓
RP2350 virtual
  ├── GPIO → LED
  └── UART → Serial Monitor
```

Velxio permite cargar directamente el ejecutable ELF generado por Cargo mediante
la opción **Upload Firmware**, sin necesidad de convertirlo previamente a BIN o
UF2.

### Placa utilizada en el simulador

Velxio no dispone actualmente de la misma Raspberry Pi Pico 2 utilizada como
referencia por Mini Lab.

Para el recorrido actual se utiliza una **Pimoroni Pico Plus 2 W**, también
basada en la familia RP2350.

Debido a las diferencias de hardware y pinout entre ambas placas, el ejemplo
inicial se adapta de la siguiente manera:

- GPIO15 para controlar un LED virtual.
- UART0 para salida serial.
- GPIO2 como TX.
- GPIO3 como RX.
- Comunicación serial a 115200 baudios.

Se validó correctamente tanto el parpadeo del LED como la salida mediante el
Serial Monitor de Velxio.

## Hardware físico

La ejecución sobre la Raspberry Pi Pico 2 física no forma parte del alcance
actual de Primeros pasos.

Cuando el hardware esté disponible se realizará una nueva validación del
recorrido y se incorporarán los cambios necesarios.

Herramientas y procedimientos asociados al hardware físico, como `picotool`,
UF2 y BOOTSEL, quedan fuera del flujo actual y podrán incorporarse posteriormente.

## Ejecutar el sitio localmente

Para navegar el sitio localmente, ejecutá desde la raíz del proyecto:

```bash
python -m http.server 8000
```

Luego abrí:

```text
http://localhost:8000
```

La página **Conocé tu kit** necesita ejecutarse mediante HTTP para cargar
`data/componentes.json`.

## Estado actual

Actualmente se encuentra validado el siguiente recorrido:

```text
Linux
→ Rust / Cargo
→ RP2350 ARM
→ rp235x-project-template
→ adaptación GPIO + UART
→ cargo build --release
→ ELF
→ Velxio
→ LED + Serial Monitor
```

El siguiente paso será continuar ampliando las actividades y, cuando se disponga
del hardware físico, validar el mismo recorrido sobre la Raspberry Pi Pico 2.