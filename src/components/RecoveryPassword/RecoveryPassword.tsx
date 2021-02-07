import * as React from 'react';
import { useHistory } from "react-router-dom";
import { FormCard } from '../../UI/FormCard';
import { Form,Col,Button } from 'react-bootstrap';
import { Link,useParams } from "react-router-dom";


export const RecoveryPassword: React.FC = () =>{
    var urlApiValidate = "http://35.167.62.109/storeutags/security/validate_recovery_code";
    var urlApiUpdatePassword = "http://35.167.62.109/storeutags/security/update_password ";

    let history = useHistory();
    const params:any = useParams();
    const email:any = params.email;

    const [formData,setFormData] = React.useState({
        "email":email,
        "recovery_code": "",
        "password":"",
        "password_confirmation":"",
    });
    const [codeOk,setCodeOk] = React.useState(false);
    const [continueOk,setContinueOk] = React.useState(false);
    const [enableCode,setEnableCode] = React.useState(true);

    const handleOnSubmit =(e:React.FormEvent)=>{
        e.preventDefault();
        if(formData.password === formData.password_confirmation){
            updatePassword();
        }else{
            console.log("el password debe ser igual")
        }
    }

    const handelOnClickContinue =()=>{
        setEnableCode(false);
        setContinueOk(true);
    }

    async function updatePassword() {
        try {
            const body = JSON.stringify(formData);
            const response = await fetch(urlApiUpdatePassword, { method: 'POST', headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              }, body: body});
              const jres = await response.json()
              console.log(jres.status)
              if(jres.status === "success"){
                history.push(`/login`);
              }else{
                  console.log("Error al cambiar password")
              }
        } catch (error) {
            console.log(error)
        }
    }

    async function validateRecovery(){
        try {
            const body = JSON.stringify(formData);
            const response = await fetch(urlApiValidate, { method: 'POST', headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              }, body: body});
              const jres = await response.json()
              console.log(jres.status)
              if(jres.status === "success"){
                  setCodeOk(true)
              }else{
                  setCodeOk(false)
              }
        } catch (error) {
            console.log(error)
        }
    }

    const handleOnChange =(e:any)=>{
        setFormData({...formData,[e.currentTarget.name]:e.currentTarget.value})
    }


    React.useEffect(()=>{
        validateRecovery()
  },[formData.recovery_code])// eslint-disable-line react-hooks/exhaustive-deps


    return(
        <React.Fragment>
            <FormCard>
            <Form  className="form" onSubmitCapture={handleOnSubmit}>
            <Form.Row className="justify-content-md-center">
                        <Form.Group>
                            <h1>Change Password</h1>
                        </Form.Group>
                    </Form.Row>
                <Form.Row className="justify-content-md-center">
                        <p>
                        don't have an account?&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Link to="/createAccount">Create Account</Link>
                        </p>
                </Form.Row>
                <Form.Row className="justify-content-md-center">
                    <Form.Group as={Col} xs={12} md={6} lg={4}>
                    {enableCode === true?<Form.Control  name='recovery_code' onChange={handleOnChange} placeholder="Code" required/>:<Form.Control  name='recovery_code' onChange={handleOnChange} placeholder="Code" disabled/>}
                    </Form.Group>
                </Form.Row>
                <Form.Row className="justify-content-md-center">

                <Form.Group as={Col} xs={12} md={6} lg={4}>
                        {codeOk === true?<Button block variant="primary" onClick={handelOnClickContinue}>Continue</Button>:<Button block disabled variant="primary" type="submit">Continue</Button>}
                </Form.Group>

                </Form.Row>
                {continueOk === true?
                <React.Fragment>
                <Form.Row className="justify-content-md-center">
                    <Form.Group as={Col} xs={12} md={6} lg={4}>
                    <Form.Control  name='password' onChange={handleOnChange} type="password" pattern="^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$" placeholder="new password" required/>
                    </Form.Group>
                </Form.Row>
                <Form.Row className="justify-content-md-center">
                    <Form.Group as={Col} xs={12} md={6} lg={4}>
                    <Form.Control  name='password_confirmation' onChange={handleOnChange} type="password" pattern="^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$" placeholder="confirmation password" required/>
                    </Form.Group>
                </Form.Row>
                <Form.Row className="justify-content-md-center">
                    <Form.Group as={Col} xs={12} md={6} lg={4}>
                        <Button block variant="primary" type="submit">Save Password</Button>
                </Form.Group>
                </Form.Row>
                </React.Fragment>:
                ""}
                </Form>
            </FormCard>
        </React.Fragment>
    );
}