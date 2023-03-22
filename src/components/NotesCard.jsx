import React from 'react'
import { CardHeader, Card, CardContent, IconButton, Typography, Avatar } from '@mui/material'

import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { yellow, green, pink, blue } from "@mui/material/colors";


const NoteStyles = (note) => {
  return {
    card: {
      border: () => {
        if (note.category == 'work') {
          return '1px solid red'
        }
      }
    },
    avatar: {
      backgroundColor: () => {
        if (note.category == 'work') {
          return yellow[700]
        } if (note.category == 'todos') {
          return pink[500]
        } if (note.category == 'money') {
          return green[500]
        }
        return blue[500]
      }
    }
  }
}

const NotesCard = ({ Note, handleDelete }) => {
  const { card, avatar } = NoteStyles(Note)
  return (
    <Card elevation={1} sx={card}>
      <CardHeader
        avatar={
          <Avatar sx={avatar} >
            {
              Note.category[0].toUpperCase()
            }
          </Avatar>
        }
        action={
          <IconButton onClick={() => handleDelete(Note.id)}>
            <DeleteOutlineOutlinedIcon />
          </IconButton>
        } title={Note.title}
        subheader={Note.category}
      />
      <CardContent>
        <Typography sx={{ overflowWrap: 'break-word' }} variant="body2" color="textSecondary">
          {Note.details}
        </Typography>
      </CardContent>


    </Card>
  )
}


export default NotesCard