import React, {useState, useEffect} from "react"
import Sidebar from "./components/Sidebar"
import Editor from "./components/Editor"
import Split from "react-split"
import './App.css'
import { onSnapshot, addDoc, doc, deleteDoc } from "firebase/firestore";
import { notesCollection, db } from "../Firebase"

export default function App() {
    const [notes, setNotes] = useState([]);
    const [currentNoteId, setCurrentNoteId] = useState(
        (notes[0]?.id) || ""
    )

    const currentNote =  
    notes.find(note => note.id === currentNoteId) 
    || notes[0]

    useEffect(() => {
      //websocket listener 
      const unsubscribe = onSnapshot(notesCollection, function(snapshot) {
        const notesArr = snapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id
        }))
        setNotes(notesArr);
      })
      //remove listener to avoid memory leak
      return unsubscribe
    }, []);
    
   async function createNewNote() {
        const newNote = {
            body: "# Type your markdown note's title here"
        }
        const newNoteRef = await addDoc(notesCollection, newNote);
        setCurrentNoteId(newNoteRef.id);
        
    }
    
    function updateNote(text) {
       

        setNotes(oldNotes => {
          const updatedNoteList = [];
          for(let i = 0; i < oldNotes.length; i++) {
            if(oldNotes[i].id === currentNoteId) {
            updatedNoteList.unshift({...oldNotes[i], body: text});
          } else {
            updatedNoteList.push(oldNotes[i]);
          }} 
          return updatedNoteList;
        });

        
    }

    async function deleteNote(id) {
      const docRef = doc(db, "notes", id);
      await deleteDoc(docRef);

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
                    currentNote={currentNote}
                    setCurrentNoteId={setCurrentNoteId}
                    newNote={createNewNote}
                    deleteNote={deleteNote}
                />
                {
                    currentNoteId && 
                    notes.length > 0 &&
                    <Editor 
                        currentNote={currentNote} 
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

