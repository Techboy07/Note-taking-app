import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Typography,
  Button,
  ButtonGroup,
  TextField,
  RadioGroup,
  Radio,
  FormControlLabel,
  FormControl,
  FormLabel,
  FormHelperText,
} from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

// ********************************************************************************************************
import { getFirestore, collection, addDoc, serverTimestamp, orderBy, query, where } from "firebase/firestore";
// ************************************************************************************************

import { firebase } from "../../firbaseConfig";


const { app } = firebase()





// 5 6 - + % _ = `

const styles = {
  field: {
    marginTop: "20px",
    display: "block",
    marginBottom: "20px",
  },
  form: {
    boxSizing: "border box",
    padding: 20,
  },
};

const Create = () => {
  const { field, form } = styles;
  const navigate = useNavigate()

  const realForm = useRef()

  const [title, setTitle] = useState("");

  const [details, setDetails] = useState("");

  const [titleError, setTitleError] = useState(false);

  const [detailsError, setDetailsError] = useState(false);
  const [category, setCategory] = useState("todos");

  const db = getFirestore()
  const colRef = collection(db, "notes")




  const handleSubmit = (e) => {

    e.preventDefault();
    title == "" ? setTitleError(true) : setTitleError(false);
    details == "" ? setDetailsError(true) : setDetailsError(false);
    if (title && details) {

      addDoc(colRef, {
        title: title,
        details: details,
        category: category,
        createdAt: serverTimestamp()
      }).then(() => {
        realForm.current.reset()
      });

    }
  };
  return (
    <>
      <form style={form} ref={realForm} noValidate autoComplete="Off" onSubmit={handleSubmit}>
        <Typography
          variant="h6"
          component={"h2"}
          color="textSecondary"
          gutterBottom
        >
          Create a New Note
        </Typography>
        <TextField
          onChange={(e) => setTitle(e.target.value)}
          variant="outlined"
          label="Note Title"
          color="secondary"
          fullWidth
          required
          sx={field}
          error={titleError}
        />

        <TextField
          onChange={(e) => setDetails(e.target.value)}
          variant="outlined"
          label="Details"
          color="secondary"
          multiline
          rows={4}
          fullWidth
          required
          sx={field}
          error={detailsError}
        />

        <FormControl sx={field}>
          <FormLabel color='secondary' >Note category</FormLabel>

          <RadioGroup
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <FormControlLabel
              value="money"
              control={<Radio color="secondary" />}
              label="Money"
            />
            <FormControlLabel
              value="todos"
              control={<Radio color="secondary" />}
              label="Todos"
            />
            <FormControlLabel
              value="reminder"
              control={<Radio color="secondary" />}
              label="Reminder"
            />
            <FormControlLabel
              value="work"
              control={<Radio color="secondary" />}
              label="Work"
            />
          </RadioGroup>

          <FormHelperText></FormHelperText>
        </FormControl>
        <br />
        <Button
          variant="contained"
          type="submit"
          color="secondary"
          endIcon={<KeyboardArrowRightIcon fontSize="small" />}
        >
          Submit
        </Button>
      </form>
    </>
  );
};

export default Create;

// 5 6 - + % _ = `
