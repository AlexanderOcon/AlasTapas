import React, { useState } from "react";
import { Modal, Button, Form, Row, Col, Table } from "react-bootstrap";

const ModalRegistroOrden = ({
  mostrarModal,
  setMostrarModal,
  nuevaOrden,
  detallesOrden,
  manejoCambioInput,
  agregarDetalleAlFormulario,
  eliminarDetalleDelFormulario,
  agregarOrden,
  productosDisponibles,
  clientesDisponibles,
}) => {
  const [deshabilitado, setDeshabilitado] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState("");
  const [cantidadInput, setCantidadInput] = useState(1);
  const [estadoInput, setEstadoInput] = useState(false); // Sincronizado: false es "En Cocina"

  const handleAgregarDetalle = () => {
    if (!productoSeleccionado) return;

    const prod = productosDisponibles.find(
      (p) => p.id_producto.toString() === productoSeleccionado.toString(),
    );

    if (!prod) return;

    agregarDetalleAlFormulario({
      id_producto: prod.id_producto,
      nombre_producto: prod.id_producto, // Enviamos el ID numérico (bigint) esperado por la BD
      estado_orden: estadoInput, // Booleano
      cantidad: parseInt(cantidadInput),
    });

    setProductoSeleccionado("");
    setCantidadInput(1);
    setEstadoInput(false);
  };

  const handleGuardar = async () => {
    if (deshabilitado) return;
    setDeshabilitado(true);
    await agregarOrden();
    setDeshabilitado(false);
  };

  return (
    <Modal
      show={mostrarModal}
      onHide={() => setMostrarModal(false)}
      backdrop="static"
      keyboard={false}
      centered
      size="lg"
    >
      <Modal.Header closeButton>
        <Modal.Title>Registrar Nueva Orden</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Row>
            <Col xs={12} md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Cliente *</Form.Label>
                <Form.Select
                  name="id_cliente"
                  value={nuevaOrden.id_cliente || ""}
                  onChange={manejoCambioInput}
                  required
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
                <Form.Label>Fecha y Hora de la Orden *</Form.Label>
                <Form.Control
                  type="datetime-local"
                  name="fecha_orden"
                  value={nuevaOrden.fecha_orden || ""}
                  onChange={manejoCambioInput}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <hr />
          <h5>Agregar Platillos al Detalle</h5>
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
                <Form.Label>Estado Inicial</Form.Label>
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
                variant="primary"
                onClick={handleAgregarDetalle}
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
                <th>Estado</th>
                <th>Cantidad</th>
                <th className="text-center">Acción</th>
              </tr>
            </thead>
            <tbody>
              {detallesOrden.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center text-muted">
                    No se han anexado productos a la orden.
                  </td>
                </tr>
              ) : (
                detallesOrden.map((det, index) => {
                  const producto = productosDisponibles.find(
                    (p) =>
                      p.id_producto.toString() === det.id_producto?.toString(),
                  );
                  return (
                    <tr key={index}>
                      <td>
                        {producto?.nombre_producto || "Buscando platillo..."}
                      </td>
                      <td>
                        {det.estado_orden === true ||
                        det.estado_orden === "true"
                          ? "Listo"
                          : "En Cocina"}
                      </td>
                      <td>{det.cantidad}</td>
                      <td className="text-center">
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => eliminarDetalleDelFormulario(index)}
                        >
                          <i className="bi bi-trash"></i>
                        </Button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </Table>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={() => setMostrarModal(false)}>
          Cancelar
        </Button>
        <Button
          variant="primary"
          onClick={handleGuardar}
          disabled={
            deshabilitado ||
            detallesOrden.length === 0 ||
            !nuevaOrden.fecha_orden ||
            !nuevaOrden.id_cliente
          }
        >
          Guardar Orden
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalRegistroOrden;
