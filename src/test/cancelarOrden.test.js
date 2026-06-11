const cancelarOrden = require("./cancelarOrden");
const ordenEnCocina = {
  id_orden: 1,
  id_cliente: "1",
  estado_orden: false,
  fecha_orden: "2026-06-03T18:30",
};
const ordenLista = {
  id_orden: 2,
  id_cliente: "1",
  estado_orden: true,
  fecha_orden: "2026-06-03T18:30",
};
console.log("Prueba 1: Permite cancelar orden en cocina");
it("Permite cancelar orden con estado 'En Cocina'", () => {
  const resultado = cancelarOrden(ordenEnCocina);
  expect(resultado.valido).toBe(true);
});
console.log("Prueba 2: No permite cancelar orden lista");
it("No permite cancelar orden con estado 'Listo'", () => {
  const resultado = cancelarOrden(ordenLista);
  expect(resultado.valido).toBe(false);
  expect(resultado.mensaje).toContain("Lista");
});
