function registroOrden(orden, detalles = []) {
  const { fecha_orden } = orden;

  if (!fecha_orden || String(fecha_orden).trim() === "") {
    return { valido: false, mensaje: "La fecha de la orden es requerida." };
  }

  const fecha = new Date(fecha_orden);
  if (isNaN(fecha.getTime())) {
    return { valido: false, mensaje: "La fecha de la orden no es válida." };
  }

  for (const detalle of detalles) {
    const cantidad = Number(detalle.cantidad);
    if (isNaN(cantidad) || cantidad <= 0) {
      return {
        valido: false,
        mensaje: "La cantidad debe ser un número mayor a cero.",
      };
    }
  }

  return { valido: true };
}

module.exports = registroOrden;
