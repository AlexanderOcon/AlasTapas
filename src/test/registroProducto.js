function registroProducto(producto) {
  const { precio_venta, stock } = producto;
    
  if (isNaN(precio_venta) || Number(precio_venta) < 0) {
    return { valido: false, mensaje: "El precio debe ser un número positivo." };
  }

  if (isNaN(stock) || Number(stock) < 0) {
    return { valido: false, mensaje: "El stock debe ser un número positivo." };
  }

  return { valido: true };
}

module.exports = registroProducto;