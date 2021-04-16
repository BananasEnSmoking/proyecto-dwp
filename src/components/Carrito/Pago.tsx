
import * as React from "react";
import { Card,Row,Col } from 'react-bootstrap'
import { PayPalButton } from "react-paypal-button-v2";
import { Gracias } from "./Gracias";




export const Pago: React.FC =()=>{
    const initialOptions = {
        "client-id": "sb-64lqj5892893@business.example.com",
        currency: "USD",
        intent: "capture",
        "data-client-token": "AWtWHwVp4O79M9LkIBzg7_vkaBtIbKNVIICxvCA-6eDw_zySUcsOLAaExOrvd2qjAd6wNxALIH9uMIOG",
    };
    const [carro,setCarro]= React.useState<any>();
    const [dataCarro,setDataCarro]= React.useState<any>();
    const urlCarrito = 'http://35.167.62.109/storeutags/cart/get_details';
    const urlOrderAdd = 'http://35.167.62.109/storeutags/order/create'
    const [token,setToken]= React.useState<any>({
        "session_id":localStorage.token
      })
    const [detailsP,setDetailsP]= React.useState<any>(null)
    const [order,setOrder]= React.useState<any>({
      "session_id":token,
      "paypal_payment_details":""
    });
  
    



    async function getCarrito() {
        try {
          const body = JSON.stringify(token);
          const response = await fetch(urlCarrito, { method: 'POST', headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            }, body: body});
    
            const res = await response.json();
          if(res.status === "success"){
            setCarro(res.data.items)
            setDataCarro(res.data)
            
          }
            
      } catch (error) {
          console.log(error)
      }
      }

      async function addOrder(details:any) {
        try {
          const body = JSON.stringify({
            "session_id":localStorage.token,
            "paypal_payment_details":details
        });
          const response = await fetch(urlOrderAdd, { method: 'POST', headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            }, body: body});
    
            const res = await response.json();
          if(res.status === "success"){
            console.log('simon')
            console.log(res)
          }
            
      } catch (error) {
          console.log(error)
      }
      }

      React.useEffect(()=>{
        getCarrito()
    },[])

   

    return <React.Fragment>
        {detailsP !== null && detailsP !== undefined?
        <Gracias details={detailsP} />
        :
        <React.Fragment>
        <Card style={{ margin: '.5rem' }}>
            <Card.Title>
              <h2>Resumen de tu pedido</h2>
            </Card.Title>
            <Row>
                <Col>
                <h5>Resumen de productos y servicios</h5>
                <ul>
                {carro !== undefined && carro !== null?carro.map((items:any,index:any)=>{
                  return <li key={index} style={{ listStyle:'none' }}>
                        {items.short_description}
                    </li>
                }):''}
                </ul>
                </Col>
                <Col>
                <h5>Total de tu compra</h5>
                {dataCarro !== undefined && dataCarro !== null?
                 <React.Fragment>
                <p>Sub total: {dataCarro.sub_total}</p>
                <p>IVA: {dataCarro.taxes}</p>
                <p>Total: {dataCarro.total}</p>
                </React.Fragment>
                :''}
                </Col>
                <Col>
                <h5>Opciones de pago</h5>
                {dataCarro !== undefined && dataCarro !== null?
                <PayPalButton
                amount={dataCarro.total.toFixed(2)}
                // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
                
                onSuccess={(details:any, data:any) => {
                  setDetailsP(details)
                  addOrder(details)
                  // OPTIONAL: Call your server to save the transaction
                  return fetch("/paypal-transaction-complete", {
                    method: "post",
                    body: JSON.stringify({
                      orderID: data.orderID
                    })
                  });
                }}
                
                />
                
                :''}
                
              </Col>
            </Row>
        </Card>
        </React.Fragment>
      }
    </React.Fragment>
}