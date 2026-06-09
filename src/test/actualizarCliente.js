function actualizarCliente(cliente) {
  const telefono = String(
    cliente.telefono_cliente ?? cliente.telefono ?? "",
  ).trim();
  const correo = String(
    cliente.correo_cliente ?? cliente.correo ?? "",
  ).trim();

  if (!/^\d{8}$/.test(telefono)) {
    return {
      valido: false,
      mensaje: "El teléfono debe tener exactamente 8 dígitos.",
    };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(correo)) {
    return {
      valido: false,
      mensaje: "El correo electrónico no es válido.",
    };
  }

  return { valido: true };
}

module.exports = actualizarCliente;
