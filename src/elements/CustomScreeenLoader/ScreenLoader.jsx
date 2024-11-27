import styles from "./ScreenLoader.module.scss";
const ScreenLoader = () => {
  return (
    <>
     <div className={styles["line-loader-container"]}>
      <div className={styles["line-loader"]}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
    </>
  );
};

export default ScreenLoader;
