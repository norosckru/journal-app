import Swal from 'sweetalert2';

import { firebase, googleAuthProvider } from '../firebase/firabe-config'
import { noteLogout } from './notes';
import { finishLoading, startLoading } from './ui'
const { types } = require("../types/types")

//priemra accion async
export const startLoginEmialPassword = (email, password) => {
    return (dispatch) => { //retorna un callback

        dispatch( startLoading() );

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then( ({user}) => {
                dispatch(login(user.uid, user.displayName));

                    dispatch( finishLoading() );
            })
            .catch( e => {
                console.log(e)
                dispatch( finishLoading() );
                Swal.fire('Error', e.message, 'error');
            })

    }
}

//registr con name, email, password
export const startRegisterWithEmailPasswordName = (email, password, name) => {

    return (dispatch) => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then( async ({ user }) => {

                await user.updateProfile({displayName: name})
                dispatch(
                    login(user.uid, user.displayName)
               )

               //console.log(user)
            }).catch(e => {
                console.log(e)
                Swal.fire('Error', e.message, 'error');
            })
    }
}

//google
export const startGoogleLogin = () => {
    return (dispatch) => {
        firebase.auth().signInWithPopup(googleAuthProvider)
            .then(({ user }) => {
                dispatch(
                    login(user.uid, user.displayName)
                )
            });
    }
}

export const login = (uid, displayName) => ({ //funcion retorna estos objetos
    type: types.login,
    payload: {
        uid,
        displayName
    }
});


export const startLogout = () => {
    return async (dispatch) => {
        await firebase.auth().signOut();

        dispatch( logout() )
        dispatch(noteLogout())
    }
}


export const logout = () => ({
    type: types.logout
})