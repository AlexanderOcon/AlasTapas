import React, { useState } from "react";
import { Modal, Button, Form, Row, Col, Table } from "react-bootstrap";

const ModalEdicionOrden = ({
  mostrarModalEdicion,
  setMostrarModalEdicion,
  ordenEditar,
  detallesEditar,
  manejoCambioInputEdicion,
  agregarDetalleEdicion,
  eliminarDetalleEdicion,
  actualizarEstadoDetalleEdicion,
  actualizarOrden,
  productosDisponibles,
  clientesDisponibles,
}) => {
  const [deshabilitado, setDeshabilitado] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState("");
  const [cantidadInput, setCantidadInput] = useState(1);
  const [estadoInput, setEstadoInput] = useState(false); // Sincronizado: false es "En Cocina"

  const handleAgregarItem = () => {
    if (!productoSeleccionado) return;

    const prodEncontrado = productosDisponibles.find(
      (p) => p.id_producto.toString() === productoSeleccionado.toString(),
    );

    if (!prodEncontrado) return;

    agregarDetalleEdicion({
      id_producto: prodEncontrado.id_producto,
      nombre_producto: prodEncontrado.id_producto, // Registra el ID numérico (bigint) requerido
      cantidad: parseInt(cantidadInput),
      estado_orden: estadoInput, // Booleano
    });

    setProductoSeleccionado("");
    setCantidadInput(1);
    setEstadoInput(false);
  };

  const handleActualizar = async () => {
    if (deshabilitado) return;
    setDeshabilitado(true);
    await actualizarOrden();
    setDeshabilitado(false);
  };

  return (
    <Modal
      show={mostrarModalEdicion}
      onHide={() => setMostrarModalEdicion(false)}
      backdrop="static"
      keyboard={false}
      centered
      size="lg"
    >
      <Modal.Header closeButton>
        <Modal.Title>Editar Orden #{ordenEditar.id_orden}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Row>
            <Col xs={12} md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Cliente *</Form.Label>
                <Form.Select
                  name="id_cliente"
                  value={ordenEditar.id_cliente || ""}
                  onChange={manejoCambioInputEdicion}
                  disabled
                >
                  <option value="">Seleccione un cliente...</option>
                  {clientesDisponibles.map((c) => (
                    <option key={c.id_cliente} value={c.id_cliente}>
                      {c.nombre_cliente}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col xs={12} md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Fecha de la Orden *</Form.Label>
                <Form.Control
                  type="datetime-local"
                  name="fecha_orden"
                  value={ordenEditar.fecha_orden || ""}
                  onChange={manejoCambioInputEdicion}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <hr />
          <h5>Modificar Productos del Detalle</h5>
          <Row className="align-items-end mb-3">
            <Col xs={12} md={4}>
              <Form.Group>
                <Form.Label>Producto</Form.Label>
                <Form.Select
                  value={productoSeleccionado}
                  onChange={(e) => setProductoSeleccionado(e.target.value)}
                >
                  <option value="">Seleccione un producto...</option>
                  {productosDisponibles.map((p) => (
                    <option key={p.id_producto} value={p.id_producto}>
                      {p.nombre_producto}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col xs={6} md={3}>
              <Form.Group>
                <Form.Label>Cantidad</Form.Label>
                <Form.Control
                  type="number"
                  min="1"
                  value={cantidadInput}
                  onChange={(e) => setCantidadInput(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col xs={6} md={3}>
              <Form.Group>
                <Form.Label>Estado del Platillo</Form.Label>
                <Form.Select
                  value={estadoInput.toString()}
                  onChange={(e) => setEstadoInput(e.target.value === "true")}
                >
                  <option value="false">En Cocina</option>
                  <option value="true">Listo</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col xs={12} md={2} className="mt-2 mt-md-0">
              <Button
                variant="success"
                onClick={handleAgregarItem}
                className="w-100"
              >
                Añadir
              </Button>
            </Col>
          </Row>

          <Table striped bordered hover size="sm" responsive>
            <thead>
              <tr>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Estado</th>
                <th className="text-center">Acción</th>
              </tr>
            </thead>
            <tbody>
              {detallesEditar.map((det, index) => {
                const codigoProducto = det.id_producto || det.nombre_producto;
                const producto = productosDisponibles.find(
                  (p) =>
                    p.id_producto.toString() === codigoProducto?.toString(),
                );

                return (
                  <tr key={index}>
                    <td>
                      {producto?.nombre_producto || "Buscando platillo..."}
                    </td>
                    <td>{det.cantidad}</td>
                    <td>
                      <Form.Select
                        size="sm"
                        value={det.estado_orden === true || det.estado_orden === "true" ? "true" : "false"}
                        onChange={(e) => {
                          actualizarEstadoDetalleEdicion(index, e.target.value === "true");
                        }}
                      >
                        <option value="false">En Cocina</option>
                        <option value="true">Listo</option>
                      </Form.Select>
                    </td>
                    <td className="text-center">
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => eliminarDetalleEdicion(index)}
                      >
                        <i className="bi bi-trash"></i>
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => setMostrarModalEdicion(false)}
          disabled={deshabilitado}
        >
          Cancelar
        </Button>
        <Button
          variant="primary"
          onClick={handleActualizar}
          disabled={
            deshabilitado ||
            detallesEditar.length === 0 ||
            !ordenEditar.fecha_orden ||
            !ordenEditar.id_cliente
          }
        >
          Actualizar Orden
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalEdicionOrden;
