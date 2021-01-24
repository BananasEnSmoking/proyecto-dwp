import * as React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FooterS } from '../../UI/FooterS';

export const Footer: React.FC = () =>{
    return(
        <React.Fragment>
            <FooterS>
            <Container className='footer'>
                <Row>
                {/* Primera columna del Footer */}
                {/* Para modificar los estilos ver archivo src/UI/Footer.tsx */}
                <Col xs={12} md={6} lg={4}>
                    <h4 className="titulo">Titulo 1</h4>
                    <p className="parrafo">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequatur, unde?
                    </p> 
                </Col>
                 {/* Segunda columna del Footer */}
                 <Col xs={12} md={6} lg={4}>
                    <h4 className="titulo">Titulo 2</h4>
                    <p className="parrafo">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequatur, unde?
                    </p>                 </Col>
                 {/* Tercera columna del Footer */}
                <Col xs={12} md={6} lg={4}>
                    <h4 className="titulo">Titulo 3</h4>
                    <p className="parrafo">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequatur, unde?
                    </p> 
                </Col>
                </Row>
                <p className="parrafo derechos">
                    &copy;{new Date().getFullYear()} Bananas en smoking - Todos los derechos reservados
                </p>
            </Container>
            </FooterS>
        </React.Fragment>
    );
}