const registroOrden = require("./registroOrden");

const ordenBase = {
  id_cliente: "1",
  fecha_orden: "2026-06-03T18:30",
};

const detalleValido = {
  id_producto: 10,
  nombre_producto: 10,
  estado_orden: false,
  cantidad: 2,
};

console.log("Prueba 1: Rechaza fecha inválida");
it("Rechaza fecha inválida", () => {
  const resultado = registroOrden(
    { id_cliente: "1", fecha_orden: "fecha-invalida" },
    [detalleValido],
  );
  expect(resultado.valido).toBe(false);
  expect(resultado.mensaje).toContain("fecha");
});

console.log("Prueba 2: Acepta orden válida");
it("Acepta orden válida", () => {
  const resultado = registroOrden(ordenBase, [detalleValido]);
  expect(resultado.valido).toBe(true);
});
