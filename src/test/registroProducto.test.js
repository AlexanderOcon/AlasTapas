const registroProducto = require("./registroProducto");

console.log("Prueba 1: Rechaza precio negativo");
it("Debe rechazar precio negativo", () => {
  const producto = {
    nombre_producto: "Hamburgesa",
    id_categoria: "1",
    precio_venta: -10,
    stock: 5,
  };
  const resultado = registroProducto(producto);
  expect(resultado.valido).toBe(false);
  expect(resultado.mensaje).toContain("precio");
});

console.log("Prueba 2: Acepta producto válido");
it("Acepta producto válido", () => {
  const producto = {
    nombre_producto: "Hamburgesa",
    id_categoria: "1",
    precio_venta: 10,
    stock: 5,
  };
  const resultado = registroProducto(producto);
  expect(resultado.valido).toBe(true);
});