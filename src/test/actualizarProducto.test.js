const actualizarProducto = require("./actualizarProducto");
console.log("Prueba 1: No permite precio negativo en actualización");
it("Debe rechazar precio negativo", () => {
  const producto = {
    nombre_producto: "Hamburgesa",
    id_categoria: "1",
    precio_venta: -10,
    stock: 5,
  };
  const resultado = actualizarProducto(1, producto);
  expect(resultado.valido).toBe(false);
  expect(resultado.mensaje).toContain("precio");
});
console.log("Prueba 2: No permite stock negativo en actualización tiene que ser mayor a 0",);
it("No permite stock negativo", () => {
  const producto = {
    nombre_producto: "Hamburgesa",
    id_categoria: "1",
    precio_venta: 10,
    stock: -5,
  };
  const resultado = actualizarProducto(1, producto);
  expect(resultado.valido).toBe(false);
  expect(resultado.mensaje).toContain("stock");
});
