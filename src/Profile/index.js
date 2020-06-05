import React from 'react'
import styled from 'styled-components'
import { Formik, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, Link } from 'react-router-dom'
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
import { setProfile } from '../action/profile'
import { getProfile, updateProfile } from '../api/gallery'
import { Success } from '../components/Message'
// const Button = styled.button`
//   background-color: #942A96 !important;
//   color: #fff !important;
//   font-family: Roboto;
//   font-weight: 700;
//   &&:hover{
//     background-color: #872589 !important;
//   }
// `

const RegisterSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('This field is required.')
});

export default () => {
    const token = useSelector(state => state.authToken)
    const history = useHistory();
    const dispatch = useDispatch()
    const profile = useSelector(state => state.profile)
    return (
        <Row justify='center' >
            <Col span={8} flex='1'>
                <Formik
                    initialValues={{
                        name: profile.name,
                    }}
                    onSubmit={(values, actions) => {
                        updateProfile({ "Name": values.name }, token)
                            .then(res => {
                                dispatch(setProfile(res.data))
                                history.push('/user/profile')
                                actions.setSubmitting(false)
                                Success('Profile Updated')
                            })
                            .catch(err => console.log(err))

                    }}
                    validationSchema={RegisterSchema}
                    render={() => (
                        <Form
                            style={{ marginTop: '25%' }}
                            layout='vertical'
                        >
                            <div style={{ background: "white", padding: 40, flex: 1 }}>
                                <Typography.Title>Edit Profile</Typography.Title>
                                {/* <Typography.Text>Name</Typography.Text>
                                <br /> */}
                                <FormItem
                                    name="name"
                                    label="Name"
                                    required={true}
                                    hasFeedback={true}
                                    showValidateSuccess={true}
                                >
                                    <Input name="name" placeholder="Name" />
                                </FormItem>
                                <Row style={{ marginTop: 60 }} justify='center'>
                                    <Col>
                                        <Button.Group>
                                            <SubmitButton>Update</SubmitButton>
                                        </Button.Group>
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

