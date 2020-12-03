import React, {useEffect, useState} from 'react'
import { BrowserRouter as Router, Redirect, Switch } from 'react-router-dom'
import {firebase} from '../firebase/firabe-config'
import { JournalScreen } from '../components/journal/JournalScreen'
import { AuthRouter } from './AuthRouter'
import { useDispatch } from 'react-redux'
import { login } from '../actions/auth'
import { PrivateRoute } from './PrivateRoute'
import { PublicRoute } from './PublicRoute'
//import { loadNotes } from '../helpers/loadNotes'
import { StartLoadingNotes } from '../actions/notes'

export const AppRouter = () => {

    const dispatch = useDispatch()
 
    //verificar estado de app
    const [checking, setChecking] = useState(true); 

    const [isLoggedIn, setIsLoggedIn, ] = useState(false)



    useEffect(() => {
        
        firebase.auth().onAuthStateChanged( async (user) => {
            //console.log(user)

            if (user?.uid){ //si el objeto user exite, pregunta si exite el uid
                dispatch( login( user.uid, user.displayName ) );
                setIsLoggedIn(true);

                //carno notas del user
                dispatch(StartLoadingNotes(user.uid))

            }else{
                setIsLoggedIn(false);
            }

            setChecking(false);

        })

    }, [dispatch, setChecking, setIsLoggedIn])

    if( checking) {
        return(
            <h1>wait...</h1>
        )
    }
    

    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoute path="/auth" isAuthenticated={isLoggedIn}  component={ AuthRouter }/>
                    <PrivateRoute exact isAuthenticated={isLoggedIn} path="/" component={ JournalScreen } />
                    <Redirect to="/auth/login"/>
                </Switch>
            </div>
        </Router>
    )
}
