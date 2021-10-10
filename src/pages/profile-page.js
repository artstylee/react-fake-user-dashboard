import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useFetch from "../custom-hooks/usefetch";
import Loader from "../custom-hooks/loader";
import UserInfo from "./user-info";
import UserFriends from "./user-friends";
import "./index.css";

//material ui
import { Button, Container } from "@mui/material";
//material ui

export default function ProfilePage({ setLogin }) {
  const { get } = useFetch("http://localhost:9999/");
  const [profiledata, setProfiledata] = useState([]);
  const [loader, setLoader] = useState(true);
  const [cookie, setCookie] = useState(null);
  
  function getCookie(name) {
    let matches = document.cookie.match(
      new RegExp(
        "(?:^|; )" +
          //eslint-disable-next-line
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

    let updatedCookie =
      encodeURIComponent(name) + "=" + encodeURIComponent(value);

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

  function handlePushToLogOut() {
    deleteCookie("userid");
    setLogin(null);
    setLoader(true);
  }

  useEffect(() => {
    let cookie = getCookie("userid");
    get(`profile?id=${cookie}`)
      .then((data) => {
        setTimeout(() => {
          setProfiledata(data);
          setLoader(false);
          setCookie(cookie);
        }, 500);
      })
      .catch((error) => console.log(error));
    // eslint-disable-next-line
  }, []);

  return (
    <div className="background-container">
      {loader === true ? (
        <Loader />
      ) : (
        <Container sx={{ display: "flex", flexDirection: "row", gap: "20px" }}>
          <Container
            sx={{
              width: "fit-content",
              padding: "25px",
              background: "#fff",
              borderRadius: "5px",
              height: "fit-content",
            }}
          >
            <UserInfo {...profiledata[0]} />
            <Link to="/">
              <Button onClick={handlePushToLogOut}>Log out</Button>
            </Link>
          </Container>
          <Container>
            <UserFriends userid={cookie} />
          </Container>
        </Container>
      )}
    </div>
  );
}
