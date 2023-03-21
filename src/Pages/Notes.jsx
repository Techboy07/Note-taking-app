import React, { useEffect, useState } from "react";
import { Grid, Paper, Container } from "@mui/material";
import NotesCard from "../components/NotesCard";

import { getFirestore, collection, getDocs, doc, deleteDoc, query, where, orderBy } from "firebase/firestore";

import { firebase } from "../../firbaseConfig";

const { app } = firebase()

const db = getFirestore()

const colRef = collection(db, "notes")


const Notes = () => {
  const [notes, setNotes] = useState([]);

  const queryRef = query(colRef, where('createdAt', '!=', ''), orderBy('createdAt', 'desc'))

  const getSnapShot = () => getDocs(queryRef)
    .then((snapshot) => {
      let books = []
      snapshot.docs
        .forEach((doc) => {
          books.push({ ...doc.data(), id: doc.id, })
        })
      console.log(books)
      setNotes(books)
    }).catch(err => console.log(err))


  useEffect(() => {

    getSnapShot()
  }, []);



  const handleDelete = async (id) => {


    const docRef = doc(db, "notes", id);
    await deleteDoc(docRef)

    const newNotes = notes.filter((note) => id != note.id)
    setNotes(newNotes)
  }

  return (
    <div>
      <Container>
        <Grid container spacing={3}>

          {notes.map((note) => (
            <Grid key={note.createdAt} item xs={12} md={6} lg={4}>
              <NotesCard Note={note} handleDelete={handleDelete}></NotesCard>

            </Grid>
          ))}

        </Grid>
      </Container>


    </div>
  );
};

export default Notes;
// 5 6 - + % _ = `
