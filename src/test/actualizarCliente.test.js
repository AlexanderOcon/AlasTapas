const actualizarCliente = require("./actualizarCliente");
const clienteBase = {
  nombre_cliente: "Carlos",
  apellido_cliente: "González",
  telefono_cliente: "88887777",
  correo_cliente: "carlos@ejemplo.com",
};
console.log("Prueba 1: Teléfono debe tener 8 dígitos");
it("Rechaza teléfono con menos de 8 dígitos", () => {
  const resultado = actualizarCliente({
    ...clienteBase,
    telefono_cliente: "1234567",
  });
  expect(resultado.valido).toBe(false);
  expect(resultado.mensaje).toContain("teléfono");
});
console.log("Prueba 2: Correo no válido");
it("Rechaza correo sin formato válido", () => {
  const resultado = actualizarCliente({
    ...clienteBase,
    correo_cliente: "correo-invalido",
  });
  expect(resultado.valido).toBe(false);
  expect(resultado.mensaje).toContain("correo");
});

