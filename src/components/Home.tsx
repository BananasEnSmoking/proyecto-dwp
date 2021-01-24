import * as React from "react";
import { Form, Button,Col, Modal } from "react-bootstrap";
import { FormCard } from "../UI/FormCard";

import { PUBLIC_RECAPTCHA_KEY, SECRET_RECAPTCHA_KEY } from "../ReCAPTCHAKeys";

import ReCAPTCHA from "react-google-recaptcha";




export const Home: React.FC = () =>{
    const [robot,setRobot] = React.useState(false);
    const [modalHeader,setModalHeader] = React.useState("");
    const [modalTitle,setModalTitle] = React.useState("");
    const [modalMessage,setModalMessage] = React.useState("");
    const [formData,setFormData] = React.useState({
        "nombre":"",
        "apellidoPaterno":"",
        "apellidoMaterno":"",
        "ciudad":"",
        "estado":"",
        "telefono":"",
        "correo":"",
        "password":"",
        "rePassword":""
    });
    const [token,setToken] = React.useState();

    const reRef:any = React.useRef<ReCAPTCHA>();

    const handleOnChange =(e:any)=>{
        setFormData({
            ...formData,[e.currentTarget.name]:e.currentTarget.value
        })
    }

    async function isHuman(humanKey:string){
        try{
        const respuesta = await fetch(`https://www.google.com/recaptcha/api/siteverify`,{
            method: "POST",
            mode: "cors",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
              },
              body: `secret=${SECRET_RECAPTCHA_KEY}&response=${humanKey}`
            })
            const res = await respuesta.json();
            console.log(res)
            if(!res.success){
                setModalHeader("Robot");
                setModalTitle("Christian Modal Robot");
                setModalMessage("Usted no es una bannana");
                setRobot(true)
            }
            if(res.success){
                setModalHeader("Bannana");
                setModalTitle("Christian Modal Bannana");
                setModalMessage("Enviando su info con la api del profe");
                setRobot(true)
            }
        }catch(e){
            console.log(e)
        }
    }

    const closeRobotModal =()=>{
        setRobot(false)
    }

    const RobotModal =(props:any)=>{
        return (
            <Modal
            {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {modalHeader}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>{modalTitle}</h4>
        <p>
            {modalMessage}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={closeRobotModal}>Close</Button>
      </Modal.Footer>
    </Modal>
        )
    }


    const handleOnSubmit= async (e:React.FormEvent)=> {
        e.preventDefault();
        const tokenF = await reRef.current.getValue(); 
        setToken(tokenF);
        isHuman(tokenF)
        reRef.current.reset();
       
    }

    return (
        <React.Fragment>
            {/**
             * Aqui empieza el modal 
             */}
            
    <RobotModal
        show={robot}
        onHide={() => setRobot(false)}
      />
    {/**
     * Termina modal
     */}
        <FormCard>
            <Form className="form" onSubmitCapture={handleOnSubmit}>
                <Form.Row>
                    <Form.Group as={Col} xs={12} md={6} lg={4}>
                        <Form.Label>
                            Nombre
                        </Form.Label>
                        <Form.Control  name='nombre' onChange={handleOnChange} placeholder="Nombre" required/>
                    </Form.Group>
                    <Form.Group as={Col} xs={12} md={6} lg={4}>
                        <Form.Label>
                            Apellido Paterno
                        </Form.Label>
                        <Form.Control  name='apellidoPaterno' onChange={handleOnChange} placeholder="Apellido paterno" required/>
                    </Form.Group>
                    <Form.Group as={Col} xs={12} md={6} lg={4}>
                        <Form.Label>
                            Apellido Materno
                        </Form.Label>
                        <Form.Control  name='apellidoMaterno' onChange={handleOnChange} placeholder="Apellido materno" required/>
                    </Form.Group>
                </Form.Row>

                <Form.Row>
                    <Form.Group as={Col} xs={12} md={6} lg={4}>
                        <Form.Label>
                            Ciudad
                        </Form.Label>
                        <Form.Control  name='ciudad' onChange={handleOnChange} placeholder="Apellido paterno" required/>
                    </Form.Group>
                    <Form.Group as={Col} xs={12} md={6} lg={4}>
                        <Form.Label>
                            Estado
                        </Form.Label>
                        <Form.Control  name='estado' onChange={handleOnChange} placeholder="Apellido materno" required/>
                    </Form.Group>
                </Form.Row>

                <Form.Row>
                    <Form.Group as={Col} xs={12} md={6} lg={4}>
                        <Form.Label>
                            Telefono
                        </Form.Label>
                        <Form.Control  type="tel" name='telefono' pattern="[\()]?(\+52|52)?[\)]?[ -]*([0-9][ -]*){10}" onChange={handleOnChange} title="Numero de Mexico a 10 digitos puede incluir +52" placeholder="Telefono" required />
                        <Form.Text className="text-muted">
                        Ejemplos: 449 295 45 66  o +52 449 29545 66
                        </Form.Text>
                    </Form.Group>
                    <Form.Group as={Col} xs={12} md={6} lg={4}>
                        <Form.Label>
                            Correo
                        </Form.Label>
                        <Form.Control type="email" name='correo' onChange={handleOnChange} placeholder="Correo electronico" required/>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                <Form.Group as={Col} xs={12} md={6} lg={4}>
                        <Form.Label>
                            Contrasena
                        </Form.Label>
                        <Form.Control type="password" name='password' onChange={handleOnChange} pattern="^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$" placeholder="Contrasena" required/>
                    </Form.Group>
                    <Form.Group as={Col} xs={12} md={6} lg={4}>
                        <Form.Label>
                            Confirmar Contrasena
                        </Form.Label>
                        <Form.Control  type="password" name='rePassword' onChange={handleOnChange} pattern="^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$" placeholder="Contrasena" required/>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                <Form.Group as={Col} xs={12} md={6} lg={4}>
                <Button  variant="primary" type="submit">Enviar</Button>
                </Form.Group>
                <Form.Group as={Col} xs={12} md={6} lg={4}>
                <ReCAPTCHA 
                    sitekey={PUBLIC_RECAPTCHA_KEY}
                    ref={reRef}
                    />
                </Form.Group>
                </Form.Row>
            </Form>
        </FormCard>
        </React.Fragment>
    )
}