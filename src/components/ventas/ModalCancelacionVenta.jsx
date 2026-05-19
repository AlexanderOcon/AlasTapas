import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

const ModalCancelacionVenta = ({
  mostrarModalCancelacion,
  setMostrarModalCancelacion,
  ventaACancelar,
  cancelarVenta,
}) => {
  const [deshabilitado, setDeshabilitado] = useState(false);

  const handleCancelar = async () => {
    if (deshabilitado) return;
    setDeshabilitado(true);
    await cancelarVenta();
    setDeshabilitado(false);
  };

  return (
    <Modal
      show={mostrarModalCancelacion}
      onHide={() => setMostrarModalCancelacion(false)}
      backdrop="static"
      keyboard={false}
      centered
    >
      <Modal.Header closeButton className="bg-danger text-white">
        <Modal.Title>
          <i className="bi bi-exclamation-triangle-fill me-2"></i>
          Cancelar Venta #{ventaACancelar?.id_venta}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        ¿Estás seguro de que deseas <strong>CANCELAR</strong> esta venta?
        <br />
        <span className="text-muted small">
          La venta será eliminada del sistema de forma permanente.
        </span>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => setMostrarModalCancelacion(false)}
          disabled={deshabilitado}
        >
          Volver atrás
        </Button>
        <Button
          variant="danger"
          onClick={handleCancelar}
          disabled={deshabilitado}
        >
          Confirmar Cancelación
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalCancelacionVenta;
