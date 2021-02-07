import * as React from 'react';
import { useHistory } from "react-router-dom";
import { Form,Col,Button } from 'react-bootstrap';
import { FormCard } from '../../UI/FormCard';
import { Link } from "react-router-dom";
export const ForgotPassword: React.FC = () =>{
    let history = useHistory();
    var urlApiRequestRecovery = 'http://35.167.62.109/storeutags/security/request_recovery_code';
    const [formData,setFormData] = React.useState({
        "email": ""
    });

    async function requestRecovery() {
        try {
            const body = JSON.stringify(formData);
            const response = await fetch(urlApiRequestRecovery,{method:'POST', headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },body:body});
            const res = await response.json();
            console.log(res.status)
        } catch (error) {
            console.log(error)
        }
    }

    const  handleOnSubmit = async(e:React.FormEvent)=>{
        e.preventDefault();
        requestRecovery();
        history.push(`/recoveryPsw/${formData.email}`);
    }

    const handleOnChange = (e:any)=>{
        setFormData({
            ...formData,[e.currentTarget.name]:e.currentTarget.value
        });
        console.log(formData)
    }


    return(
       <React.Fragment>
           <FormCard>
               <Form  className="form" onSubmitCapture={handleOnSubmit}>
               <Form.Row className="justify-content-md-center">
                        <Form.Group>
                            <h1>Forgot your password?</h1>
                        </Form.Group>
                </Form.Row>
                <Form.Row className="justify-content-md-center">
                        <p>
                        don't have an account?&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Link to="/createAccount">Create Account</Link>
                        </p>
                </Form.Row>
                <Form.Row className="justify-content-md-center">
                    <Form.Group as={Col} xs={12} md={6} lg={4}>
                        <Form.Label>
                        Enter your username
                        </Form.Label>
                        <Form.Control  name='email' placeholder="user name" onChange={handleOnChange} required/>
                    </Form.Group>
                </Form.Row>
                <Form.Row className="justify-content-md-center">
                    <Form.Group as={Col} xs={12} md={6} lg={4}>
                        <Button block variant="primary" type="submit">Submit</Button>
                </Form.Group>
                </Form.Row>
               </Form>
           </FormCard>
       </React.Fragment>
    )
}