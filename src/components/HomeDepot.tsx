import * as React from "react";
import { Button } from "react-bootstrap";

export const HomeDepot: React.FC =()=>{
    const cerrar =()=>{
        localStorage.clear()
    }
    return(
        <React.Fragment>
           <Button onClick={cerrar}>
               Cerrar sesión
           </Button>
        </React.Fragment>
    )
}