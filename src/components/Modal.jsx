import React, { useState, useContext } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Index";

import { Visibility, VisibilityOff } from "@mui/icons-material";

import { firebase } from "../../firbaseConfig";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  aspectRatio: 1,
  width: "90",
};

export default function BasicModal({ opened, handleClose, log }) {


  const auth = useContext(AuthContext)

  const navigate = useNavigate()

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false)

  const { createUser, signIn } = firebase();



  const handleSubmit = (e) => {

    e.preventDefault()


    let userCred
    if (log == "Login") {

      userCred = signIn(email, password).then((cred) => {
        if (auth) {
          navigate('/Notes')
          console.log(cred)
        }
      }).catch((err) => alert(`${err}`))



    } else if (log == "Sign Up") {
      userCred = createUser(email, password).then((cred) => {
        navigate('/Notes')
        console.log(cred)
      }).catch((err) => alert(`${err}`))

    }



  };

  return (
    <div>
      {
        <Modal
          open={opened}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <form
              onSubmit={
                handleSubmit}
            >
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    sx={{
                      width: "100%",
                    }}
                    required
                    type="email"
                    color="secondary"
                    label="Email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    sx={{
                      width: "100%",
                    }}
                    required
                    type={showPassword ? 'text' : 'password'}
                    label="Password"


                    // endAdornment={
                    //   <InputAdornment position="end">
                    //     <IconButton
                    //       aria-label="toggle password visibility"
                    //       onClick={() => setShowPassword(!showPassword)}
                    //       onMouseDown={() => setShowPassword(!showPassword)}
                    //       edge="end"
                    //     >
                    //       {showPassword ? <VisibilityOff /> : <Visibility />}
                    //     </IconButton>
                    //   </InputAdornment>
                    // }
                    color="secondary"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Button
                    sx={{
                      width: "100%",
                    }}
                    variant="contained"
                    color="secondary"
                    type="submit"
                  >{`${log}`}</Button>
                </Grid>

                {/* {log == "Login" ? null : (
                  <Grid container item xs={12} spacing={3}>
                    <Grid item xs={12}>
                      <Typography
                        sx={{
                          width: "100%",
                          textAlign: "center",
                        }}
                      >
                        Sign up with :
                      </Typography>
                    </Grid>

                    <Grid item xs={6}>
                      <Button
                        sx={{
                          width: "100%",
                        }}
                        variant="outlined"
                        color="secondary"
                      >
                        {" "}
                        Google
                      </Button>
                    </Grid>
                    <Grid item xs={6}>
                      <Button
                        sx={{
                          width: "100%",
                        }}
                        variant="contained"
                        color="primary"
                      >
                        Facebook
                      </Button>
                    </Grid>
                  </Grid>
                )} */}
              </Grid>
            </form>
          </Box>
        </Modal>
      }
    </div>
  );
}
