# TCG React Game

Un juego de cartas estratégico basado en React inspirado en Pokémon TCG. Este proyecto está diseñado para ofrecer un sistema divertido y expansible con características únicas.

## Instalación

Clonar repositorio:

```bash
git clone <URL-del-repositorio>
```

Instalar dependencias:

```bash
npm install
```

Iniciar el servidor de desarrollo:

```bash
npm start
```

## Especificaciones Técnicas

### 1. Interfaz React

- Utiliza React como framework principal.
- Incluye componentes reutilizables y diseño modular para facilitar expansiones futuras.

### 2. Tablero de Juego

- Sistema de tipos de cartas con 5 categorías principales: Fuego, Agua, Tierra, Eléctrico y Oscuro.
- Interacciones basadas en ventajas y desventajas (por ejemplo, un tipo fuerte genera +10 de daño contra un tipo débil).
- Áreas definidas para mazos, manos, campo de batalla y pila de descarte.

### 3. Sistema de Cartas

#### Cartas de Monstruos

- Puntos de vida entre 30 y 200.
- Requieren entre 1 y 4 energías para atacar.
- Algunos ataques especiales pueden reducir las energías del oponente.
- Incluyen efectos únicos, como infligir daño adicional si el monstruo enemigo tiene muchas energías.

#### Cartas Especiales

- Dos tipos principales:
    - De un solo uso por turno.
    - Reutilizables durante el mismo turno.
- Habilidades como curación, aumento de daño temporal o recuperación de energías.

### 4. Energía y Turnos

- Cada turno inicia con una recarga de energía.
- Los ataques y habilidades especiales consumen energías.
- La estrategia gira en torno al manejo eficiente de los recursos energéticos.

### 5. Mecanismos del Juego

#### Modo de Juego

- Selector para jugar en modo 2 jugadores (en la misma pantalla).
- El modo contra la CPU está planificado para una versión futura.
- Los mazos están definidos en un archivo JSON detallado.

## Estructura de Datos de las Cartas

Las cartas están organizadas en un archivo JSON, lo que facilita la edición y la adición de contenido. La estructura incluye:

- Tipos de Cartas: Fuego, Agua, Tierra, Eléctrico, Oscuro.

### Cartas de Monstruos

- Nombre, tipo, puntos de vida, ataques, efectos especiales.
- Ejemplo de ataque: "Hace +10 de daño si el oponente tiene más de 5 energías".

### Cartas Especiales

- Nombre, descripción, tipo (de un solo uso o reutilizable).
- Ejemplo de efecto: "Cura 30 puntos de vida a un monstruo aliado".

### Ejemplo de estructura JSON

```json
{
    "types": ["Fuego", "Agua", "Tierra", "Eléctrico", "Oscuro"],
    "cards": [
        {
            "name": "Dragón Ígneo",
            "type": "Fuego",
            "hp": 150,
            "attacks": [
                {
                    "name": "Llama Infernal",
                    "damage": 50,
                    "energy_required": 3
                },
                {
                    "name": "Explosión de Calor",
                    "damage": 70,
                    "energy_required": 4,
                    "effect": "El jugador pierde 1 energía después del ataque."
                }
            ],
            "special_effects": [
                "Hace +10 de daño si el oponente tiene más de 5 energías."
            ]
        },
        {
            "name": "Elixir Curativo",
            "type": "Especial",
            "usage": "Reutilizable",
            "effect": "Cura 30 puntos de vida a un monstruo aliado."
        }
    ]
}
```

## Características del Juego

### Modo de Juego

- 2 jugadores: Ambos jugadores comparten la pantalla.
- Modo contra la CPU planificado para versiones futuras.

### Estrategia Basada en la Tabla de Tipos

- Las interacciones entre tipos generan ventajas y desventajas.
- Ejemplo: Un atacante de tipo "Fuego" inflige +10 de daño contra un tipo "Tierra".

### Ataques y Efectos

- Daños y costos de energía variables.
- Algunos efectos infligen penalizaciones al rival (pérdida de energías).

### Imágenes de Cartas

- Imágenes genéricas obtenidas de la web.
- Personalizables en futuras actualizaciones.

### Diseño Modular

- Fácilmente extensible para nuevos tipos de cartas, habilidades y mecánicas.

## Planificación Futura

- Implementar el modo de juego contra la CPU.
- Ampliar el sistema de animaciones para las interacciones.
- Crear un editor visual para personalizar mazos.
- Agregar más cartas, tipos y habilidades al archivo JSON.

## Estructura del Proyecto

### Componentes principales

- Ubicados en `/src/components`.
- Incluyen los elementos de la UI, como cartas, tablero y barra de energía.

### Lógica del juego

- Dentro de `/src/utils`, con funciones clave como cálculos de daño y manejo de turnos.

### Datos de cartas

- Almacenados en `/src/data/cards.json` para facilitar la edición.

Con este juego, buscamos un balance entre estrategia, diversión y rejugabilidad, mientras dejamos una base sólida para futuras expansiones. ¡Esperamos que lo disfrutes! 😊
