import React, { useState } from "react";
import { Modal, Button, Form, Row, Col, Table, Badge } from "react-bootstrap";

const ModalRegistroVenta = ({
  mostrarModal,
  setMostrarModal,
  nuevaVenta,
  manejoCambioInput,
  agregarVenta,
  ordenesDisponibles,
  detalleOrdenSeleccionada,
  clienteSeleccionado,
  productosDisponibles,
  totalVenta,
}) => {
  const [deshabilitado, setDeshabilitado] = useState(false);

  const handleGuardar = async () => {
    if (deshabilitado) return;
    setDeshabilitado(true);
    await agregarVenta();
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
        <Modal.Title>Registrar Nueva Venta</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Row>
            <Col xs={12} md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Orden *</Form.Label>
                <Form.Select
                  name="id_orden"
                  value={nuevaVenta.id_orden || ""}
                  onChange={manejoCambioInput}
                  required
                >
                  <option value="">Seleccione una orden...</option>
                  {ordenesDisponibles.map((o) => (
                    <option key={o.id_orden} value={o.id_orden}>
                      Orden #{o.id_orden}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col xs={12} md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Estado de la Venta *</Form.Label>
                <Form.Select
                  name="estado_venta"
                  value={nuevaVenta.estado_venta || "pendiente"}
                  onChange={manejoCambioInput}
                >
                  <option value="pendiente">Pendiente</option>
                  <option value="completada">Completada</option>
                  <option value="cancelada">Cancelada</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          {clienteSeleccionado && (
            <Row>
              <Col xs={12} md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Cliente</Form.Label>
                  <Form.Control
                    type="text"
                    value={clienteSeleccionado.nombre_cliente || ""}
                    disabled
                  />
                </Form.Group>
              </Col>
            </Row>
          )}

          <hr />
          <h5>Detalles de la Orden</h5>

          {detalleOrdenSeleccionada && detalleOrdenSeleccionada.length > 0 ? (
            <Table striped bordered hover size="sm" responsive className="mb-3">
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Cantidad</th>
                  <th>Precio Unit.</th>
                  <th className="text-end">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {detalleOrdenSeleccionada.map((detalle, index) => {
                  const producto = productosDisponibles.find(
                    (p) => p.id_producto.toString() === detalle.nombre_producto?.toString(),
                  );
                  const subtotal = producto ? producto.precio * detalle.cantidad : 0;

                  return (
                    <tr key={index}>
                      <td>{producto?.nombre_producto || "Producto"}</td>
                      <td className="text-center">{detalle.stock}</td>
                      <td className="text-end">
                        ${producto?.precio?.toFixed(2) || "0.00"}
                      </td>
                      <td className="text-end fw-bold">
                        ${subtotal.toFixed(2)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          ) : (
            <div className="alert alert-info">
              Seleccione una orden para ver sus detalles
            </div>
          )}

          {detalleOrdenSeleccionada && detalleOrdenSeleccionada.length > 0 && (
            <Row>
              <Col xs={12} className="text-end">
                <h5>
                  Total Venta:{" "}
                  <Badge bg="success">${totalVenta.toFixed(2)}</Badge>
                </h5>
              </Col>
            </Row>
          )}
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => setMostrarModal(false)}
          disabled={deshabilitado}
        >
          Cancelar
        </Button>
        <Button
          variant="primary"
          onClick={handleGuardar}
          disabled={deshabilitado || !nuevaVenta.id_orden}
        >
          Guardar Venta
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalRegistroVenta;
