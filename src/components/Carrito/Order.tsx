import * as React from "react";
import { Card, ListGroup, ListGroupItem, Table } from "react-bootstrap";



export const Order:React.FC=()=>{
    const urlOrders = "http://35.167.62.109/storeutags/order/get_orders"
    const [orders,setOrders]=React.useState<any>(null);
    const [token,setToken]= React.useState<any>({
        "session_id":localStorage.token
      })

    
    async function getCarrito() {
        try {
          const body = JSON.stringify(token);
          const response = await fetch(urlOrders, { method: 'POST', headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            }, body: body});
    
            const res = await response.json();
          if(res.status === "success"){
              console.log(res)
            setOrders(res.data.orders)
           
          }
            
      } catch (error) {
          console.log(error)
      }
      }

    React.useEffect(()=>{
        getCarrito()
    },[])

    const fechaFormat=(fe:any)=>{
        const date = new Date(fe)
        const fecha = date.toISOString().slice(0,10);
        const horas = date.getHours();
        const minutos = date.getMinutes();
        return `${fecha} a las ${horas}:${minutos} horas`
    }
    return <React.Fragment>
        <Card>

       <h1>Historial de pedidos</h1>
       <Table striped bordered hover>
       <thead>
    <tr>
      <th>Fecha de compra</th>
      <th>Total</th>
      <th>Metodo de pago</th>
      <th>Estatus</th>
      <th>Pedido</th>
    </tr>
  </thead>
  <tbody>

           {orders !== null && orders !== undefined?
           orders.map((order:any,index:any)=>{
               return <tr key={index}>
                   <td>{fechaFormat(order.date_order)}</td>
                   <td>${order.total}</td>
                   <td>paypal</td>
                   <td>{order.status}</td>
                   <td>{order.paypal_order_id}</td>       
               </tr>
           })
           :''}
           </tbody>
       </Table>
       {orders !== null && orders !== undefined?`${orders.length} Pedidos encontrados`:''}
           </Card>
    </React.Fragment>
}