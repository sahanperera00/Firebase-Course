function Header() {
  return (
    <div
      style={{
        width: "100%",
        height: "100px",
        margin: "0px",
        backgroundColor: "#FFE080",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <img
        src="https://firebasestorage.googleapis.com/v0/b/fir-frontend-c2209.appspot.com/o/images%2FfirebaseLogo1.png?alt=media&token=b50c149c-1624-439f-8fac-172a16eb83d5"
        alt="logo"
        style={{
          width: "350px",
          height: "100px",
          marginLeft: "auto",
          marginRight: "auto",
          scale: "0.65",
        }}
      />
    </div>
  );
}

export default Header;
