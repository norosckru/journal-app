import React from 'react'
import { useSelector } from 'react-redux'
import { NoteScreen } from '../notes/NoteScreen'
import { NothingSelectd } from './NothingSelectd'
import { Sidebar } from './Sidebar'

export const JournalScreen = () => {

    const {active} = useSelector(state => state.notes) //extraigo del store, de notes, el active



    return (
        <div className="journal__main-content animate__animated animate__fadeIn animate__faster">
            <Sidebar />

            <main>
                {
                    (active)
                        ? (<NoteScreen />)
                        : (<NothingSelectd /> )
                }
                
            </main>
        </div>
    )
}
