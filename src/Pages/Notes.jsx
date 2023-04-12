import React, { useEffect, useState } from "react";
import { Grid, Paper, Container } from "@mui/material";
import NotesCard from "../components/NotesCard";

import { getFirestore, collection, getDocs, doc, deleteDoc, query, where, orderBy, getDoc } from "firebase/firestore";

import { firebase } from "../../firbaseConfig";

const { auth } = firebase()


const db = getFirestore()



const Notes = () => {
  const [notes, setNotes] = useState([]);
  const userEmail = auth.currentUser.email

  console.log(userEmail)
  const colRef = collection(db, `users/${userEmail}/notes`)

  const getSnapShot = () => getDocs(colRef)
    .then((snapshot) => {
      let user = []
      snapshot.docs.forEach((doc) => user.push({ ...doc.data(), id: doc.id }))
      setNotes(user)
      console.log(user)
    }).catch(err => console.log(err))


  useEffect(() => {

    getSnapShot()
  }, []);


  const handleDelete = async (id) => {


    const docRef = doc(db, `users/${userEmail}/notes`, id);
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
