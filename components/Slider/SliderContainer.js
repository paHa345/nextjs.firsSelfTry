import Image from "next/legacy/image";
import styles from "./SliderContainer.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleLeft, faCircleRight } from "@fortawesome/free-solid-svg-icons";
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
    <div className={styles.container}>
      <div className={styles.arrowContainer}>
        <Link href="/">
          <FontAwesomeIcon
            icon={faCircleLeft}
            size="6x"
            className={styles.leftArrow}
            onClick={prevImagesHandler}
          />
        </Link>
      </div>
      <Link href="/">
        <FontAwesomeIcon
          icon={faCircleRight}
          size="6x"
          className={styles.rightArrow}
          onClick={nextImagesHandler}
        />
      </Link>
      <div className={styles.sliderContainer}>
        {/* {slides[current - 1]}
        {slides[current]}
        {slides[current + 1]} */}
        <Slides current={current} images={props.images}></Slides>
      </div>
    </div>
  );
}

export default SliderContainer;
