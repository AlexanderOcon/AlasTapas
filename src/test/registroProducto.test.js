const registroProducto = require("./registroProducto");


  console.log("Prueba 1: El precio del producto no puede ser negativo");
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

  console.log("Prueba 2: El stock debe ser mayor a cero");
  it("No permite stock menor que cero", () => {
    const producto = {
      nombre_producto: "Hamburgesa",
      id_categoria: "1",
      precio_venta: 10,
      stock: -5,
    };
    const resultado = registroProducto(producto);
    expect(resultado.valido).toBe(false);
    expect(resultado.mensaje).toContain("stock");
  });