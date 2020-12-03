import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import validator from 'validator'
import { startGoogleLogin, startLoginEmialPassword } from '../../actions/auth'
import { useForm } from '../../hooks/useForm'
import { removeError, setError } from '../../actions/ui'

export const LoginScreen = () => {

    const dispatch = useDispatch()


    const {loading, msgError} = useSelector(state => state.ui)
    //console.log(msgError)

    const [formValues, handleInputChange] = useForm({
        email: '',
        password: ''
    });

    const {email, password} = formValues

    const handleLogin = (e) => {
        e.preventDefault()
        //console.log(email, password)
        //pequeña validación del form
        /* if( isForValid() ){
            //console.log('Formualrio Correcto')
            dispatch(startLoginEmialPassword(email, password))        } */
            dispatch(startLoginEmialPassword(email, password))
        
    }

    const handleGooleLogin = () => {
        dispatch(startGoogleLogin());
    }

    //función para validar form
    const isForValid = () => {
        
        if(!validator.isEmail( email )){
            dispatch( setError('Email is not valid'))
           // console.log('Email is not valid')
            return false;
        } else if(password.length < 5){
            dispatch( setError('Password should be at least 6 character and match each other'))
            //console.log('Password should be at least 6 character and match each other')
            return false;
        }

        dispatch(removeError())
        return true;
    }

    return (
        <>
            <h3 className="auth__title">Login</h3>
            <form onSubmit={handleLogin} className="animate__animated animate__fadeIn animate__faster">

    {/*         {
                    msgError &&
                    (
                        <div className="auth__alert-error">
                            {msgError}
                        </div>
                    )
                } */}

                <input
                    type="text"
                    placeholder="Email..."
                    name="email"
                    className="auth__input"
                    autoComplete="off"
                    value={email}
                    onChange={handleInputChange}
                />

                <input
                    type="password"
                    placeholder="Password..."
                    name="password"
                    className="auth__input"
                    value={password}
                    onChange={handleInputChange}
                />

                <button 
                    type="submit" 
                    className="btn btn-primary btn-block"
                    disabled={loading}
                >
                    Login
                </button>

                <div className="auth__social-networks">
                    <p>Login with Social networks</p>
                    <div
                        className="google-btn"
                        onClick={handleGooleLogin}
                    >
                        <div className="google-icon-wrapper">
                            <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                        </div>
                        <p className="btn-text">
                            <b>Sign in with google</b>
                        </p>
                    </div>
                </div>

                <Link className="link" to="/auth/register">Create new Account</Link>
            </form>
        </>
    )
}
