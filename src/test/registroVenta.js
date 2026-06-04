function registroVenta(venta, detalles = []) {
  const { id_cliente, total_venta, total } = venta;
  const totalFinal = total_venta ?? total;

  const idCliente = Number(id_cliente);
  if (isNaN(idCliente) || idCliente < 1) {
    return {
      valido: false,
      mensaje: "El ID del cliente debe ser mayor o igual a 1.",
    };
  }

  for (const detalle of detalles) {
    const cantidad = Number(detalle.cantidad);
    if (!Number.isInteger(cantidad)) {
      return {
        valido: false,
        mensaje: "La cantidad debe ser un número entero.",
      };
    }
  }

  const totalNum = Number(totalFinal);
  if (isNaN(totalNum) || totalNum < 1) {
    return {
      valido: false,
      mensaje: "El total debe ser mayor o igual a 1.",
    };
  }

  return { valido: true };
}

module.exports = registroVenta;
