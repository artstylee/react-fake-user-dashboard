import React, { useEffect, useState } from "react";
import useFetch from "../custom-hooks/usefetch";

//material ui
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";

//material ui

export default function UserFriends({ userid }) {
  const { patch, get } = useFetch("http://localhost:9999/");
  const [data, setData] = useState(null);
  const [data2, setData2] = useState(null);
  const [searchvalue, setSearchvalue] = useState("");
  const [values, setValues] = useState({
    name: "",
    surname: "",
    age: "",
  });

  function getdata() {
    get(`friends?id=${userid}`)
      .then((data) => {
        setData(...data);
        setData2(...data);
      })
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    if (userid) {
      getdata();
    }
    // eslint-disable-next-line
  }, [userid]);

  useEffect(() => {
    if (data2) {
      if (searchvalue.length > 0) {
        let result = data?.friends.filter(
          (el) =>
            el.name.toLowerCase().includes(searchvalue.toLowerCase()) ||
            el.surname.toLowerCase().includes(searchvalue.toLowerCase())
        );
        setData2({ ...data, friends: result });
      } else {
        setData2(data);
      }
    }
    // eslint-disable-next-line
  }, [searchvalue]);

  function handleSearch(e) {
    setSearchvalue(e.currentTarget.value);
  }
  const handleChangeInputs = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  function handleAddFriend() {
    patch(`friends/${userid}`, { friends: [...data.friends, values] })
      .then((data) => {
        getdata();
        setValues({ name: "", surname: "", age: "" });
      })
      .catch((error) => console.log(error));
  }
  function handleDeleteFriend(event, name, surname) {
    const filtered = data?.friends.filter(
      (el) => el.name !== name && el.surname !== surname
    );
    patch(`friends/${userid}`, { friends: filtered })
      .then((data) => getdata())
      .catch((error) => console.log(error));
  }

  return (
    <Box
      sx={{
        minWidth: "500px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "fit-content",
        padding: "25px",
        background: "#fff",
        borderRadius: "5px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-end",
          width: "100%",
          marginBottom: "15px",
        }}
      >
        <SearchIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
        <TextField
          sx={{ margin: "5px" }}
          value={searchvalue}
          onChange={handleSearch}
          label="Search"
          variant="standard"
          fullWidth
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          position: "relative",
          width: "100%",
          justifyContent: "space-between",
          marginBottom: "15px",
          zIndex: 5,
        }}
      >
        <TextField
          onChange={handleChangeInputs("name")}
          value={values.name}
          label="Name"
          size="small"
          sx={{ width: "150px", marginRight: "5px" }}
        />
        <TextField
          onChange={handleChangeInputs("surname")}
          value={values.surname}
          label="Surname"
          size="small"
          sx={{ width: "150px", marginRight: "5px" }}
        />
        <TextField
          onChange={handleChangeInputs("age")}
          value={values.age}
          label="Age"
          size="small"
          sx={{ width: "100px", marginRight: "5px" }}
        />
        <Button
          onClick={handleAddFriend}
          sx={{ width: "100px" }}
          variant="contained"
        >
          add
        </Button>
      </Box>
      <Box
        sx={{
          height: "350px",
          width: "100%",
          overflowX: "hidden",
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
        }}
      >
        {data &&
          data2?.friends.map((el, index) => {
            return (
              <List
                sx={{
                  marginBottom: "5px",
                  border: "1px solid #f2f2f2",
                  background: "#f7f7f7",
                  borderRadius: "5px",
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <ListItem
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "470px",
                  }}
                >
                  <div>{el.name}</div>
                  <div>{el.surname}</div>
                  <div>Age: {el.age}</div>{" "}
                  <Button
                    color="error"
                    size="small"
                    variant="outlined"
                    key={index}
                    onClick={(event) =>
                      handleDeleteFriend(event, el.name, el.surname)
                    }
                  >
                    X
                  </Button>
                </ListItem>
              </List>
            );
          })}
      </Box>
    </Box>
  );
}
