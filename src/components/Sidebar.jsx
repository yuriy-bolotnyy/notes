import React from "react"

export default function Sidebar(props) {
    const noteElements = props.notes.map((note, index) => {

        const noteFirstRow = note.body.split('\n')[0].trim()
        // console.log(`noteFirstRow: '${noteFirstRow}'`)
        const noteTitle = noteFirstRow

        return (
        <div key={note.id}>
            <div
                
                className={`title ${
                    note.id === props.currentNote.id ? "selected-note" : ""
                }`}
                onClick={() => props.setCurrentNoteId(note.id)}
            >
                {/* <h4 className="text-snippet">Note {index + 1}</h4> */}
                <h4 className="text-snippet">{noteTitle}</h4>
            </div>
        </div>
    )})

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
