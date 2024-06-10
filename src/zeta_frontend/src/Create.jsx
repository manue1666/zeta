import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { useState } from 'react';
import Swal from 'sweetalert2';
import { zeta_backend } from 'declarations/zeta_backend';
import { useNavigate } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import "./index.scss";


const Create = (
  {
    pTitle = null,
    pContent = null,
    isEditable = null,
    getpost =null,
    setShow = null
  }

) => {
  const [title, setTitle] = useState (pTitle ? pTitle:"");
  const [content, setContent] = useState(pContent ? pContent:"");
  const navigate = useNavigate()

  const onChangeTitle = (e)=> {
    e.preventDefault();
    const preTitle = e.target.value;
    setTitle(preTitle);
  }

  const onChangeContent = (e)=> {
    e.preventDefault();
    const preContent = e.target.value;
    setContent(preContent);
  }

  function addpost() {
    Swal.fire("Procesando :-)");
    Swal.showLoading();
    zeta_backend.addPost(title, content). then(() => {
      Swal.fire({
        icon: "success",
        title: "Se guardo con exito",
        showConfirmButton: false,
        timer: 1500
      }).then(() => navigate("/"))
    }).catch(( err )=>{
      Swal.fire({
        icon: "error",
        title: "No guardo",
      });
      console.log("error", err)
    })
  };

  function updatepost() {
    Swal.fire("Procesando :-)");
    Swal.showLoading();
    zeta_backend.updatePost(title, content). then(() => {
      Swal.fire({
        icon: "success",
        title: "Se guardo con exito",
        showConfirmButton: false,
        timer: 1500
      }).then(() => {
        setShow(false);
        getpost();
      })
    }).catch(( err )=>{
      Swal.fire({
        icon: "error",
        title: "No guardo",
      });
      console.log("error", err)
    })
  }

  return (
    <div className='custom-modal' >
     <Form>
      <Card.Title>{isEditable ? "Editar" : "Agregar"} Post </Card.Title>
      <Form.Group className="mb-3">
        <Form.Label className='subtitulo-posts'>Ingresa un titulo</Form.Label>
        <Form.Control defaultValue={title} name = "title" onChange = {onChangeTitle} type="text" placeholder="titulo aqui" />
        <Form.Text className="text-muted">
          ingresa un titulo unico
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label className='subtitulo-posts'>Ingresa un texto</Form.Label>
        <Form.Control defaultValue={content} name = "content" onChange = {onChangeContent} as="textarea" placeholder="contenido aqui" />
      </Form.Group>

     
      <Button variant="outline-info" size="lg" onClick={isEditable ? updatepost : addpost} >
        {isEditable ? "Editar" : "Guardar"}
        Post
      </Button>
     </Form>
    </div>
  );
}

export default Create;