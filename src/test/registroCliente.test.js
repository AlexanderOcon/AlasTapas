const registroCliente = require("./registroCliente");

const clienteBase = {
  nombre_cliente: "Juan",
  apellido_cliente: "Pérez",
  telefono_cliente: "88887777",
  correo_cliente: "juan@ejemplo.com",
};

console.log("Prueba 1: Rechaza teléfono inválido");
it("Rechaza teléfono con menos de 8 dígitos", () => {
  const resultado = registroCliente({
    ...clienteBase,
    telefono_cliente: "1234567",
  });
  expect(resultado.valido).toBe(false);
  expect(resultado.mensaje).toContain("teléfono");
});

console.log("Prueba 2: Acepta cliente válido");
it("Acepta cliente con datos válidos", () => {
  const resultado = registroCliente(clienteBase);
  expect(resultado.valido).toBe(true);
});
