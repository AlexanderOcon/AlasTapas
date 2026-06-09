function cancelarOrden(orden) {
  const estado = orden.estado_orden;

  // Convertir a booleano si es string
  const estadoBooleano = estado === true || estado === "true";

  // Solo se puede cancelar si está "En Cocina" (estado === false)
  if (estadoBooleano) {
    return {
      valido: false,
      mensaje: "No se puede cancelar una orden que ya está Lista.",
    };
  }

  return { valido: true };
}

module.exports = cancelarOrden;
