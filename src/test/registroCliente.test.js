const registroCliente = require("./registroCliente");

const clienteBase = {
  nombre_cliente: "Juan",
  apellido_cliente: "Pérez",
  telefono_cliente: "88887777",
  correo_cliente: "juan@ejemplo.com",
};

console.log("Prueba 1: Teléfono debe tener 8 dígitos");
it("Rechaza teléfono con menos de 8 dígitos", () => {
  const resultado = registroCliente({
    ...clienteBase,
    telefono_cliente: "1234567",
  });
  expect(resultado.valido).toBe(false);
  expect(resultado.mensaje).toContain("teléfono");
});

console.log("Prueba 2: Teléfono con más de 8 dígitos");
it("Rechaza teléfono con más de 8 dígitos", () => {
  const resultado = registroCliente({
    ...clienteBase,
    telefono_cliente: "123456789",
  });
  expect(resultado.valido).toBe(false);
  expect(resultado.mensaje).toContain("teléfono");
});


console.log("Prueba 4: Correo no válido");
it("Rechaza correo sin formato válido", () => {
  const resultado = registroCliente({
    ...clienteBase,
    correo_cliente: "correo-invalido",
  });
  expect(resultado.valido).toBe(false);
  expect(resultado.mensaje).toContain("correo");
});

console.log("Prueba 5: Correo sin dominio");
it("Rechaza correo sin dominio", () => {
  const resultado = registroCliente({
    ...clienteBase,
    correo_cliente: "usuario@",
  });
  expect(resultado.valido).toBe(false);
  expect(resultado.mensaje).toContain("correo");
});

console.log("Prueba 6: Registra cliente correctamente");
it("Acepta cliente con teléfono y correo válidos", () => {
  const resultado = registroCliente(clienteBase);
  expect(resultado.valido).toBe(true);
});
