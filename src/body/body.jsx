import React, { useEffect, useState } from "react";
import "./body.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BsTrash3Fill } from 'react-icons/bs'
import { FaEdit } from 'react-icons/fa'
import { BsInfoCircleFill } from 'react-icons/bs'
import Pagination from 'react-bootstrap/Pagination';
import {
  Table
} from "reactstrap";

const Body = () => {
  const [colaboradores, setColaboradores] = useState([]);
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

  return (
    <div className="body-div">
      <Table style={{ width: '65%'}} dark hover>
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
              <td>{colaborador.equipo}</td>
              <td>{colaborador.area}</td>
              <td>{colaborador.puesto}</td>
              <td className="acciones">
                <BsTrash3Fill className='trash'size={18}/>
                <FaEdit className="edit" size={18}/>
                <BsInfoCircleFill className="info" size={18}/>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
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
