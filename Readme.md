# 🦸 Superhero Hub • Dashboard con Modo Noche / Día y Rollout Ágil

> **Actividad del Diplomado**: Implementación de Modo Noche/Día (Dark/Light Mode) en un Dashboard de Superhéroes consumiendo la API oficial de **[Superhero API](https://www.superheroapi.com/)** sin necesidad de backend propio y aplicando la metodología ágil de división de historias (Scrum y Feature Flags).

---

## 📋 1. Análisis de la Historia de Usuario

### ❌ Historia Grande (Rechazada / Anti-patrón)
> *"Como usuario, quiero poder cambiar entre modo claro y oscuro en toda la aplicación, y que se recuerde mi preferencia."*

**¿Por qué se rechaza en Scrum y Entrega Continua?**
1. **Incumple el principio INVEST**: Es una historia gigante que intenta resolver diseño de tokens, lógica de conmutación, componentes visuales, persistencia y despliegue a producción en un solo paso.
2. **Alto riesgo de regresión**: Modificar todos los estilos globales de golpe sin validación previa puede generar problemas de contraste y legibilidad en producción.
3. **Imposibilita el despliegue progresivo**: Impide evaluar la adopción con un grupo controlado (Canary) y monitorear rendimiento.
4. **Pull Request monolítico**: Difícil de revisar y con alta probabilidad de conflictos de integración.

---

### ✅ División Correcta en 3 Tickets Incrementales

| Ticket | Alcance / Objetivo | Feature Flag | Visibilidad del Switch | Persistencia |
| :--- | :--- | :--- | :--- | :--- |
| **Ticket 1** | Definir variables CSS/tema noche y lógica de cambio en el HTML raíz. | `dark_mode_enabled: OFF` (0%) | 🚫 **Oculto para todos** | ❌ Deshabilitada |
| **Ticket 2** | Agregar el switch toggle visible solo al 10% de usuarios. | `Rollout Canary 10%` | ✨ **Visible solo al 10%** | ❌ **Sin persistencia todavía** |
| **Ticket 3** | Guardar la preferencia y subir el flag al 100%. | `Rollout GA 100%` | ✅ **Visible para todos** | 💾 **Habilitada (`localStorage`)** |

---

## ☀️/🌙 2. Corrección del Modo Noche y Día

Se implementó una solución robusta y visualmente intuitiva:
1. **Switch Prominente de Modo Día y Noche**:
   - Componente visual interactivo con icono dinámico (☀️ / 🌙), riel deslizante y etiqueta de texto clara (`Modo Día` / `Modo Noche`).
2. **Paleta de Colores de Alto Contraste**:
   - **Modo Día**: Superficies blancas (`#ffffff`), fondos slate (`#f1f5f9`), tipografía oscura (`#0f172a`), y detalles nítidos.
   - **Modo Noche**: Fondo cinematográfico profundo (`#080c14` y `#0f172a`), bordes sutiles y acentos con brillo neón estilo cómic.
3. **Persistencia Instantánea (Ticket 3 por Defecto)**:
   - Al cargar la aplicación, se inicia en **Ticket 3**, permitiendo que cualquier usuario cambie entre Día y Noche y su preferencia se **guarde automáticamente en `localStorage`** y se mantenga al recargar la página (`F5`).
   - El evaluador puede hacer clic en **Ticket 1** (para verificar que el switch se oculta) o en **Ticket 2** (para probar la visibilidad al 10% sin persistencia).

---

## 🌐 3. Integración con Superhero API (https://www.superheroapi.com/)

Para no requerir el desarrollo de un servidor backend, la aplicación consume la API de superhéroes:
- 🔗 **Sitio y Documentación oficial**: [https://www.superheroapi.com/](https://www.superheroapi.com/)
- **Endpoints soportados**:
  - `https://superheroapi.com/api.php/{access-token}/{id}`
  - `https://superheroapi.com/api.php/{access-token}/search/{name}`
- **Características integradas**:
  - **Catálogo de Superhéroes**: Spider-Man, Iron Man, Thor, Wolverine, Hulk, Captain America, Batman, Superman, Wonder Woman, Deadpool, Thanos, Joker y más.
  - **Filtros por Editorial y Alineación**: Marvel Comics, DC Comics, Héroes (Good) y Villanos (Bad).
  - **Barras de Powerstats**: Inteligencia, Fuerza, Velocidad, Durabilidad, Poder y Combate.
  - **Ficha Técnica Modal**: Biografía completa, lugar de nacimiento, ocupación, base y apariencia física.
  - **Consola Superhero API Explorer**: Herramienta interactiva para consultar la API en vivo, con soporte para token de acceso personal o modo sandbox de alta velocidad.

---

## 🚀 4. Comandos de Ejecución

1. **Instalar dependencias**:
   ```bash
   npm install
   ```

2. **Iniciar servidor local**:
   ```bash
   npm run dev
   ```
   Abre tu navegador en: [http://localhost:5173/](http://localhost:5173/)

3. **Análisis Estático y Linting**:
   ```bash
   npm run lint
   ```
   *Verifica sintaxis ES Modules y buenas prácticas sin advertencias.*

4. **Ejecutar pruebas automatizadas**:
   ```bash
   npm test
   ```
   *Ejecuta 30 pruebas automatizadas (Tickets Ágiles, ConfigCat, Superhero API y Contrato de Salud) con fail-fast estricto.*

5. **Compilar para producción**:
   ```bash
   npm run build
   ```

6. **Iniciar servidor de producción con Health Check**:
   ```bash
   npm start
   ```
   Abre en [http://localhost:10000/](http://localhost:10000/) y monitorea en [http://localhost:10000/healthz](http://localhost:10000/healthz)

---

## 🐱 5. Feature Flags con ConfigCat y Trunk-Based Development

- **SDK Oficial**: `@configcat/sdk`
- **Flag Principal**: `superhero_battle_arena`
- **Funcionalidad Protegida**: ⚔️ **Arena de Batalla de Superhéroes (Simulador 1v1)**
  - **Toggle OFF**: La funcionalidad permanece oculta y protegida en producción.
  - **Toggle ON**: Se desbloquea instantáneamente el combate interactivo 1v1 con cálculo de Powerstats.
  - **Conmutación en Vivo**: Puedes probar el toggle haciendo clic en el botón `🐱 ConfigCat` de la barra superior.

---

## ☁️ 6. CI/CD y Auto-Deploy a Render

- **GitHub Actions**: Pipeline automatizado en `.github/workflows/ci.yml`.
  - Etapa 1: Lint, Tests con fail-fast y Build.
  - Etapa 2: Docker Build multi-stage publicado en GitHub Container Registry (`ghcr.io`).
  - Etapa 3: Auto-deploy a Render mediante Blueprint `render.yaml` y Webhook.
- **Health Check**: Endpoint `/healthz` con respuesta HTTP 200 OK y métricas de uptime.
- **Engineering Playbook**: Consulta [`PLAYBOOK.md`](file:///d:/ITP/Diplomado/Practica_Sabado/PLAYBOOK.md) para la definición del DoD definitivo (Técnico + Negocio + Despliegue).

