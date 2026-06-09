function cancelarVenta(venta) {
  const estado = String(venta.estado_venta ?? "").trim().toLowerCase();

  // Si ya está cancelada, no se puede hacer nada
  if (estado === "cancelada" || venta.estado_venta === false) {
    return {
      valido: false,
      mensaje: "No se puede cancelar una venta que ya está Cancelada.",
    };
  }

  // Solo se puede cancelar si está pendiente
  if (estado !== "pendiente" && venta.estado_venta !== true) {
    return {
      valido: false,
      mensaje: "La venta debe estar en estado Pendiente para poder cancelarla.",
    };
  }

  return { valido: true };
}

module.exports = cancelarVenta;
