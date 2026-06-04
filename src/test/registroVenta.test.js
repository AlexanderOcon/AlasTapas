const registroVenta = require("./registroVenta");

const ventaBase = {
  id_cliente: 1,
  total_venta: 50,
};

const detalleValido = {
  id_producto: 10,
  cantidad: 2,
};

console.log("Prueba 1: ID cliente debe ser mayor o igual a 1");
it("Rechaza ID de cliente menor a 1", () => {
  const resultado = registroVenta(
    { id_cliente: 0, total_venta: 50 },
    [detalleValido],
  );
  expect(resultado.valido).toBe(false);
  expect(resultado.mensaje).toContain("cliente");
});

console.log("Prueba 2: ID cliente inválido");
it("Rechaza ID de cliente no numérico", () => {
  const resultado = registroVenta(
    { id_cliente: "abc", total_venta: 50 },
    [detalleValido],
  );
  expect(resultado.valido).toBe(false);
  expect(resultado.mensaje).toContain("cliente");
});

console.log("Prueba 3: Cantidad debe ser entero");
it("Rechaza cantidad decimal", () => {
  const resultado = registroVenta(ventaBase, [
    { ...detalleValido, cantidad: 2.5 },
  ]);
  expect(resultado.valido).toBe(false);
  expect(resultado.mensaje).toContain("cantidad");
});

console.log("Prueba 4: Cantidad no numérica");
it("Rechaza cantidad no entera", () => {
  const resultado = registroVenta(ventaBase, [
    { ...detalleValido, cantidad: "dos" },
  ]);
  expect(resultado.valido).toBe(false);
  expect(resultado.mensaje).toContain("cantidad");
});

console.log("Prueba 5: Total debe ser mayor o igual a 1");
it("Rechaza total menor a 1", () => {
  const resultado = registroVenta(
    { id_cliente: 1, total_venta: 0 },
    [detalleValido],
  );
  expect(resultado.valido).toBe(false);
  expect(resultado.mensaje).toContain("total");
});

console.log("Prueba 6: Registra venta correctamente");
it("Acepta venta con datos válidos", () => {
  const resultado = registroVenta(ventaBase, [detalleValido]);
  expect(resultado.valido).toBe(true);
});

console.log("Prueba 7: Registra venta con varios detalles");
it("Acepta venta con múltiples cantidades enteras", () => {
  const resultado = registroVenta(ventaBase, [
    detalleValido,
    { id_producto: 15, cantidad: 1 },
  ]);
  expect(resultado.valido).toBe(true);
});
