import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./hardware.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BsTrash3Fill } from 'react-icons/bs'
import { FaEdit } from 'react-icons/fa'
import {
  Table
} from "reactstrap";

const DetalleHardware = () => {
    const { equipo } = useParams();
    const [hardwareDetalle, setHardwareDetalle] = useState({});

    useEffect(() => {
        // Realiza la solicitud para obtener los detalles del hardware correspondiente
        fetch(`http://localhost:3001/api/hardware/${equipo}`)
          .then((response) => response.json())
          .then((data) => {
            // Actualiza el estado de hardwareDetalle con los datos obtenidos
            setHardwareDetalle(data.data); // Supongamos que los datos de hardware se devuelven en formato JSON
          })
          .catch((error) => {
            console.error("Error al obtener los detalles del hardware:", error);
          });
      }, [equipo]);

    return (
      <div className="body-container">
        <Table style={{ width: '80%' }} dark hover>
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
              <th>BITLOCKER | FILEVAULT</th>
              <th>FIREWALL</th>
              <th>ACCIONES</th>
            </tr>
          </thead>
          <tbody>
            {/* Utiliza hardwareDetalle en lugar de hardware para mapear los detalles */}
            <tr key={hardwareDetalle.equipo}>
              <td>{hardwareDetalle.equipo}</td>
              <td>{hardwareDetalle.marca}</td>
              <td>{hardwareDetalle.modelo}</td>
              <td>{hardwareDetalle.procesador}</td>
              <td>{hardwareDetalle.ram}</td>
              <td>{hardwareDetalle.mac_wifi}</td>
              <td>{hardwareDetalle.mac_ethernet}</td>
              <td>{hardwareDetalle.version_win_os}</td>
              <td>{hardwareDetalle.version}</td>
              <td>{hardwareDetalle.bitlocker_filevault}</td>
              <td>{hardwareDetalle.firewall}</td>
              <td className="acciones">
                <BsTrash3Fill className='trash' size={18} />
                <FaEdit className="edit" size={18} />
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    );
};

export default DetalleHardware;
