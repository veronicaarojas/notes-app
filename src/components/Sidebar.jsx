import React from "react"
import {useState} from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

export default function Sidebar(props) {
    const [hoveredNotes, setHoveredNotes] = useState({});

    const handleMouseOver = (noteId) => {
        setHoveredNotes((prevHoveredNotes) => ({
            ...prevHoveredNotes,
            [noteId]: true
        }))
    }

    const handleMouseOut = (noteId) => {
        setHoveredNotes((prevHoveredNotes) => ({
            ...prevHoveredNotes,
            [noteId]: false
        }))
    }

    const noteElements = props.notes.map((note, index) => (
        <div key={note.id}>
            <div
            onMouseOver={() => handleMouseOver(note.id)}
            onMouseOut={() => handleMouseOut(note.id)}

                className={`title ${
                    note.id === props.currentNote.id ? "selected-note" : ""
                }`}
                onClick={() => props.setCurrentNoteId(note.id)}
            >
                <h4 className="text-snippet">{note.body.split(/[\r\n]+/)[0] ? note.body.split(/[\r\n]+/)[0] : "Blank Note"}</h4>
                { hoveredNotes[note.id] === true &&
                <button className="delete--button"
                >
                <FontAwesomeIcon icon={faTrash} />
                </button> }
            </div>
        </div>
    ))

    return (
        <section className="pane sidebar">
            <div className="sidebar--header">
                <h3>Notes</h3>
                <button className="new-note" onClick={props.newNote}>+</button>
            </div>
            {noteElements}
        </section>
    )
}
