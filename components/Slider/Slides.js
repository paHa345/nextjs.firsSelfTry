import Link from "next/link";
import Image from "next/legacy/image";
import styles from "./Slides.module.css";
import { Fragment } from "react";
function Slides(props) {
  const textArr = ["Качество", "Надёжность", "Удобство"];
  const slides = props.images.map((el, index) => {
    return (
      <div
        className={`${styles.slide} `}
        style={{
          transform: `translateX(${(props.current - index) * -1 * 100}%)`,
        }}
        key={el}
      >
        <Image
          className={styles.slideImage}
          src={`/img/sliderImage/${el}`}
          alt={el}
          width={500}
          height={307}
          //   objectFit="contain"
          layout="responsive"
        ></Image>
        <Link href="/" className={styles.slideButton}>
          {textArr[index]}
        </Link>
      </div>
    );
  });

  return <Fragment>{slides};</Fragment>;
}

export default Slides;
