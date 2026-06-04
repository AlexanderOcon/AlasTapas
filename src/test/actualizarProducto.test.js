const actualizarProducto = require("./actualizarProducto");

console.log("Prueba 1: No se puede actualizar sin ID del producto");
describe("Validación de actualización de producto", () => {
  it("No permite actualizar sin ID del producto", () => {
    const resultado = actualizarProducto(null, {
      nombre_producto: "Hamburgesa",
      id_categoria: "1",
      precio_venta: 10,
      stock: 5,
    });
    expect(resultado.valido).toBe(false);
    expect(resultado.mensaje).toContain("ID del producto");
  });

  console.log("Prueba 2: No se puede actualizar con campos vacíos");
  it("No permite actualizar con campos vacíos", () => {
    const producto = {
      nombre_producto: "",
      id_categoria: "",
      precio_venta: "",
      stock: "",
    };
    const resultado = actualizarProducto(1, producto);
    expect(resultado.valido).toBe(false);
    expect(resultado.mensaje).toContain("campos requeridos");
  });

  console.log("Prueba 3: No permite precio negativo en actualización");
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

  console.log("Prueba 4: No permite stock negativo en actualización tiene que ser mayor a 0");
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

  console.log("Prueba 5: No permite descripción muy larga");
  it("No permite descripción que exceda 255 caracteres", () => {
    const producto = {
      nombre_producto: "Hamburgesa",
      id_categoria: "1",
      precio_venta: 10,
      stock: 5,
      descripcion: "a".repeat(300),
    };
    const resultado = actualizarProducto(1, producto);
    expect(resultado.valido).toBe(false);
    expect(resultado.mensaje).toContain("descripción");
  });

  console.log("Prueba 6: No permite nombre con números");
  it("No permite nombre con números o caracteres especiales", () => {
    const producto = {
      nombre_producto: "Hamburgesa123",
      id_categoria: "1",
      precio_venta: 10,
      stock: 5,
    };
    const resultado = actualizarProducto(1, producto);
    expect(resultado.valido).toBe(false);
    expect(resultado.mensaje).toContain("letras");
  });

  console.log("Prueba 7: Actualiza producto correctamente");
  it("Actualiza producto correctamente con datos válidos", () => {
    const producto = {
      nombre_producto: "Hamburgesa",
      id_categoria: "1",
      precio_venta: 10,
      stock: 5,
      descripcion: "Hamburgesa de res",
    };
    const resultado = actualizarProducto(1, producto);
    expect(resultado.valido).toBe(true);
  });

  console.log("Prueba 8: Actualiza producto sin descripción");
  it("Permite actualizar sin descripción", () => {
    const producto = {
      nombre_producto: "Hamburgesa",
      id_categoria: "1",
      precio_venta: 10,
      stock: 5,
    };
    const resultado = actualizarProducto(1, producto);
    expect(resultado.valido).toBe(true);
  });
});
