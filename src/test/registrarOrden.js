function registrarOrden(orden, detalles) {
  const { id_cliente, fecha_orden } = orden;

  if (!id_cliente) {
    return { valido: false, mensaje: "Debe seleccionar un cliente." };
  }

  if (!fecha_orden || fecha_orden.trim() === "") {
    return { valido: false, mensaje: "Debe indicar la fecha de la orden." };
  }

  if (isNaN(Date.parse(fecha_orden))) {
    return { valido: false, mensaje: "La fecha de la orden no es válida." };
  }

  if (!detalles || detalles.length === 0) {
    return {valido: false,mensaje: "La orden debe tener al menos un producto.",};
  }

  for (const detalle of detalles) {
    const idProducto = detalle.id_producto ?? detalle.nombre_producto;
    if (!idProducto) {
      return {valido: false,mensaje: "Cada detalle debe tener un producto.",};
    }
    if (isNaN(detalle.cantidad) || Number(detalle.cantidad) <= 0) {
      return {valido: false,mensaje: "La cantidad debe ser un número mayor a cero.",};
    }
  }

  return { valido: true };
}

module.exports = registrarOrden;
