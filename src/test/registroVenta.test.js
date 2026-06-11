const registroVenta = require("./registroVenta");

const ventaBase = {
  id_cliente: 1,
  total_venta: 50,
};

const detalleValido = {
  id_producto: 10,
  cantidad: 2,
};

console.log("Prueba 1: Rechaza ID cliente inválido");
it("Rechaza ID de cliente menor a 1", () => {
  const resultado = registroVenta({ id_cliente: 0, total_venta: 50 }, [
    detalleValido,
  ]);
  expect(resultado.valido).toBe(false);
  expect(resultado.mensaje).toContain("cliente");
});

console.log("Prueba 2: Acepta venta válida");
it("Acepta venta válida", () => {
  const resultado = registroVenta(ventaBase, [detalleValido]);
  expect(resultado.valido).toBe(true);
});
