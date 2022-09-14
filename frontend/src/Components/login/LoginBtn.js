import React from "react";

function LoginBtn() {
  return (
    <>
      <a
        href="/signin"
        style={{
          textDecoration: "none",
          color: "gray",
          marginRight: "10px",
        }}
      >
        Sign in
      </a>
      <a href="/signup" style={{ textDecoration: "none", color: "gray" }}>
        Sign up
      </a>
    </>
  );
}

export default LoginBtn;
