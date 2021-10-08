import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem'


export default function HeaderBar(props) {
    return (
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                <Avatar sx={{ bgcolor: "rgb(103, 58, 183)" }} />
              </IconButton>
              <Typography variant="h6" component="div"
              sx={{
                display: "flex",
                gap: "10px" }}>
                Hello <div style={{textDecoration: "underline"}}>{props.nickname}</div>!
              </Typography>
            </Toolbar>
          </AppBar>
          <List>
          {props.firstName ? (<ListItem>Name: {props.firstName}</ListItem>) : (<ListItem>Name: none</ListItem>)}
          {props.lastName ? (<ListItem>Surname: {props.lastName}</ListItem>) : (<ListItem>Surname: none</ListItem>)}
          {props.age ? (<ListItem>Age: {props.age}</ListItem>) : (<ListItem>Age: none</ListItem>)}
          {props.city ? (<ListItem>City: {props.city}</ListItem>) : (<ListItem>City: none</ListItem>)}
          {props.phone ? (<ListItem>Phone: {props.phone}</ListItem>) : (<ListItem>Phone: none</ListItem>)}
          {props.sex ? (<ListItem>Gender: {props.sex}</ListItem>) : (<ListItem>Gender: none</ListItem>)}
          </List>
        </Box>
      );
}