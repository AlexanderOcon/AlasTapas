import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Spinner, Alert } from "react-bootstrap";
import { supabase } from "../database/supabaseconfig";
import ModalRegistroCategoria from "../components/categorias/ModalRegistroCategoria";
import ModalEdicionCategoria from "../components/categorias/ModalEdicionCategoria";
import ModalEliminacionCategoria from "../components/categorias/ModalEliminacionCategoria";
import TablaCategorias from "../components/categorias/TablaCategorias";
import TarjetaCategoria from "../components/categorias/TarjetaCategoria";
import NotificacionOperacion from "../components/NotificacionOperacion";
import CuadroBusquedas from "../components/busquedas/CuadroBusquedas";
import Paginacion from "../components/ordenamiento/Paginacion";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const Categorias = () => {
  const [toast, setToast] = useState({ mostrar: false, mensaje: "", tipo: "" });
  const [mostrarModal, setMostrarModal] = useState(false);
  const [nuevaCategoria, setNuevaCategoria] = useState({
    nombre_categoria: "",
    descripcion_categoria: "",
  });

  const [categorias, setCategorias] = useState([]);
  const [cargando, setCargando] = useState(true); // Estado de carga inicial
  const [mostrarModalEliminacion, setMostrarModalEliminacion] = useState(false);
  const [categoriaAEliminar, setCategoriaAEliminar] = useState(null);
  const [mostrarModalEdicion, setMostrarModalEdicion] = useState(false);
  const [textoBusqueda, setTextoBusqueda] = useState("");
  const [categoriasFiltradas, setCategoriasFiltradas] = useState([]);
  const [registroPorPagina, establecerRegistroPorPagina] = useState(5);
  const [PaginaActual, establecerPaginaActual] = useState(1);

  const manejarBusqueda = (e) => {
    setTextoBusqueda(e.target.value);
  };

  const categoriasPaginadas = categoriasFiltradas.slice(
    (PaginaActual - 1) * registroPorPagina,
    PaginaActual * registroPorPagina
  );

  const [categoriaEditar, setCategoriaEditar] = useState({
    id_categoria: "",
    nombre_categoria: "",
    descripcion_categoria: "",
  });

  const cargarCategorias = async () => {
    try {
      setCargando(true);
      const { data, error } = await supabase
        .from("categorias")
        .select("*")
        .order("id_categoria", { ascending: true });
      if (error) {
        console.error("Error al cargar categorías:", error.message);
        setToast({
          mostrar: true,
          mensaje: "Error al cargar categorías.",
          tipo: "error",
        });
        
        return;
      }
      setCategorias(
        (data || []).map((item) => ({
          ...item,
          descripcion_categoria:
            item.descripcion_categoria ?? item.descripcion ?? "",
          nombre_categoria: item.nombre_categoria ?? item.nombre ?? "",
        })),
      );
    } catch (err) {
      console.error("Excepción al cargar categorías:", err.message);
      setToast({
        mostrar: true,
        mensaje: "Error inesperado al cargar categorías.",
        tipo: "error",
      });
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarCategorias();
  }, []);

  useEffect(() => {
    if (!textoBusqueda.trim()) {
      setCategoriasFiltradas(categorias);
    } else {
      const textoLower = textoBusqueda.toLowerCase().trim();
      const filtradas = categorias.filter(
        (cat) =>
          cat.nombre_categoria.toLowerCase().includes(textoLower) ||
          (cat.descripcion_categoria && cat.descripcion_categoria.toLowerCase().includes(textoLower))
      );
      setCategoriasFiltradas(filtradas);
    }
  }, [textoBusqueda, categorias]);

  const abrirModalEdicion = (categoria) => {
    setCategoriaEditar({
      id_categoria: categoria.id_categoria,
      nombre_categoria: categoria.nombre_categoria,
      descripcion_categoria:
        categoria.descripcion_categoria ?? categoria.descripcion ?? "",
    });
    setMostrarModalEdicion(true);
  };

  const abrirModalEliminacion = (categoria) => {
    setCategoriaAEliminar(categoria);
    setMostrarModalEliminacion(true);
  };

  const manejoCambioInputEdicion = (e) => {
    const { name, value } = e.target;
    setCategoriaEditar((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const manejoCambioInput = (e) => {
    const { name, value } = e.target;
    setNuevaCategoria((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const agregarCategoria = async () => {
    try {
      if (
        !nuevaCategoria.nombre_categoria.trim() ||
        !nuevaCategoria.descripcion_categoria.trim()
      ) {
        setToast({
          mostrar: true,
          mensaje: "Debe llenar todos los campos.",
          tipo: "advertencia",
        });
        return;
      }

      const { data, error } = await supabase
        .from("categorias")
        .insert([
          {
            nombre_categoria: nuevaCategoria.nombre_categoria,
            descripcion_categoria: nuevaCategoria.descripcion_categoria,
          },
        ])
        .select();

      if (error) {
        console.error("Error al agregar categoría:", error.message);
        setToast({
          mostrar: true,
          mensaje: "Error al registrar categoría.",
          tipo: "error",
        });
        return;
      }

      console.log("Categoría creada:", data);

      // Éxito
      setToast({
        mostrar: true,
        mensaje: `Categoría "${nuevaCategoria.nombre_categoria}" registrada exitosamente.`,
        tipo: "exito",
      });

      await cargarCategorias();

      // Limpiar formulario y cerrar modal
      setNuevaCategoria({ nombre_categoria: "", descripcion_categoria: "" });
      setMostrarModal(false);
    } catch (err) {
      console.error("Excepción al agregar categoría:", err.message);
      setToast({
        mostrar: true,
        mensaje: "Error inesperado al registrar categoría.",
        tipo: "error",
      });
    }
  };

  const actualizarCategoria = async () => {
    try {
      if (
        !categoriaEditar.nombre_categoria.trim() ||
        !categoriaEditar.descripcion_categoria.trim()
      ) {
        setToast({
          mostrar: true,
          mensaje: "Debe llenar todos los campos.",
          tipo: "advertencia",
        });
        return;
      }

      const { error } = await supabase
        .from("categorias")
        .update({
          nombre_categoria: categoriaEditar.nombre_categoria,
          descripcion_categoria: categoriaEditar.descripcion_categoria,
        })
        .eq("id_categoria", categoriaEditar.id_categoria)
        .select();

      if (error) {
        console.error("Error al actualizar categoría:", error.message);
        setToast({
          mostrar: true,
          mensaje: "Error al actualizar categoría.",
          tipo: "error",
        });
        return;
      }

      setMostrarModalEdicion(false);

      await cargarCategorias();

      setToast({
        mostrar: true,
        mensaje: `Categoría "${categoriaEditar.nombre_categoria}" actualizada exitosamente.`,
        tipo: "exito",
      });
    } catch (err) {
      console.error("Excepción al actualizar categoría:", err.message);
      setToast({
        mostrar: true,
        mensaje: "Error inesperado al actualizar categoría.",
        tipo: "error",
      });
      console.error("Error al actualizar categoría:", err.message);
    }
  };

  const eliminarCategoria = async () => {
    if (!categoriaAEliminar) return;
    try {
      setMostrarModalEliminacion(false);
      const { error } = await supabase
        .from("categorias")
        .delete()
        .eq("id_categoria", categoriaAEliminar.id_categoria)
        .select();

      if (error) {
        console.error("Error al eliminar categoría:", error.message);
        setToast({
          mostrar: true,
          mensaje: `Error al eliminar categoría "${categoriaAEliminar.nombre_categoria}": ${error.message}`,
          tipo: "error",
        });
        return;
      }

      await cargarCategorias();
      setToast({
        mostrar: true,
        mensaje: `Categoría "${categoriaAEliminar.nombre_categoria}" eliminada exitosamente.`,
        tipo: "exito",
      });
    } catch (err) {
      console.error("Excepción al eliminar categoría:", err.message);
      setToast({
        mostrar: true,
        mensaje: "Error inesperado al eliminar categoría.",
        tipo: "error",
      });
      console.error("Error al eliminar categoría:", err.message);
    }
  };

  const generarPDFCategoria = (categoria) => {
    try {
      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.getWidth();

      // Título
      doc.setFontSize(22);
      doc.setFont(undefined, "bold");
      doc.text("Ficha de Categoría", 14, 20);

      // Subtítulo con nombre de la empresa
      doc.setFontSize(14);
      doc.setFont(undefined, "normal");
      doc.setTextColor(150, 0, 0);
      doc.text("AlasTapas", 14, 28);
      doc.setTextColor(0, 0, 0);

      // Línea decorativa
      doc.setDrawColor(200, 0, 0);
      doc.setLineWidth(1);
      doc.line(14, 32, pageWidth - 14, 32);

      let yPosition = 50;

      // Información de la categoría
      doc.setFontSize(16);
      doc.setFont(undefined, "bold");
      doc.setTextColor(50, 50, 50);
      doc.text(categoria.nombre_categoria, 14, yPosition);

      yPosition += 15;

      // ID
      doc.setFontSize(10);
      doc.setFont(undefined, "normal");
      doc.setTextColor(70, 70, 70);
      doc.text(`ID: ${categoria.id_categoria}`, 14, yPosition);

      yPosition += 10;

      // Descripción
      doc.setFontSize(11);
      doc.setFont(undefined, "bold");
      doc.setTextColor(0, 0, 0);
      doc.text("Descripción:", 14, yPosition);

      yPosition += 8;
      doc.setFontSize(10);
      doc.setFont(undefined, "normal");
      doc.setTextColor(50, 50, 50);

      if (categoria.descripcion_categoria) {
        const descArray = doc.splitTextToSize(
          categoria.descripcion_categoria,
          pageWidth - 28
        );
        doc.text(descArray, 14, yPosition);
      } else {
        doc.text("Sin descripción disponible", 14, yPosition);
      }

      // Pie de página
      doc.setFontSize(8);
      doc.setTextColor(150, 150, 150);
      doc.text(
        `Generado: ${new Date().toLocaleDateString("es-ES")} | AlasTapas`,
        14,
        doc.internal.pageSize.getHeight() - 10
      );

      // Descargar PDF
      doc.save(`categoria_${categoria.id_categoria}_${categoria.nombre_categoria}.pdf`);

      setToast({
        mostrar: true,
        mensaje: `PDF de "${categoria.nombre_categoria}" generado correctamente`,
        tipo: "exito",
      });
    } catch (err) {
      console.error("Error al generar PDF de categoría:", err);
      setToast({
        mostrar: true,
        mensaje: "Error al generar el PDF",
        tipo: "error",
      });
    }
  };

  const generarPDFCategorias = () => {
    try {
      if (categorias.length === 0) {
        setToast({
          mostrar: true,
          mensaje: "No hay categorías para exportar",
          tipo: "advertencia",
        });
        return;
      }

      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();

      // Encabezado
      doc.setFontSize(22);
      doc.setFont(undefined, "bold");
      doc.text("Catálogo de Categorías", 14, 20);

      doc.setFontSize(14);
      doc.setFont(undefined, "normal");
      doc.setTextColor(150, 0, 0);
      doc.text("AlasTapas", 14, 28);
      doc.setTextColor(0, 0, 0);

      doc.setDrawColor(200, 0, 0);
      doc.setLineWidth(1);
      doc.line(14, 34, pageWidth - 14, 34);

      doc.setFontSize(9);
      doc.setTextColor(100, 100, 100);
      doc.setFont(undefined, "normal");
      doc.text(
        `Generado: ${new Date().toLocaleDateString("es-ES")} | Total de categorías: ${categorias.length}`,
        14,
        40
      );

      // Preparar datos para la tabla
      const head = [["ID", "Nombre", "Descripción"]];
      const body = categorias.map((cat) => [
        `#${cat.id_categoria}`,
        cat.nombre_categoria || "-",
        cat.descripcion_categoria || "",
      ]);

      // Generar tabla con autotable
      autoTable(doc, {
        startY: 48,
        head: head,
        body: body,
        theme: "grid",
        styles: { fontSize: 9 },
        headStyles: { fillColor: [200, 0, 0], textColor: 255 },
        columnStyles: {
          0: { cellWidth: 20 },
          1: { cellWidth: 70 },
          2: { cellWidth: pageWidth - 14 - 20 - 70 - 16 },
        },
        didDrawPage: (data) => {
          // pie de página en la última página
        },
      });

      // Pie de página
      doc.setFontSize(8);
      doc.setTextColor(150, 150, 150);
      doc.text(
        "Este catálogo fue generado automáticamente por el sistema AlasTapas",
        14,
        pageHeight - 10
      );

      // Descargar PDF
      doc.save("catalogo_categorias_alastapas.pdf");

      setToast({
        mostrar: true,
        mensaje: "PDF generado correctamente",
        tipo: "exito",
      });
    } catch (err) {
      console.error("Error al generar PDF:", err);
      setToast({
        mostrar: true,
        mensaje: "Error al generar el PDF",
        tipo: "error",
      });
    }
  };

  return (

    <Container className="mt-3">
      {/* Título y botón Nueva Categoría */}
      <Row className="align-items-center mb-3">
        <Col className="d-flex align-items-center">
          <h3 className="mb-0">
            <i className="bi-bookmark-plus-fill me-2"></i> Categorías
          </h3>
        </Col>

        <Col xs={12} sm={12} md={12} lg={5} className="text-end d-flex gap-2 justify-content-end mt-2 mt-lg-0">
          <Button 
            onClick={generarPDFCategorias} 
            variant="success" 
            size="md"
            title="Exportar catálogo en PDF"
          >
            <i className="bi-file-pdf"></i>
            <span className="d-none d-sm-inline ms-2">Exportar PDF</span>
          </Button>
          <Button onClick={() => setMostrarModal(true)} size="md">
            <i className="bi-plus-lg"></i>
            <span className="d-none d-sm-inline ms-2">Nueva Categoría</span>
          </Button>
        </Col>
      </Row>

      <hr />

       {/* Cuadro de busqueda */}
      <Row className="mb-4">
        <Col md={6} lg={5}>
          <CuadroBusquedas
            textoBusqueda={textoBusqueda}
            manejarCambioBusqueda={manejarBusqueda}
            placeholder="Buscar por nombre o descripción..."
          />
        </Col>
      </Row>

      {/* Mensaje cuando no se encuentran categorías */}
      {!cargando && textoBusqueda.trim() && categoriasFiltradas.length === 0 && (
          <Row className="mb-4">
            <Col>
              <Alert variant="info" className="text-center">
                <i className="bi-info-circle me-2"></i>
                No se encontraron categorías que coincidan con la búsqueda.
              </Alert>
            </Col>
          </Row>
        )}

      {}
      {!cargando && textoBusqueda.trim() && categoriasFiltradas.length > 0 && (
        <Row>
          <Col xs={12} sm={12} md={12} className="d-lg-none">
            <TarjetaCategoria
              categorias={categoriasPaginadas}
              abrirModalEdicion={abrirModalEdicion}
              abrirModalEliminacion={abrirModalEliminacion}
            />
          </Col>
          <Col lg={12} className="d-none d-lg-block">
            <TablaCategorias
              categorias={categoriasFiltradas}
              abrirModalEdicion={abrirModalEdicion}
              abrirModalEliminacion={abrirModalEliminacion}
              generarPDFCategoria={generarPDFCategoria}
            />
          </Col>
        </Row>
      )}


      {/* Spinner mientras se cargan las categorías */}
      {cargando && (
        <Row className="text-center my-5">
          <Col>
            <Spinner animation="border" variant="success" size="lg" />
            <p className="mt-3 text-muted">Cargando categorías...</p>
          </Col>
        </Row>
      )}

      
        <Col xs={12} sm={12} md={12} className="d-lg-none">
          <TarjetaCategoria
            categorias={categoriasPaginadas}
            abrirModalEdicion={abrirModalEdicion}
            abrirModalEliminacion={abrirModalEliminacion}
          />
        </Col>
      


       {/* Lista de categorías cargadas */}
      {!cargando && !textoBusqueda.trim() && categorias.length > 0 &&  (
        <Row>
          <Col lg={12} className="d-none d-lg-block">
            <TablaCategorias
              categorias={categorias}
              abrirModalEdicion={abrirModalEdicion}
              abrirModalEliminacion={abrirModalEliminacion}
              generarPDFCategoria={generarPDFCategoria}
            />
          </Col>
        </Row>
      )}

       {/* Paginación */}
      {categoriasFiltradas.length > 0 && (
        <Paginacion
          registroPorPagina={registroPorPagina}
          totalRegistros={categoriasFiltradas.length}
          PaginaActual={PaginaActual}
          establecerPaginaActual={establecerPaginaActual}
          establecerRegistroPorPagina={establecerRegistroPorPagina}
        />
      )}

      {/* Modal de Registro */}
      <ModalRegistroCategoria
        mostrarModal={mostrarModal}
        setMostrarModal={setMostrarModal}
        nuevaCategoria={nuevaCategoria}
        manejoCambioInput={manejoCambioInput}
        agregarCategoria={agregarCategoria}
      />

      {/* Modal de Edición */}
      <ModalEdicionCategoria
        mostrarModalEdicion={mostrarModalEdicion}
        setMostrarModalEdicion={setMostrarModalEdicion}
        categoriaEditar={categoriaEditar}
        manejoCambioInputEdicion={manejoCambioInputEdicion}
        actualizarCategoria={actualizarCategoria}
      />

      {/* Modal de Eliminación */}
      <ModalEliminacionCategoria
        mostrarModalEliminacion={mostrarModalEliminacion}
        setMostrarModalEliminacion={setMostrarModalEliminacion}
        eliminarCategoria={eliminarCategoria}
        categoria={categoriaAEliminar}
      />

      {/* Notificación */}
      <NotificacionOperacion
        mostrar={toast.mostrar}
        mensaje={toast.mensaje}
        tipo={toast.tipo}
        onCerrar={() => setToast((prev) => ({ ...prev, mostrar: false }))}
      />
    </Container>
  );
};

export default Categorias;