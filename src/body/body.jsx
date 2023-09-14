import { React, useEffect, useState} from "react";
import './body.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Table, Button, Container, Modal, ModalBody, ModalHeader, formGroup, ModalFooter} from 'reactstrap'

const Body=()=>{
    const [colaboradores, setColaboradores] = useState([])
        
            useEffect(() => {
                fetch("http://localhost:3001/api/list")
                    .then((response) => response.json())
                    .then((data) => {
                        setColaboradores(data.data);
                      })
            }, []);
    return (
        <div className="body-div">
            
            <ul className='body-ul'>
            {colaboradores?.map((colaborador) => (
                <li key={colaborador.id}>{colaborador.nombre}</li>
            ))}
            </ul>
            <ul className='body-ul'>
                {colaboradores?.map((colaborador) => (
                    <li key={colaborador.id}>{colaborador.equipo}</li>
                ))}
            </ul>
            <ul className='body-ul'>
                {colaboradores?.map((colaborador) => (
                    <li key={colaborador.id}>{colaborador.area}</li>
                ))}
            </ul>
            <ul className='body-ul'>
                {colaboradores?.map((colaborador) => (
                    <li key={colaborador.id}>{colaborador.puesto}</li>
                ))}
            </ul>
        </div>
    )
}

export default Body;