import { useEffect, useState } from 'react';
import { zeta_backend } from 'declarations/zeta_backend';
import {Container, Row, Card, Table, Button, Col, Modal, Form } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import Create from './Create';
import CloseButton from 'react-bootstrap/CloseButton';
import "./index.scss";



function App() {
  const[publications, setPub] = useState([]);
  const[pu, setPu] = useState([]);
  const[show, setShow] = useState(false);
  const navigate = useNavigate()
  useEffect(()=> {
    getpost();
  }, []);

  function getpost() {
    Swal.fire("Cargando");
    Swal.showLoading();
    zeta_backend.getAllpost(). then(publications => {
      console.log(publications);
      setPub(publications);
      Swal.close();
    });
  }
  function getpostbytitle(title) {
    Swal.fire("Cargando");
    Swal.showLoading();
    zeta_backend.getPostByTitle(title). then(pu => {
      setPu(pu.shift());
      Swal.close();
      setShow(true);
      
    });
    
  }

  function DeletePost(title) {
    Swal.fire("Borrando");
    Swal.showLoading();
    zeta_backend.deletePost(title). then(() => {
      getpost();
    });
    
  }

  return (
    <div style={{ backgroundColor: 'black', height: '100vh' }}>
     <Container className="gris-fondo">
      <Row className='m-4' >
        <Card className="gris-fondo">
          <Card.Body >
            <Card.Title style={{ color: 'white' }} className="titulo-posts" >ZETA</Card.Title>
            <Card.Subtitle style={{ color: 'white' }} className="subtitulo-posts" >Crea registros facil y rapido</Card.Subtitle>
            <Button className='m-4' variant="outline-info" size="lg" onClick = {()=>navigate ("/newpost")} >Nuevo post</Button>
            <Table striped bordered hover variant="dark" >
              <thead>
                <tr>
                  <th>Titulo</th>
                  <th>Contenido</th>
                  <th>Opciones</th>
                </tr>
              </thead>
              <tbody>
                {
                  publications.length > 0 ?
                  publications.map((pu)=>(
                    <tr>
                      <td>{pu.title}</td>
                      <td>{pu.content}</td>
                      <td>
                        <Row>
                          <Col>
                          <Button variant="outline-primary" onClick={()=>getpostbytitle(pu.title)} >Editar</Button>
                          </Col>
                          <Col>
                          <Button variant="outline-danger" onClick={()=>DeletePost(pu.title)} >Borrar</Button>
                          </Col>
                        </Row>
                      </td>
                    </tr>
                  ))
                  :<tr></tr>
                }

              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Row>

      <Modal show={show} >
        <Modal.Header className='custom-modal2'>
          <Modal.Title >Editar post</Modal.Title>
        </Modal.Header>
        <Modal.Body className='custom-modal3'>
         <Create pTitle={pu.title} pContent={pu.content} isEditable = {true} getpost ={getpost} setShow = {setShow} />
        </Modal.Body>
      </Modal>
     </Container>
    </div>
  );
};

export default App;
