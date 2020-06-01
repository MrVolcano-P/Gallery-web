import React from 'react'
import styled from 'styled-components'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import styles from './style'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../api/gallery';
import { setAuthToken } from '../../action/authToken'
import { useHistory } from 'react-router-dom'
const Button = styled.button`
    background-color: #942A96 !important;
    color: #fff !important;
    font-family: Roboto;
    font-weight: 700;
    &&:hover{
        background-color: #872589 !important;
    }
`

const RegisterSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email')
        .required('This field is required.'),
    password: Yup.string()
        .min(3, 'Please Enter less then 3 letters')
        .required('This field is required.'),
});

export default () => {
    const dispatch = useDispatch()
    const token = useSelector(state => state.authToken)
    console.log('token', token)
    const history = useHistory();
    return (
        <div>
            <div className="row justify-content-center" style={styles.row}>
                <div className="col-md-3">
                    <div className="row justify-content-center">
                        <div className="col-md-12" style={styles.txt1}>
                            Login
                        </div>
                        <div className="col-md-12">
                            <Formik
                                initialValues={{
                                    email: '',
                                    password: ''
                                }}
                                validationSchema={RegisterSchema}
                                onSubmit={values => {
                                    // same shape as initial values
                                    console.log(values);
                                    login(values)
                                        .then(res => {
                                            console.log(res.data)
                                            dispatch(setAuthToken(res.data.token))
                                            history.push("/admin")
                                        })
                                        .catch(err => console.log(err))
                                }}
                            >
                                {({ errors, touched }) => (
                                    <Form>
                                        <div className="form-group">
                                            <label htmlFor="email" style={styles.txt2}>Email address</label>
                                            <Field
                                                name="email"
                                                type="email"
                                                className={`form-control ${touched.email ? errors.email ? 'is-invalid' : 'is-valid' : ''}`}
                                                id="email"
                                                placeholder="Enter email"
                                            />
                                            <ErrorMessage component="div" name="email" className="invalid-feedback" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="password" style={styles.txt2}>Password</label>
                                            <Field name="password"
                                                type="password"
                                                className={`form-control ${touched.password ? errors.password ? 'is-invalid' : 'is-valid' : ''}`}
                                                id="password"
                                                placeholder="Password"
                                            />
                                            <ErrorMessage component="div" name="password" className="invalid-feedback" />
                                        </div>
                                        <button type="submit" className="btn btn-success" style={{ width: '100%' }}>Login</button>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

