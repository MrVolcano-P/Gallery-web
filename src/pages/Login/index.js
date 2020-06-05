import React from 'react'
import styled from 'styled-components'
import { Formik, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { login, getProfile } from '../../api/gallery';
import { setAuthToken } from '../../action/authToken'
import { useHistory, Link } from 'react-router-dom'
import { setProfile } from '../../action/profile'
import {
    SubmitButton,
    Input,
    Checkbox,
    ResetButton,
    FormikDebug,
    Form,
    FormItem,
} from "formik-antd"
import { message, Button, Row, Col, Typography, Alert } from "antd"
import { Error, Success } from '../../components/Message'
const ButtonClick = styled(SubmitButton)`
    background-color: #942A96 !important;
    color: #fff !important;
    font-family: Roboto;
    font-weight: 700;
    &&:hover{
        background-color: #872589 !important;
    }
`

const SignupSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email')
        .required('This field is required.'),
    password: Yup.string()
        .min(3, 'Please Enter less then 3 letters')
        .required('This field is required.'),
});
export default () => {
    const dispatch = useDispatch()
    const history = useHistory();
    const SetProfile = (token) => {
        getProfile(token)
            .then(res => {
                console.log(res.data)
                dispatch(setProfile(res.data))
                history.push("/")
                Success('Welcome')
            })
            .catch(err => {
                console.log(err)
            })
    }
    return (
        <Row justify='center' >
            <Col span={8} flex='1'>
                <Formik
                    initialValues={{
                        email: "",
                        password: "",
                    }}
                    onSubmit={(values, actions) => {
                        login(values)
                            .then(res => {
                                dispatch(setAuthToken(res.data.token))
                                SetProfile(res.data.token)
                            })
                            .catch(err => {
                                Error('Username or Password not Correct')
                            })
                        actions.resetForm()
                    }}
                    validationSchema={SignupSchema}
                    render={() => (
                        <Form
                            style={{ marginTop: '25%' }}
                            layout='vertical'
                        >
                            <div style={{ background: "white", padding: 40, flex: 1 }}>
                                <Typography.Title>Login</Typography.Title>
                                <FormItem
                                    name="email"
                                    label="Email"
                                    required={true}
                                    hasFeedback={true}
                                    showValidateSuccess={true}
                                >
                                    <Input name="email" placeholder="Email" />
                                </FormItem>
                                <FormItem
                                    name="password"
                                    label="Password"
                                    required={true}
                                    hasFeedback={true}
                                    showValidateSuccess={true}
                                >
                                    <Input.Password name="password" placeholder="Password" />
                                </FormItem>
                                <Row style={{ marginTop: 60 }}>
                                    <Col offset={8}>
                                        <Button.Group>
                                            <ResetButton>Reset</ResetButton>&nbsp;
                                            <ButtonClick>Submit</ButtonClick>
                                        </Button.Group>
                                    </Col>
                                    <Col offset={8}>
                                        <Link to='/signup'>
                                            <Typography.Text>Not have an Account ?</Typography.Text>
                                        </Link>

                                    </Col>
                                </Row>
                            </div>
                        </Form>
                    )}
                />
            </Col>
        </Row>
    );
}

