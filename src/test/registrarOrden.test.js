const registrarOrden = require("./registrarOrden");

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

console.log("Prueba 1: No se puede registrar orden sin cliente");
describe("Validación de registro de orden", () => {
  it("No permite registrar sin cliente", () => {
    const resultado = registrarOrden(
      { id_cliente: "", fecha_orden: ordenBase.fecha_orden },
      [detalleValido],
    );
    expect(resultado.valido).toBe(false);
    expect(resultado.mensaje).toContain("cliente");
  });

  console.log("Prueba 2: No se puede registrar orden sin fecha");
  it("No permite registrar sin fecha", () => {
    const resultado = registrarOrden(
      { id_cliente: "1", fecha_orden: "" },
      [detalleValido],
    );
    expect(resultado.valido).toBe(false);
    expect(resultado.mensaje).toContain("fecha");
  });

  console.log("Prueba 3: No se puede registrar orden sin productos");
  it("No permite registrar sin detalles", () => {
    const resultado = registrarOrden(ordenBase, []);
    expect(resultado.valido).toBe(false);
    expect(resultado.mensaje).toContain("producto");
  });

  console.log("Prueba 4: No permite cantidad cero");
  it("Rechaza cantidad igual a cero", () => {
    const resultado = registrarOrden(ordenBase, [
      { ...detalleValido, cantidad: 0 },
    ]);
    expect(resultado.valido).toBe(false);
    expect(resultado.mensaje).toContain("cantidad");
  });

  console.log("Prueba 5: No permite cantidad negativa");
  it("Rechaza cantidad negativa", () => {
    const resultado = registrarOrden(ordenBase, [
      { ...detalleValido, cantidad: -3 },
    ]);
    expect(resultado.valido).toBe(false);
    expect(resultado.mensaje).toContain("cantidad");
  });

  console.log("Prueba 6: Cada detalle debe tener producto");
  it("No permite detalle sin producto", () => {
    const resultado = registrarOrden(ordenBase, [
      { estado_orden: false, cantidad: 2 },
    ]);
    expect(resultado.valido).toBe(false);
    expect(resultado.mensaje).toContain("producto");
  });

  console.log("Prueba 7: No permite fecha inválida");
  it("Rechaza fecha inválida", () => {
    const resultado = registrarOrden(
      { id_cliente: "1", fecha_orden: "fecha-invalida" },
      [detalleValido],
    );
    expect(resultado.valido).toBe(false);
    expect(resultado.mensaje).toContain("fecha");
  });

  console.log("Prueba 8: Registra orden correctamente");
  it("Registra orden con datos válidos", () => {
    const resultado = registrarOrden(ordenBase, [detalleValido]);
    expect(resultado.valido).toBe(true);
  });

  console.log("Prueba 9: Registra orden con varios productos");
  it("Registra orden con múltiples detalles", () => {
    const resultado = registrarOrden(ordenBase, [
      detalleValido,
      {
        id_producto: 15,
        nombre_producto: 15,
        estado_orden: true,
        cantidad: 1,
      },
    ]);
    expect(resultado.valido).toBe(true);
  });
});
