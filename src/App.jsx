import React from 'react'
import Split from 'react-split'
import { nanoid } from 'nanoid'

import Editor from './components/Editor'
import Sidebar from './components/Sidebar'

import reactLogo from './assets/react.svg'
import './style.css'

const App = () => {  
  const [notes, setNotes] = React.useState(() => {   // State Lazy init, by using an arrow function
    const notesFromLocalStorage = JSON.parse(localStorage.getItem('notes'))
    console.log('Notes from local storage: ', notesFromLocalStorage)
    return notesFromLocalStorage || []
  })
  const [currentNoteId, setCurrentNoteId] = React.useState(
      (notes[0] && notes[0].id) || ""
  )

  React.useEffect(() => {
    console.log("Effect run for 'notes' changes")
    localStorage.setItem('notes', JSON.stringify(notes))
  }, [notes])
  
  function createNewNote() {
      const newNote = {
          id: nanoid(),
          body: "# Type your markdown note's title here"
      }
      setNotes(prevNotes => [newNote, ...prevNotes])
      setCurrentNoteId(newNote.id)
  }
  
  function updateNote(text) {
      setNotes(oldNotes => oldNotes.map(oldNote => {
          return oldNote.id === currentNoteId
              ? { ...oldNote, body: text }
              : oldNote
      }))
  }
  
  function findCurrentNote() {
      return notes.find(note => {
          return note.id === currentNoteId
      }) || notes[0]
  }
  
  return (
      <main>
      {
          notes.length > 0 
          ?
          <Split 
              sizes={[30, 70]} 
              direction="horizontal" 
              className="split"
          >
              <Sidebar
                  notes={notes}
                  currentNote={findCurrentNote()}
                  setCurrentNoteId={setCurrentNoteId}
                  newNote={createNewNote}
              />
              {
                  currentNoteId && 
                  notes.length > 0 &&
                  <Editor 
                      currentNote={findCurrentNote()} 
                      updateNote={updateNote} 
                  />
              }
          </Split>
          :
          <div className="no-notes">
              <h1>You have no notes</h1>
              <button 
                  className="first-note" 
                  onClick={createNewNote}
              >
                  Create one now
              </button>
          </div>
          
      }
      </main>
  )
}

export default App
