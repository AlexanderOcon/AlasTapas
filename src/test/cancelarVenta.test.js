const cancelarVenta = require("./cancelarVenta");

const ventaPendiente = {
  id_venta: 1,
  id_cliente: 1,
  estado_venta: "pendiente",
  total_venta: 50,
};

const ventaCancelada = {
  id_venta: 2,
  id_cliente: 1,
  estado_venta: "cancelada",
  total_venta: 50,
};

console.log("Prueba 1: Permite cancelar venta en estado pendiente");
it("Permite cancelar venta con estado 'Pendiente'", () => {
  const resultado = cancelarVenta(ventaPendiente);
  expect(resultado.valido).toBe(true);
});

console.log("Prueba 2: No permite cancelar venta que ya está cancelada");
it("No permite cancelar venta con estado 'Cancelada'", () => {
  const resultado = cancelarVenta(ventaCancelada);
  expect(resultado.valido).toBe(false);
  expect(resultado.mensaje).toContain("Cancelada");
});

console.log("Prueba 3: Permite cancelar venta pendiente con booleano true");
it("Permite cancelar venta con estado true (Pendiente como booleano)", () => {
  const resultado = cancelarVenta({
    ...ventaPendiente,
    estado_venta: true,
  });
  expect(resultado.valido).toBe(true);
});

console.log("Prueba 4: No permite cancelar venta cancelada con booleano false");
it("No permite cancelar venta con estado false (Cancelada como booleano)", () => {
  const resultado = cancelarVenta({
    ...ventaCancelada,
    estado_venta: false,
  });
  expect(resultado.valido).toBe(false);
  expect(resultado.mensaje).toContain("Cancelada");
});

console.log("Prueba 5: Rechaza estado inválido");
it("Rechaza venta con estado no válido", () => {
  const resultado = cancelarVenta({
    ...ventaPendiente,
    estado_venta: "completada",
  });
  expect(resultado.valido).toBe(false);
  expect(resultado.mensaje).toContain("Pendiente");
});
