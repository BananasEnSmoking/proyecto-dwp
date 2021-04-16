import * as React from "react";
import { Card, Row, Col, Button, Modal, ModalBody } from "react-bootstrap";
import { useParams } from "react-router";
import { JsxElement } from "typescript";
import ReactDOM from 'react-dom';






export const ProductDetails =()=>{
    const urlItemDetails = 'http://35.167.62.109/storeutags/catalogs/item_details/';
    const urlAddItem = 'http://35.167.62.109/storeutags/cart/add_item'
    const params:any = useParams();
    const [showModal,setShowModal]= React.useState<boolean>(false)
    const itemId:any = params.itemId;
    const [itemDetails,setItemDetails]= React.useState<any>();
    const [item,setItem]= React.useState<any>();
    const [addDetails,setAddDetails]= React.useState({
        "session_id":"",
        "item_id":itemId,
        "item_quantity":1
    });
    const [modalMessage,setModalMessage]= React.useState<any>('');
    const [modalTitle,setModalTitle]= React.useState<any>('');

async function getItemDetails() {
    try {
        const response = await fetch(`${urlItemDetails}${itemId}`,{ method:'GET',headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }})
        const res = await response.json()
        console.log(res)
        if(res.status === 'success'){
            setItem(res.data)
        }
    } catch (error) {
    console.log(error)
    }
}

async function addItemToCart() {
    try {
        const addDetail = JSON.stringify(addDetails);
        const response = await fetch(`${urlAddItem}`,{ method:'POST',headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },body:addDetail})
        const res = await response.json()
        console.log(res)
        if(res.status === 'success'){
            setModalTitle('Exito')
            setModalMessage('Item añadido al carrito!')
            setShowModal(true)
        }else{
            setModalTitle('Error')
            setModalMessage('Error al intentar añadir al carrito')
        }
    } catch (error) {
    console.log(error)
    }
}

const handleOnClickAdd =()=>{
    if(localStorage.token){
        addItemToCart()
    }else{
        setModalTitle('Sesion no iniciada');
        setModalMessage('Debe iniciar sesion para añadir al carrito');
        setShowModal(true);
    }
}

const show =()=>{
}

React.useEffect(()=>{
getItemDetails()
if(localStorage.token){
    setAddDetails({...addDetails,['session_id']:localStorage.token})
}
},[])

const closeModal =()=>{
    setShowModal(false)
}

const handleQuan =(e:any)=>{
setAddDetails({...addDetails,['item_quantity']:e.currentTarget.value})
}


    return <React.Fragment>
        <Modal
        show={showModal}
        size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
        >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    {modalTitle}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {modalMessage}
            </Modal.Body>
            <Modal.Footer>
        <Button onClick={closeModal}>Close</Button>
      </Modal.Footer>
        </Modal>
        <Card style={{ margin: '.5rem' }}>
            <Row>
                <Col xs='2'>
                    <Card>
                    {item !== null && item !== undefined?item.items[0].images_gallery.map((image:any,index:number)=>{
                            return <img key={index} src={image.image} alt="" height={100} width={100} style={{ margin: '.5rem'}}/>
                        }):''}
                    </Card>
                </Col>
                <Col xs='8'>
                {item !== null && item !== undefined?
                    <Card>
                        <Card.Title>
                        {item.items[0].short_description}    
                        </Card.Title> 
                        <Card.Subtitle>
                        {item.items[0].long_description} 
                        </Card.Subtitle>
                        <Card.Img  src={item.items[0].images_gallery[0].image} style={{ width:'400px', height:'400px' }}/>   
                <Card.Body id="hdesc">
                    <p dangerouslySetInnerHTML={{__html: item.items[0].html_details}} />
                </Card.Body>
                </Card>
                :''}
                </Col>
                <Col xs='2'>
                   <Card>
                       {item !== null && item !== undefined?<p>
                       ${item.items[0].price}
                       </p>:''}
                       
                       Cant.
                       <input type="number" style={{ width: '60px'}} value={addDetails.item_quantity}  onChange={handleQuan}></input>
                       <br/> 
                        <Button variant='warning' onClick={handleOnClickAdd}>Agregar al Carrito</Button>
                       <br/>
                       <Button>Comprar ahora</Button>
                   </Card>
                </Col>
            </Row>
        </Card>
    </React.Fragment>
   
}

