"use client";
import { useEffect } from "react";

export function TokenStore() {
  useEffect(() => {
    // Read cookie manually
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("access_token="))
      ?.split("=")[1];

    if (token && localStorage.getItem("login_method") == "github") {
      localStorage.setItem("access_token", token);
      fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
      },
    })
      .then((res) => res.json())
      .then((data) => { 
        console.log("GitHub user data:", data);
      });
    }

    
  }, []);
  return <></>;
}
