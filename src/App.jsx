import "./App.css";
import React from 'react'
import { Grid, Typography, Button, Container } from "@mui/material";
import { useState, useEffect, useContext } from "react";
import BasicModal from "./components/Modal";
import { AuthContext } from "./Index";
import { firebase } from "../firbaseConfig";
import { useNavigate } from "react-router-dom";



const App = () => {

  const { logOut, performOnAuth } = firebase()
  let auth = useContext(AuthContext)

  const [mobile, setMobile] = useState({
    text: 'left',
    flex: 'start'
  })

  const navigate = useNavigate()
  const [open, setOpen] = React.useState(false);
  const [log, setLog] = useState('')
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);



  useEffect(() => {
    if (window.innerWidth >= 768) {
      setMobile({
        text: 'center',
        flex: 'center'
      })

    }


  }, [])


  performOnAuth(() => {
    if (auth) {
      navigate('/Notes')
    }
  }, () => console.log('user no dey'))


  const { text, flex } = mobile


  return (
    <>

      <BasicModal opened={open} handleClose={handleClose} log={log} ></BasicModal>

      <Container maxWidth="lg" sx={{
        textAlign: 'center',
        height: '100vh',
        display: 'flex',
        alignItems: 'center'
      }}>
        <Grid container spacing={4} sx={{
          textAlign: text
        }}>

          <Grid container item xs={12}>
            <Typography variant="h5" color="secondary" sx={{ fontWeight: '700', width: '100%' }}>
              Welcome!
            </Typography>
            <Typography variant="h3" color="" sx={
              {
                fontWeight: '700'
              }
            }>
              Write down your greatest thoughts and ideas
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h5" color={'textSecondary'}>
              This is a Note taking app where you take the first step to create the next Big thing
            </Typography>
          </Grid>
          <Grid container item spacing={2} xs={12} sx={{
            justifyContent: flex
          }}>
            <Grid item>
              <Button variant="contained" color="secondary" onClick={() => {
                if (!auth) {
                  setLog('Login')
                  handleOpen()
                }
                logOut()
              }}>
                {!auth ? 'Login' : 'Logout'}
              </Button>
            </Grid>
            <Grid item>
              <Button variant="outlined" color="secondary" onClick={() => {


                setLog('Sign Up')
                handleOpen()



              }
              }>
                {'Sign Up'}
              </Button>
            </Grid>
          </Grid>


        </Grid>
      </Container>
    </>
  );
};

export default App;

// 5 6 + - _ = ` ~ %
