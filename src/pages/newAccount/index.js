import React, { useState } from 'react'

// Dependencias
import { Formik } from 'formik'
import * as Yup from 'yup'
import { useHistory } from 'react-router-dom'

// Servicios
import { signUpByEmail } from '../../firebase/client'

import styles from './styles.module.css'
import Alert from '../../components/Alert'

const NewAccount = () => {
    /* -------------------------------------------------------------------- */
    /* --------------------- CONSTANTES Y DECLARACIONES ------------------- */
    /* -------------------------------------------------------------------- */
    const history = useHistory()
    const initialValues = {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    }

    const validationSchema = Yup.object({
        name: Yup.string().required('El nombre es obligatorio.'),
        email: Yup.string()
            .required('La cuenta de correo es obligatoria.')
            .email('Introduce una cuenta de correo válida'),
        password: Yup.string()
            .required('La contraseña es obligatoria.')
            .min(6, 'La contraseña debe tener un mínimo de seis caracteres.'),
        confirmPassword: Yup.string()
            .required('Confirma la contraseña.')
            .oneOf(
                [Yup.ref('password'), null],
                'Las contraseñas deben coincidir.'
            ),
    })

    /* -------------------------------------------------------------------- */
    /* ----------------------------- FUNCIONES ---------------------------- */
    /* -------------------------------------------------------------------- */
    const handleSubmit = async (e, values) => {
        e.preventDefault()

        try {
            await signUpByEmail(values)
            history.push('/shopping-list')
        } catch (error) {
            const { code } = error
            handleError(code)
        }
    }

    const handleError = errorCode => {
        if (errorCode === 'auth/email-already-in-use') {
            setErrorEmail('La cuenta de correo ya existe.')
        } else {
            setErrorEmail('Error al crear la cuenta.')
        }
    }

    // const validateErrors = e => {
    //     if (e.target.name === 'password') {
    //         setPassword(e.target.value.trim())
    //     }

    //     switch (e.target.name) {
    //         case 'name':
    //             if (e.target.value.trim() === '') {
    //                 setErrorName('El nombre es obligatorio.')
    //             } else {
    //                 setErrorName(null)
    //             }
    //             break
    //         case 'email':
    //             if (e.target.value.trim() === '') {
    //                 setErrorEmail('La cuenta de correo es obligatoria.')
    //             } else {
    //                 const emailPattern = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    //                 const emailValidation = emailPattern.test(e.target.value)
    //                 console.log(emailValidation)
    //                 if (!emailValidation) {
    //                     setErrorEmail('Introduce una cuenta de correo válida.')
    //                 } else {
    //                     setErrorEmail(null)
    //                 }
    //             }
    //             break
    //         case 'password':
    //             if (e.target.value.trim() === '') {
    //                 setErrorPassword('La contraseña es obligatoria.')
    //             } else if (e.target.value.length < 6) {
    //                 setErrorPassword(
    //                     'La contraseña debe tener un mínimo de seis caracteres.'
    //                 )
    //             } else {
    //                 setErrorPassword(null)
    //             }
    //             break
    //         case 'confirmPassword':
    //             if (e.target.value.trim() === '') {
    //                 setErrorConfirmation(
    //                     'La confirmación de la contraseña es obligatoria.'
    //                 )
    //             } else {
    //                 if (e.target.value.trim() !== password) {
    //                     setErrorConfirmation('Las contraseñas no coinciden.')
    //                 } else {
    //                     setErrorConfirmation(null)
    //                 }
    //             }
    //             break
    //     }
    // }

    /* -------------------------------------------------------------------- */
    /* --------------------------- RENDERIZADO ---------------------------- */
    /* -------------------------------------------------------------------- */
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Crear Nueva Cuenta</h1>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
            >
                {formik => {
                    const {
                        values,
                        errors,
                        touched,
                        isValid,
                        dirty,
                        handleBlur,
                        handleChange,
                    } = formik
                    return (
                        <form
                            className={styles.form}
                            onSubmit={e => handleSubmit(e, values)}
                        >
                            <input
                                className={`${styles.inputText} ${
                                    errors.name &&
                                    touched.name &&
                                    styles.inputError
                                }`}
                                type='text'
                                name='name'
                                placeholder='Introduce un nombre'
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.name && touched.name && (
                                <div className={styles.errorMessage}>
                                    <Alert message={errors.name} />
                                </div>
                            )}
                            <input
                                className={`${styles.inputText} ${
                                    errors.email &&
                                    touched.email &&
                                    styles.inputError
                                }`}
                                type='email'
                                name='email'
                                placeholder='Introduce una cuenta de correo electrónico.'
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.email && touched.email && (
                                <div className={styles.errorMessage}>
                                    <Alert message={errors.email} />
                                </div>
                            )}
                            <input
                                className={`${styles.inputText} ${
                                    errors.password &&
                                    touched.password &&
                                    styles.inputError
                                }`}
                                type='password'
                                name='password'
                                placeholder='Introduce la contraseña'
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.password && touched.password && (
                                <div className={styles.errorMessage}>
                                    <Alert message={errors.password} />
                                </div>
                            )}
                            <input
                                className={`${styles.inputText} ${
                                    errors.confirmPassword &&
                                    touched.confirmPassword &&
                                    styles.inputError
                                }`}
                                type='password'
                                name='confirmPassword'
                                placeholder='Confirma la contraseña'
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.confirmPassword && touched.confirmPassword && (
                                <div className={styles.errorMessage}>
                                    <Alert message={errors.confirmPassword} />
                                </div>
                            )}
                            <button
                                className={
                                    dirty && isValid
                                        ? styles.submitButton
                                        : styles.disabledButton
                                }
                                type='submit'
                                disabled={!(isValid && dirty)}
                            >
                                Registrarse
                            </button>
                        </form>
                    )
                }}
            </Formik>
        </div>
    )
}

export default NewAccount
