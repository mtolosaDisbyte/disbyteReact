import React, { useEffect, useState } from "react";
import "./hardware.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BsTrash3Fill } from 'react-icons/bs'
import { FaEdit } from 'react-icons/fa'
import { BsInfoCircleFill } from 'react-icons/bs'
import Pagination from 'react-bootstrap/Pagination';
import {
  Table
} from "reactstrap";

const Hardware = () => {
    const [hardware, setHardware] = useState([]);
    const [infoPage, setInfoPage] = useState({});
    const [itemPagination, setItemPagination] = useState([]);
    const [pageSize, setPageSize] = useState(15); // Establece el valor inicial de registros por página
    const [totalColaboradores, setTotalColaboradores] = useState(0); // Nuevo: Inicializa con 0
 
    const GetList = (page, url) => { 
        let uri =
            page === null
                ? url : `http://localhost:3001/api/listH/?page=${page}`
    fetch(uri)
      .then((response) => response.json())
      .then((data) => {
        setHardware(data.data);
        setInfoPage(data.info);
        setTotalColaboradores(data.info.total);

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
            <th>EQUIPO</th>
            <th>MARCA</th>
            <th>MODELO</th>
            <th>PROCESADOR</th>
            <th>RAM</th>
            <th>MAC WIFI</th>
            <th>MAC ETHETNET</th>
            <th>WIN/OS</th>
            <th>VERSION</th>
            <th>BITLOCKER |
              FILEVAULT</th>
            <th>FIREWALL</th>
            <th>ACCIONES</th>
          </tr>
        </thead>
        <tbody>
          {hardware?.map((hardware) => (
            <tr key={hardware.equipo}>
              <td>{hardware.equipo}</td>
              <td>{hardware.marca}</td>
              <td>{hardware.modelo}</td>
              <td>{hardware.procesador}</td>
              <td>{hardware.ram}</td>
              <td>{hardware.mac_wifi}</td>
              <td>{hardware.mac_ethernet}</td>
              <td>{hardware.version_win_os}</td>
              <td>{hardware.version}</td>
              <td>{hardware.bitlocker_filevault}</td>
              <td>{hardware.firewall}</td>
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

export default Hardware;