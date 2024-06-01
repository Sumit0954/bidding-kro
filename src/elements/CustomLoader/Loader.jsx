import styles from "./Loader.module.scss";
import { dotStream } from "ldrs";

export default function Loader() {
  return (
    <div className={styles["loader-container"]}>
      <span className={styles["loader"]}></span>
    </div>
  );
}

export function ButtonLoader({ size = 35 }) {
  dotStream.register();
  return <l-dot-stream size={size} speed="2.5" color="#062d72" />;
}
