import styles from "./Loader.module.scss";
import { dotStream } from "ldrs";

export default function Loader() {
  return (
    <div className={styles["loader-container"]}>
      <span className={styles["loader"]}></span>
    </div>
  );
}
/**
 * ButtonLoader component to display a loading animation using `<l-dot-stream>`.
 *
 * This component registers the `dotStream` loader from the `ldrs` library
 * and returns a styled loading indicator with customizable size.
 *
 * @function
 * @export
 * @param {Object} props - Component props.
 * @param {number} [props.size=35] - Size of the loader in pixels.
 * @returns {JSX.Element} A JSX element rendering the loading animation.
 */
export function ButtonLoader({ size = 35 }) {
  dotStream.register();
  return <l-dot-stream size={size} speed="2.5" color="#062d72" />;
}
