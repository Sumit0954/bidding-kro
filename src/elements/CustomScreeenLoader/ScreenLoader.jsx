import styles from "./ScreenLoader.module.scss";
const ScreenLoader = ({ component }) => {
  return (
    <>
      <div className={styles["loading-container"]}>
        <div className={styles["loading-title"]}></div>

        <div className={styles["loading-paragraph"]}>
          <div className={styles["loading-line"]}></div>
          <div className={styles["loading-line"]}></div>
          <div className={styles["loading-line"]}></div>
        </div>
        {component === "Questions" ? (
          <div className={styles["loading-thumbnail"]}></div>
        ) : (
          <div className="loading-list">
            <div className={styles["loading-list-item"]}>
              <div className={styles["dot"]}></div>
              <div className={styles["line"]}></div>
            </div>
            <br />
            <div className={styles["loading-list-item"]}>
              <div className={styles["dot"]}></div>
              <div className={styles["line"]}></div>
            </div>
          </div>
        )}
        <br />
        <br />
        <div className={styles["loading-button"]}></div>
      </div>
    </>
  );
};

export default ScreenLoader;
