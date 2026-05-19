import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

const ModalCancelacionOrden = ({
  mostrarModalCancelacion,
  setMostrarModalCancelacion,
  ordenACancelar,
  cancelarOrden,
}) => {
  const [deshabilitado, setDeshabilitado] = useState(false);

  const handleCancelar = async () => {
    if (deshabilitado) return;
    setDeshabilitado(true);
    await cancelarOrden();
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
          Cancelar Orden #{ordenACancelar?.id_orden}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        ¿Estás seguro de que deseas <strong>CANCELAR</strong> esta orden?
        <br />
        <span className="text-muted small">
          El estado de la orden y todos sus productos asignados cambiarán a{" "}
          <strong>"Cancelado"</strong> de forma permanente.
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

export default ModalCancelacionOrden;
