import React, { useEffect, useState } from "react";
import useFetch from "./usefetch";
import { Button, Container } from "@mui/material";
import "./index.css";
import HeaderBar from "./headerbar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { Link } from "react-router-dom";
import Loader from "./loader"

export default function ProfilePage({setLogin}) {
  const { get } = useFetch("http://localhost:9999/");
  const [profiledata, setProfiledata] = useState([]);
  const [cookieid, setCookieid] = useState("");
  const [loader, setLoader] = useState(true)

  
  function getCookie(name) {
    let matches = document.cookie.match(
      new RegExp(
        "(?:^|; )" +
          name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
          "=([^;]*)"
      )
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }

  function cookieManager(name, value, options = {}) {
    options = {
      path: "/",
      ...options,
    };

    if (options.expires instanceof Date) {
      options.expires = options.expires.toUTCString();
    }

    let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

    for (let optionKey in options) {
      updatedCookie += "; " + optionKey;
      let optionValue = options[optionKey];
      if (optionValue !== true) {
        updatedCookie += "=" + optionValue;
      }
    }

    document.cookie = updatedCookie;
  }

  function deleteCookie(name) {
    cookieManager(name, "", {
      "max-age": -1,
    });
  }

  function handlePushToLogin() {
    deleteCookie("userid")
    setLogin(null)
    setLoader(true)
  }


  useEffect(() => {
    let cookie = getCookie("userid");
    get(`profile?id=${cookie}`).then((data) => {
      setProfiledata(data);
      setCookieid(cookie);
      setLoader(false)
    });
  }, []);


  return (
    <div className="background-container">
      {loader === true ? <Loader /> : <Container
        sx={{
          width: "fit-content",
          padding: "25px",
          background: "#fff",
          borderRadius: "5px",
          display: "flex",
          flexDirection: "row",
          gap: "20px",
        }}
      >
        <Container>
          <HeaderBar {...profiledata[0]} />
          
          <Link to="/" ><Button onClick={handlePushToLogin}>Log out</Button></Link>
        </Container>
        <Container>
          {profiledata[0]?.friends.map((el, index) => {
            return (
              <List
                sx={{
                  width: "350px",
                  padding: "25px",
                  margin: "5px",
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
                  }}
                >
                  <div>{el.name}</div>
                  <div>{el.surname}</div> <div>Age: {el.age}</div>{" "}
                  <div>Sex: {el.sex}</div>
                </ListItem>
              </List>
            );
          })}
        </Container>
      </Container>}
    </div>
  );
}
