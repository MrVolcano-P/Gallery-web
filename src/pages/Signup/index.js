import React, { useCallback } from 'react'
import styled from 'styled-components'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import styles from './style'
import { login } from '../../api/gallery';
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
    return (
        <div>
            <div className="row justify-content-center" style={styles.row}>
                <div className="col-md-3">
                    <div className="row justify-content-center">
                        <div className="col-md-12" style={styles.txt1}>
                            Signup
                        </div>
                        <div className="col-md-12">
                            <Formik
                                initialValues={{
                                    name: '',
                                    email: '',
                                    password: '',
                                    confirmPassword: ''
                                }}
                                validationSchema={RegisterSchema}
                                onSubmit={values => {
                                    // same shape as initial values
                                    console.log(values);
                                }}
                            >
                                {({ errors, touched }) => (
                                    <Form>
                                        <div className="form-group">
                                            <label htmlFor="name" style={styles.txt2}>Name</label>
                                            <Field
                                                name="name"
                                                type="text"
                                                className={`form-control ${touched.name ? errors.name ? 'is-invalid' : 'is-valid' : ''}`}
                                                id="name"
                                                placeholder="Enter name"
                                            />
                                            <ErrorMessage component="div" name="name" className="invalid-feedback" />
                                        </div>
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
                                        <div className="form-group">
                                            <label htmlFor="confirmPassword" style={styles.txt2}>Confirm Password</label>
                                            <Field
                                                name="confirmPassword"
                                                type="password"
                                                className={`form-control ${touched.confirmPassword ? errors.confirmPassword ? 'is-invalid' : 'is-valid' : ''}`}
                                                id="confirmPassword"
                                                placeholder="Enter Confirm Password"
                                            />
                                            <ErrorMessage component="div" name="confirmPassword" className="invalid-feedback" />
                                        </div>
                                        <button type="submit" className="btn btn-success" style={{ width: '100%' }}>SUBMIT</button>
                                        <div style={{ height: 10 }} />
                                        <button onClick={() => history.push("/login")} className="btn btn-secondary" style={{ width: '100%' }}>Login</button>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

