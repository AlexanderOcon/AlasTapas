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

console.log("Prueba 1: No se puede registrar orden sin fecha");
it("No permite registrar sin fecha", () => {
  const resultado = registroOrden(
    { id_cliente: "1", fecha_orden: "" },
    [detalleValido],
  );
  expect(resultado.valido).toBe(false);
  expect(resultado.mensaje).toContain("fecha");
});

console.log("Prueba 2: No permite cantidad cero");
it("Rechaza cantidad igual a cero", () => {
  const resultado = registroOrden(ordenBase, [
    { ...detalleValido, cantidad: 0 },
  ]);
  expect(resultado.valido).toBe(false);
  expect(resultado.mensaje).toContain("cantidad");
});

console.log("Prueba 3: No permite cantidad negativa");
it("Rechaza cantidad negativa", () => {
  const resultado = registroOrden(ordenBase, [
    { ...detalleValido, cantidad: -3 },
  ]);
  expect(resultado.valido).toBe(false);
  expect(resultado.mensaje).toContain("cantidad");
});

console.log("Prueba 4: No permite fecha inválida");
it("Rechaza fecha inválida", () => {
  const resultado = registroOrden(
    { id_cliente: "1", fecha_orden: "fecha-invalida" },
    [detalleValido],
  );
  expect(resultado.valido).toBe(false);
  expect(resultado.mensaje).toContain("fecha");
});

console.log("Prueba 5: Registra orden correctamente");
it("Registra orden con datos válidos", () => {
  const resultado = registroOrden(ordenBase, [detalleValido]);
  expect(resultado.valido).toBe(true);
});

