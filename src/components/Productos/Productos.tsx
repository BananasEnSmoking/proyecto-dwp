import React, * as react from "react";
import { Card, Row, Col, InputGroup,Form,FormControl,Button, FormGroup } from "react-bootstrap";
import { Link } from "react-router-dom";


export const Productos:React.FC=()=>{
    const urlCategories="http://35.167.62.109/storeutags/catalogs/categories";
    const urlByText="http://35.167.62.109/storeutags/catalogs/items/by_text/";
    const urlByCategories="http://35.167.62.109/storeutags/catalogs/items/by_category/" 

    const [busqueda,setBusqueda]= React.useState<any>();
    
    const [items,setItems]= React.useState<any>(null)

    const [categories,setCategories]=React.useState<any>(null)

    const [checkCategories,setCheckCategories]= React.useState<any>()

    async function getCategories() {
        //Funcion asincrona, await para esperar la respuesta
        //Funcion fetch 
       
        try {
            const response = await fetch(urlCategories,{ method:'GET', headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }});
            const res = await response.json()
            if(response.status === 200 && res.data.categories){
                setCategories(res.data.categories)
                console.log(res.data.categories)
            }
        } catch (error) {
            console.log(error)
        }
    }
    
    async function getItemsByText() {
        try {
            const response = await fetch(`${urlByText}${busqueda}`,{method:'GET' , headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }})
            const res = await response.json()
            console.log(res.data)
            if(res.data !== undefined)
            setItems(res.data.items)
            else setItems(null)
        } catch (error) {
            console.log(error)
        }
    }

    async function getItemsByCategorie() {
        
        
    let chain:any=""; 
    if(checkCategories){
        Object.entries(checkCategories).map(([catego,check],index:number)=>{
            if(check){   
                    chain = `${chain};${catego}`
            }
        })
    }
        try {
            const response = await fetch(`${urlByCategories}${chain}`,{method:'GET' , headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }})
            const res = await response.json()
            setItems(res.data.items)
            console.log(res.data.items)
        } catch (error) {
            console.log(error)
        }
        
    }

    const handleOnCheck =(e:any)=>{
        setCheckCategories({...checkCategories,[e.currentTarget.name]:e.currentTarget.checked});
    }


    const handleOnClickSearch =()=>{
        getItemsByText()
    }

    const handleOnChange =(e:any)=>{
        setBusqueda(e.currentTarget.value)
    }

    React.useEffect(()=>{
        getCategories()
    },[])

    React.useEffect(()=>{
        getItemsByCategorie()
    },[checkCategories])

    return(
        <React.Fragment>
        <Form style={{ margin: '1rem' }}> 
        <FormGroup>
            <Row>
                <Col>
         <FormControl type="text" name='busqueda' onChange={handleOnChange} placeholder="do you want a banana?" className="mr-sm-2" />
                </Col>
                <Col>
         <Button variant="outline-info" onClick={handleOnClickSearch}>Search</Button>
                </Col>
                <Col>
                {items !== undefined && items !== null?`${items.length} Resultados encontrados`:'0 resultados encontrados'}
                </Col>
            </Row>
        </FormGroup>
       </Form>
            <Card style={{ margin: '1rem' }}>
                <Row>
                    <Col xs='2'> 
                        <Card >
                            <Card.Body style={{ height:'10rem'}}>
                                {categories !== null && categories !== undefined?categories.map((catego:any,index:number)=>{
                                    return <InputGroup key={index}  >
                                    <InputGroup.Checkbox name={catego.description} onChange={handleOnCheck} value=""/>&nbsp;&nbsp;
                                    {catego.description}
                                    </InputGroup>
                                    
                                }):''}
                        </Card.Body>
                        </Card>
                    </Col>
                    <Col xs='9'>
                    <Card>
                        <Row>
                        {items !== undefined && items !== null?items.map((item:any,index:number)=>{
                            return <Col  key={index} lg={6} xs={12}>
                           <Card style={{ width: '22rem', margin:".5rem" }} >
                           <Card.Img variant="top" src={item.images_small} />
                           <Card.Body>
                             <Card.Title><Link to={`/ProductDetails/${item.product_id}`}>{item.short_description}</Link></Card.Title>
                             <Card.Text>
                               {item.long_description}
                             </Card.Text>
                             <h3>$ {item.price}</h3>
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