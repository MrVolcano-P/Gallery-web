import React from 'react'
import styled from 'styled-components'
import { Formik, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { login, getProfile, signup } from '../../api/gallery';
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
import { message, Button, Row, Col, Typography } from "antd"
import { Success } from '../../components/Message'
const ButtonClick = styled(SubmitButton)`
    background-color: #942A96 !important;
    color: #fff !important;
    font-family: Roboto;
    font-weight: 700;
    &&:hover{
        background-color: #872589 !important;
    }
`

const RegisterSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('This field is required.'),
    email: Yup.string()
        .email('Invalid email')
        .required('This field is required.'),
    password: Yup.string()
        .min(3, 'Please Enter less then 3 letters')
        .required('This field is required.'),
    confirmPassword: Yup.string()
        .min(3, 'Please Enter less then 3 letters')
        .required('This field is required.')
        //check is password match ?
        .test('passwords-match', 'Password not match.', function (value) {
            return this.parent.password === value;
        }),
});

export default () => {
    const history = useHistory();
    const dispatch = useDispatch()
    const SetProfile = (token) => {
        getProfile(token)
            .then(res => {
                dispatch(setProfile(res.data))
                history.push("/")
                Success('Welcome')
            })
            .catch(err => console.log(err))
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
                        signup(values).then(res => {
                            login({ Email: values.email, Password: values.password })
                                .then(res => {
                                    dispatch(setAuthToken(res.data.token))
                                    SetProfile(res.data.token)
                                })
                                .catch(err => console.log(err))
                        }).catch(err => console.log(err))
                        actions.resetForm()
                    }}
                    validationSchema={RegisterSchema}
                    render={() => (
                        <Form
                            style={{ marginTop: '8%' }}
                            layout='vertical'
                        >
                            <div style={{ background: "white", padding: 40, flex: 1 }}>
                                <Typography.Title>SignUp</Typography.Title>
                                <FormItem
                                    name="name"
                                    label="Name"
                                    required={true}
                                    hasFeedback={true}
                                    showValidateSuccess={true}
                                >
                                    <Input name="name" placeholder="Name" />
                                </FormItem>
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
                                <FormItem
                                    name="confirmPassword"
                                    label="ConfirmPassword"
                                    required={true}
                                    hasFeedback={true}
                                    showValidateSuccess={true}
                                >
                                    <Input.Password name="confirmPassword" placeholder="ConfirmPassword" />
                                </FormItem>
                                <Row style={{ marginTop: 60 }}>
                                    <Col offset={8}>
                                        <Button.Group>
                                            <ResetButton>Reset</ResetButton>&nbsp;
                                            <ButtonClick>Signup</ButtonClick>
                                        </Button.Group>
                                    </Col>
                                    <Col offset={6}>
                                        <Link to='/login'>
                                            <Typography.Text>Already Have Account
                                            Back to Login
                                            </Typography.Text>
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

