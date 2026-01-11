require("dotenv").config();

const app = require("./app");
const { startScheduler } = require("./jobs/scheduler");

const port = 3001;
app.listen(port, () => {
  console.log(`Servidor iniciado en http://localhost:${port}`);
});

startScheduler();

// NOTAS
// Ultima actrualización:
// El programa falla ya que está intentando insertar categorías de productos que no exiten en la tabla de categorías de la base de datos
// Debido al nuevo cambio de wallapop, han restructurado todo el sistrema de categorías y han añadido un montón
// Por lo que han cambiado muchas de las categorías, por ejemplo, la categoría 16000 de móviles ya no existe
// He investigado y es mala práctica añadir unb producto que tenga una categoría indefinida
//
//
// Respuesta de chatgpt:
//
// Para manejar cambios en las categorías de un servicio externo sin que afecten negativamente a tu aplicación local, puedes considerar las siguientes estrategias:

// Mapeo dinámico de categorías: En lugar de almacenar directamente las IDs de categoría en tu base de datos, podrías crear una tabla de mapeo donde vincules las categorías locales con las categorías del servicio externo. Así, cuando se produzcan cambios en las categorías del servicio externo, solo necesitarás actualizar el mapeo en tu base de datos local sin afectar otras partes de tu aplicación.
// Actualizaciones automáticas: Implementa un proceso de actualización automática que consulte periódicamente el servicio externo para obtener las últimas categorías y actualice tu base de datos local en consecuencia. Esto garantizará que siempre estés sincronizado con los cambios en las categorías del servicio externo.
// Gestión de errores y fallbacks: Si una categoría del servicio externo ya no existe, puedes manejar este escenario definiendo una categoría predeterminada o asignando una categoría alternativa en tu aplicación local. Esto garantiza que tus usuarios no se vean afectados negativamente por cambios repentinos en las categorías del servicio externo.
// Registro de cambios: Mantén un registro de los cambios en las categorías del servicio externo para poder rastrear y gestionar cualquier actualización en tu aplicación local de manera eficiente.
// Al implementar estas estrategias, podrás adaptarte de manera flexible a los cambios en las categorías del servicio externo sin comprometer la integridad de tu base de datos local ni la experiencia del usuario en tu aplicación.
