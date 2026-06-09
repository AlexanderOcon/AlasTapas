const actualizarCliente = require("./actualizarCliente");

const clienteBase = {
  nombre_cliente: "Carlos",
  apellido_cliente: "González",
  telefono_cliente: "88887777",
  correo_cliente: "carlos@ejemplo.com",
};

console.log("Prueba 1: Teléfono debe tener exactamente 8 dígitos");
it("Rechaza teléfono con menos de 8 dígitos", () => {
  const resultado = actualizarCliente({
    ...clienteBase,
    telefono_cliente: "1234567",
  });
  expect(resultado.valido).toBe(false);
  expect(resultado.mensaje).toContain("teléfono");
});

console.log("Prueba 2: Teléfono con más de 8 dígitos");
it("Rechaza teléfono con más de 8 dígitos", () => {
  const resultado = actualizarCliente({
    ...clienteBase,
    telefono_cliente: "123456789",
  });
  expect(resultado.valido).toBe(false);
  expect(resultado.mensaje).toContain("teléfono");
});

console.log("Prueba 3: Teléfono válido con 8 dígitos");
it("Acepta teléfono con 8 dígitos", () => {
  const resultado = actualizarCliente({
    ...clienteBase,
    telefono_cliente: "88887777",
  });
  expect(resultado.valido).toBe(true);
});

console.log("Prueba 4: Correo no válido");
it("Rechaza correo sin formato válido", () => {
  const resultado = actualizarCliente({
    ...clienteBase,
    correo_cliente: "correo-invalido",
  });
  expect(resultado.valido).toBe(false);
  expect(resultado.mensaje).toContain("correo");
});

console.log("Prueba 5: Correo sin dominio");
it("Rechaza correo sin dominio", () => {
  const resultado = actualizarCliente({
    ...clienteBase,
    correo_cliente: "usuario@",
  });
  expect(resultado.valido).toBe(false);
  expect(resultado.mensaje).toContain("correo");
});

console.log("Prueba 6: Correo válido");
it("Acepta correo con formato válido", () => {
  const resultado = actualizarCliente({
    ...clienteBase,
    correo_cliente: "carlos@ejemplo.com",
  });
  expect(resultado.valido).toBe(true);
});

console.log("Prueba 7: Correo con extensión diferente");
it("Acepta correo con diferentes extensiones", () => {
  const resultado = actualizarCliente({
    ...clienteBase,
    correo_cliente: "usuario@dominio.co",
  });
  expect(resultado.valido).toBe(true);
});
