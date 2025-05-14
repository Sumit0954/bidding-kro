import noPermmisson from "../../assets/images/admin/reports/noPermmisson.png";

const AccessDenied = () => {
  return (
    <div style={styles.container}>
      <img src={noPermmisson} alt="404 Not Found" style={styles.image} />
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "80vh",
    textAlign: "center",
    backgroundColor: "#f8f9fa",
  },
  image: {
    width: "600px",
    maxWidth: "80%",
    marginBottom: "20px",
  },
  message: {
    color: "#555",
  },
};

export default AccessDenied;
