import React from "react";
import Erro404 from "../../assets/images/NotFoundError/notFound404Error.png";

const NotFound = () => {
  return (
    <div style={styles.container}>
      <img
        src={Erro404} // You can replace this with your own 404 image URL
        alt="404 Not Found"
        style={styles.image}
      />
      <h2 style={styles.message}>Oops! Something Went Wrong</h2>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    textAlign: "center",
    backgroundColor: "#f8f9fa",
  },
  image: {
    width: "300px",
    maxWidth: "80%",
    marginBottom: "20px",
  },
  message: {
    color: "#555",
  },
};

export default NotFound;
