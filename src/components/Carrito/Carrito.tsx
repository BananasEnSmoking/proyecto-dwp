import React, * as react from "react";
import { Card,Row,Col, Button, InputGroup, Form,Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";




export const Carrito:React.FC=()=>{
    let history = useHistory();
    const [carro,setCarro]= React.useState<any>();
    const urlCarrito = 'http://35.167.62.109/storeutags/cart/get_details';
    const urlUpdate = "http://35.167.62.109/storeutags/cart/update_item";
    const urlDelete = "http://35.167.62.109/storeutags/cart/remove_item";
    const [robot,setRobot] = React.useState(false);
    const [upd,setUpd]= React.useState(false);
    const [confirm,setConfirm]= React.useState<boolean>(false);
    const [token,setToken]= React.useState<any>({
        "session_id":localStorage.token
      })
      const [dataCarro,setDataCarro]= React.useState<any>();
      const [dataUpdate,setDataUpdate]= React.useState<any>({
          "session_id":localStorage.token,
          "item_id":"",
          "item_quantity":""
      });
      const [nums,setNums]= React.useState<any>({

      })

    async function getCarrito() {
        try {
          const body = JSON.stringify(token);
          const response = await fetch(urlCarrito, { method: 'POST', headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            }, body: body});
    
            const res = await response.json();
            console.log(res)
          if(res.status === "success"){
            setCarro(res.data.items)
            setDataCarro(res.data)
          }
            
      } catch (error) {
          console.log(error)
      }
      }

      async function update() {
              try {
                const body = JSON.stringify(dataUpdate);
                const response = await fetch(urlUpdate, { method: 'PUT', headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                  }, body: body});
          
                  const res = await response.json();
                if(res.status === "success"){
                  if(upd){
                      setUpd(false)
                  }else{
                      setUpd(true)
                  }
                  
                }
                  
            } catch (error) {
                console.log(error)
            }   
      }

      async function deleteIt() {
        try {
            const body = JSON.stringify(dataUpdate);
            const response = await fetch(urlDelete, { method: 'DELETE', headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              }, body: body});
              console.log(response)
              const res = await response.json();
            if(res.status === "success"){
              if(upd){
                  setUpd(false)
              }else{
                  setUpd(true)
              }
              
            }
              
        } catch (error) {
            console.log(error)
        }
          
      }


      async function eliminar(item:any) {
        try {
            const body = JSON.stringify({
                "session_id":localStorage.token,
          "item_id":item,
            });
            const response = await fetch(urlDelete, { method: 'DELETE', headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              }, body: body});
              console.log(response)
              const res = await response.json();
            if(res.status === "success"){
              if(upd){
                  setUpd(false)
              }else{
                  setUpd(true)
              }
              
            }
              
        } catch (error) {
            console.log(error)
        }
          
      }

const handleOnChangeNum =(e:any)=>{
setDataUpdate({...dataUpdate,['item_quantity']:e.currentTarget.value})
}

const closeRobotModal =()=>{
    setRobot(false)
}

const act=(id:any)=>{
    setDataUpdate({...dataUpdate,['item_id']:id})
    setRobot(true)
}

const handleOnConfirm =()=>{
        console.log(dataUpdate.item_quantity)
    if(dataUpdate.item_quantity !== 0){
        update()
    }
    if(dataUpdate.item_quantity == 0){
console.log('borrar')
deleteIt()

    }
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
    </Modal.Title>
  </Modal.Header>
  <Modal.Body>
   Deseas cambiar la cantidad de este articulo en el carrito?
  </Modal.Body>
  <Modal.Footer>
    <Button onClick={closeRobotModal}>Close</Button>
    <Button onClick={handleOnConfirm}>confirm</Button>
  </Modal.Footer>
</Modal>
    )
}
     

      React.useEffect(()=>{
          getCarrito()
      },[upd])

      const procederPago =()=>{
        history.push(`/pago`);

         }

         

    return(
        <React.Fragment>
            <RobotModal
        show={robot}
        onHide={() => setRobot(false)}
      />
            <Card>
            <Row>
                <Col xs='2'>
                    <Card>
                        {dataCarro !== null && dataCarro !== undefined?
                        <Card>
                            <Card.Title> Resumen de tu carrito </Card.Title>
                            <p>Sub total: {dataCarro.sub_total}</p>
                            <p>IVA: {dataCarro.taxes}</p>
                            <p>Total: {dataCarro.total}</p>
                            <Button type="primary" onClick={procederPago}>Proceder al pago</Button>
                        </Card>
                        :''}
                    </Card>
                </Col>
                <Col>
                    <Card>
                        <Row>
                        {carro !== null && carro !== undefined?carro.map((items:any,index:any)=>{
                            return <Col  key={index} lg={6} xs={12}>
                            <Card  style={{ width: '27rem', margin:".5rem" }}>
                                <Card.Title>{items.short_description}</Card.Title>
                                <Card.Img variant="top" src={items.images_small} />
                                <Card.Body>
                                    <Row>
                                        <Col>
                                        <p>P. Unitario: {items.price}</p>
                                        <p>Cantidad: {items.quantity} <input type="number" onChange={handleOnChangeNum} min={0} defaultValue={0} name={items.product_id}/></p>
                                        <Button onClick={()=>act(items.product_id)}>Actualizar</Button>
                                        
                                        <Button style={{ margin:"5px" }} variant="danger" onClick={()=>eliminar(items.product_id)}>Eliminar</Button>
                                        <p>SubTotal: {items.sub_total}</p>
                                        </Col>
                                        <Col>
                                        {items.long_description}
                                        </Col>
                                    </Row>
                                </Card.Body>
                                </Card>
                                </Col>
                        }):''}
                         </Row>
                    </Card>
                </Col>
            </Row>
            </Card> 
        </React.Fragment>
    )
}