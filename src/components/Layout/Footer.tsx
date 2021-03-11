import * as React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FooterS } from '../../UI/FooterS';
import logo from "../../img logo/isologo/BES 1.png";



export const Footer: React.FC = () =>{
    return(
        <React.Fragment>
            <FooterS>
            <Container className='footer'>
                <Row>
                {/* Primera columna del Footer */}
                {/* Para modificar los estilos ver archivo src/UI/Footer.tsx */}
                <Col xs={12} md={6} lg={4}>
                    <h4 className="titulo">Team</h4>
                    <ul className="parrafo">
                        <li>David</li>
                        <li>Chris</li>
                        <li>Jona</li>
                        <li>Caro</li>
                    </ul>
                </Col>
                 {/* Segunda columna del Footer */}
                 <Col xs={12} md={6} lg={4}>
                    <h4 className="titulo">Desarrollo web Profesional</h4>
                    <p className="parrafo">
                    Profesor: OSCAR VILLAREAL SALAZAR
                    </p>
                    <p className="parrafo">
                    Profesor: JUAN JOSE BALDERAS ARRIAGA
                    </p>
                    </Col>
                 {/* Tercera columna del Footer */}
                <Col xs={12} md={6} lg={4}>
                    <h4 className="titulo">We are BES</h4>
                    <p className="parrafo">
                    <img src={logo} alt=""/>
                    </p> 
                </Col>
                </Row>
                <p className="parrafo derechos">
                    &copy;{new Date().getFullYear()} Bananas en smoking - All rights reserved
                </p>
            </Container>
            </FooterS>
        </React.Fragment>
    );
}