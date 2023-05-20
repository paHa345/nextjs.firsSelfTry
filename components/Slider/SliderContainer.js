import Image from "next/legacy/image";
import styles from "./SliderContainer.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import Slides from "./Slides";

function SliderContainer(props) {
  const [current, setCurrent] = useState(0);
  const [animation, setAnimation] = useState(false);

  useEffect(() => {
    setAnimation(true);
    setTimeout(() => {
      setAnimation(false);
    }, 200);
  }, [current]);

  const prevImagesHandler = (e) => {
    e.preventDefault();

    setCurrent((prevState) => {
      if (prevState - 1 < 0) {
        return props.images.length - 1;
      }
      return (prevState - 1) % props.images.length;
    });
  };

  const nextImagesHandler = (e) => {
    e.preventDefault();

    setCurrent((prevState) => {
      return (prevState + 1) % props.images.length;
    });
  };

  return (
    <div className={styles.slider}>
      <div className={styles.container}>
        <div className={styles.arrowContainer}>
          <Link className={styles.leftArrow} href="/">
            <Image
              onClick={prevImagesHandler}
              src="/img/left100.png"
              alt="leftArrow"
              height={50}
              width={50}
            ></Image>
          </Link>
          <Link className={styles.rightArrow} href="/">
            <Image
              onClick={nextImagesHandler}
              src="/img/right100.png"
              alt="rightArrow"
              height={50}
              width={50}
            ></Image>{" "}
          </Link>
        </div>
        <div className={styles.sliderContainer}>
          <Slides current={current} images={props.images}></Slides>
        </div>
      </div>
    </div>
  );
}

export default SliderContainer;
