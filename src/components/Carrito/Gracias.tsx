import * as React from "react";
import { Card,Row,Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ProductDetails } from "../Productos/ProductDetails";

export interface Props{
details:any
}



export const Gracias:React.FC<Props>=(props)=>{
    React.useEffect(()=>{
        console.log(props.details)
    },[])
    
    const dateP = props.details.create_time;
    const NoP = props.details.id;
    const amountP = props.details.purchase_units[0].amount.value;

    const fechaFormat=(fe:any)=>{
        const date = new Date(fe)
        const fecha = date.toISOString().slice(0,10);
        const horas = date.getHours();
        const minutos = date.getMinutes();
        return `${fecha} a las ${horas}:${minutos} horas`
    }
    return <React.Fragment>
        <Card style={{ textAlign:"center" }} >
            <h1>Gracias por tu Compra!</h1>
            <p>En breve te enviaremos un correo con los detalles de tu compra e instrucciones para la activacion de tus productos y/o servicios</p>
            <br/>
            <p>fecha y hora de pago: {fechaFormat(dateP)}</p>
            <p>No. de Pedido: {NoP}</p>
            <p>Monto del pago: ${amountP}</p>
                
            <Row>
                <Col >
              <Link to="/">
              Seguir comprando
              </Link>  
                </Col>
                <Col>
                <Link to="/order">
                Ver mis pedidos
                </Link>
                </Col>
            </Row>
            <br/>
        </Card>
    </React.Fragment>
}