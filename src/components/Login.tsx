import * as React from "react";
import { Form,Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FormCard } from "../UI/FormCard";

export const Login: React.FC = () =>{

   const  handleOnSubmit =()=>{

    }

    return (
        <React.Fragment>
            <FormCard>
                <Form className="form" onSubmitCapture={handleOnSubmit} >
                    <Form.Row className="justify-content-md-center">
                        <Form.Group>
                            <h1>Log in to your account</h1>
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
                            Account
                        </Form.Label>
                        <Form.Control  name='user' placeholder="account" required/>
                    </Form.Group>
                </Form.Row>
                <Form.Row className="justify-content-md-center">
                    <Form.Group as={Col} xs={12} md={6} lg={4}>
                        <Form.Label>
                            Password
                        </Form.Label>
                        <Form.Control  name='password'   placeholder="password" required/>
                    </Form.Group>
                </Form.Row>
                <Form.Row className="justify-content-md-center">
                    <Form.Group as={Col} xs={12} md={6} lg={4}>
                        <Form.Check type="checkbox" label="Remember me" />
                    </Form.Group>
                </Form.Row>
                <Form.Row className="justify-content-md-center">
                    <Form.Group>
                    <Link to="/forgotPsw">forgot your password?</Link>
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