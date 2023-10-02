import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Importa el componente Link
import "./body.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BsTrash3Fill } from 'react-icons/bs'
import { FaEdit } from 'react-icons/fa'
import { BsInfoCircleFill } from 'react-icons/bs'
import Pagination from 'react-bootstrap/Pagination';
import {
  Table,
  Modal,
  Button,
  Form,
} from "react-bootstrap";

const Body = () => {
  const [colaboradores, setColaboradores] = useState([]);
  const [deletingColaborador, setDeletingColaborador] = useState(null); // Estado para almacenar el colaborador que se está eliminando
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false); // Estado para controlar la visibilidad del modal de confirmación
  const [editingColaborador, setEditingColaborador] = useState(null); // Estado para almacenar el colaborador que se está editando
  const [showModal, setShowModal] = useState(false); // Estado para controlar la visibilidad del modal
  const [infoPage, setInfoPage] = useState({});
  const [itemPagination, setItemPagination] = useState([]);
  const [pageSize, setPageSize] = useState(15); // Establece el valor inicial de registros por página
  const [totalColaboradores, setTotalColaboradores] = useState(0); // Nuevo: Inicializa con 0


  const GetList = (page, url) => {
    let uri =
      page === null
        ? url : `http://localhost:3001/api/list/?page=${page}&pageSize=${pageSize}`; // Incluye el tamaño de la página en la solicitud

    fetch(uri)
      .then((response) => response.json())
      .then((data) => {
        setColaboradores(data.data);
        setInfoPage(data.info)
        setTotalColaboradores(data.info.total);
      });
  };

  useEffect(() => {
    GetList(1, null); // Comienza con la primera página al cargar el componente
  }, [pageSize]); // Añade pageSize como dependencia para actualizar cuando cambia

  useEffect(() => {
    let items = [];
    for (let i = 1; i <= infoPage.totalPages; i++) {
      items.push(
        <Pagination.Item
          key={i}
          onClick={(e) => { GetList(parseInt(e.target.text), null) }}
        >
          {i}
        </Pagination.Item>)
    }
    setItemPagination(items);
  }, [infoPage.totalPages, pageSize]); // Añade pageSize como dependencia para actualizar cuando cambia

  const updateColaborador = async (colaboradorToUpdate) => {
    try {
      // Realiza la lógica para actualizar el colaborador en el servidor aquí
      // Puedes usar la URL que ya tienes configurada
      // Asume que el servidor actualiza el colaborador y devuelve una respuesta exitosa
  
      // Actualiza el estado local con los datos actualizados
      const updatedColaboradores = colaboradores.map((colaborador) =>
        colaborador.id === colaboradorToUpdate.id ? colaboradorToUpdate : colaborador
      );
  
      setColaboradores(updatedColaboradores);
      setShowModal(false); // Cierra el modal de edición
    } catch (error) {
      console.error('Error al actualizar el colaborador', error);
    }
  };
  
  
  

  return (
    <div className="body-div">
      <Table style={{ width: '65%'}} variant="dark" hover>
        <thead>
          <tr>
            <th>NOMBRE</th>
            <th>EQUIPO</th>
            <th>AREA</th>
            <th>PUESTO</th>
            <th>ACCIONES</th>
          </tr>
        </thead>
        <tbody>
          {colaboradores?.map((colaborador) => (
            <tr key={colaborador.id}>
              <td>{colaborador.nombre}</td>
              <td>
                {/* Usar Link para hacer que el nombre del equipo sea un enlace */}
                <Link to={`/hardware/${colaborador.equipo}`} style={{ color:'white'}} > {colaborador.equipo} </Link>
              </td>
              <td>{colaborador.area}</td>
              <td>{colaborador.puesto}</td>
              <td className="acciones">
              <BsTrash3Fill
                  className='trash'
                  size={18}
                  onClick={() => {
                    setDeletingColaborador(colaborador); // Al hacer clic en Trash, establece el colaborador a eliminar
                    setShowDeleteConfirmation(true); // Abre el modal de confirmación
                  }}
                />
                <FaEdit
                  className="edit"
                  size={18}
                  onClick={() => {
                    setEditingColaborador(colaborador); // Al hacer clic en Edit, establece el colaborador que se está editando
                    setShowModal(true); // Abre el modal
                  }}
                  />
                <BsInfoCircleFill className="info" size={18}/>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {/* Modal de confirmación de eliminación */}
      <Modal show={showDeleteConfirmation} onHide={() => setShowDeleteConfirmation(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro de que deseas eliminar a {deletingColaborador?.nombre}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteConfirmation(false)}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={() => {
            // Aquí debes implementar la lógica para eliminar al colaborador
            setShowDeleteConfirmation(false); // Cierra el modal de confirmación después de eliminar
          }}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Modal de edición */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Colaborador</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form variant="dark">
          <Form.Group controlId="nombre">
            <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nombre"
                value={editingColaborador?.nombre || ""}
                onChange={(e) => {
                  setEditingColaborador({
                  ...editingColaborador,
                  nombre: e.target.value,
                  });
                }}
            />
          </Form.Group>
            <Form.Group controlId="equipo">
              <Form.Label>Equipo</Form.Label>
              <Form.Control
                type="text"
                placeholder="Equipo"
                value={editingColaborador?.equipo || ""}
                onChange={(e) => {
                  setEditingColaborador({
                    ...editingColaborador,
                    equipo: e.target.value,
                    });                
                  }}
              />
            </Form.Group>
            <Form.Group controlId="area">
              <Form.Label>Area</Form.Label>
              <Form.Control
                type="text"
                placeholder="Area"
                value={editingColaborador?.area || ""}
                onChange={(e) => {
                  setEditingColaborador({
                    ...editingColaborador,
                    area: e.target.value,
                    });
                }}
              />
            </Form.Group>
            <Form.Group controlId="puesto">
              <Form.Label>Puesto</Form.Label>
              <Form.Control
                type="text"
                placeholder="Puesto"
                value={editingColaborador?.puesto || ""}
                onChange={(e) => {
                  setEditingColaborador({
                    ...editingColaborador,
                    puesto: e.target.value,
                    });
                }}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={() => {
            updateColaborador(editingColaborador);            
            setShowModal(false);
          }}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="pagination">
        <Pagination>
          <Pagination.Prev onClick={() => GetList(infoPage.prevPage)} />
          {itemPagination.map((page) => {
            return page;
          })}
          <Pagination.Next onClick={() => GetList(infoPage.nextPage)} />
        </Pagination>
        <div className="lines-per-page">
            {" "}
            <select
              className="selectan"
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
              }}
            >
              {[15, 25, 35, 55, totalColaboradores].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>{" "}
          FILAS POR PAGINA
          </div>
      </div>
    </div>
  );
};

export default Body;