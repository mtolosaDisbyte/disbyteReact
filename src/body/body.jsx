import React, { useEffect, useState } from "react";
import "./body.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {BsTrash3Fill} from 'react-icons/bs'
import {FaEdit} from 'react-icons/fa'
import {BsInfoCircleFill} from 'react-icons/bs'
import Pagination from 'react-bootstrap/Pagination';
import {
  Table 
} from "reactstrap";

const Body = () => {
  const [colaboradores, setColaboradores] = useState([]);
  const [infoPage, setInfoPage] = useState({});
  const [itemPagination, setItemPagination] = useState([]);
 
    const GetList = (page, url) => { 
        let uri =
            page === null
                ? url : `http://localhost:3001/api/list/?page=${page}`
    fetch(uri)
      .then((response) => response.json())
      .then((data) => {
        setColaboradores(data.data);
        setInfoPage(data.info)
      });
    };

    useEffect(() => {
        GetList(0, null);
    }, []);

    useEffect(() => {
        let items = [];
        for (let i = 1; i <= infoPage.pages; i++) { // Cambiado de infoPage.pages - 1 a infoPage.pages
            items.push(
                <Pagination.Item
                    key={i}
                    onClick={(e) => { GetList(parseInt(e.target.text), null) }}
                >
                    {i}
                </Pagination.Item>)
        }
        setItemPagination(items);
    }, [infoPage])

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
      <div>
        <Pagination>
            <Pagination.Prev onClick={() => GetList(infoPage.prevPage)} />
          {itemPagination.map((colaborador) => {
            return colaborador;
          })}
            <Pagination.Next onClick={() => GetList(infoPage.nextPage)} />
        </Pagination>
      </div>
    </div>
  );
};


export default Body;
