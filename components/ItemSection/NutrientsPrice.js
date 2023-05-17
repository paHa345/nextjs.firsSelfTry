import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../store/cartSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquareCaretRight,
  faSquareCaretLeft,
} from "@fortawesome/free-regular-svg-icons";
import styles from "./NutrientsPrice.module.css";

function NutrientsPrice(props) {
  const [currentImage, setCurrentImage] = useState(props.currentItem.image[0]);
  const [imageArr, setImageArr] = useState([...props.currentItem.image]);
  console.log(imageArr);

  const [numberImage, setNumberImage] = useState(0);
  const [itemQuantity, serItemQuantity] = useState(1);
  const dispatch = useDispatch();
  const item = useSelector((state) => state.item.item);
  const addToCartHandler = (e) => {
    e.preventDefault();

    dispatch(
      cartActions.addItemToCart({
        item: props.currentItem,
        quantity: itemQuantity,
      })
    );
    dispatch(cartActions.setCartItemsAmount(localStorage.getItem("cartItems")));
  };

  const clickSmallImageHandler = (e) => {
    e.preventDefault();

    setCurrentImage(e.target.dataset.image);
  };

  const shiftLeftHandler = (e) => {
    e.preventDefault();
    console.log("Left");
    if (numberImage === 0) {
      return;
    }
    setNumberImage((prev) => {
      return prev + 1;
    });
  };

  const shiftRightHandler = (e) => {
    e.preventDefault();
    console.log(props.currentItem.image.length);
    console.log(numberImage);

    if (numberImage * -1 > props.currentItem.image.length - 3) {
      return;
    }

    setNumberImage((prev) => {
      return prev - 1;
    });
  };

  const smallImages = imageArr.map((el, index) => {
    const translate = 15 * index + numberImage * 15;

    return (
      <Link
        className={styles.smallImageLink}
        href={"/"}
        onClick={clickSmallImageHandler}
        style={{
          transform: `translateX(${translate}rem)`,
        }}
        key={`${props.currentItem.id}_${props.currentItem.image[index]}`}
      >
        <Image
          className={styles.smallImage}
          data-image={el}
          data-imageNumber={index}
          src={el}
          alt={el}
          height={250}
          width={150}
          // layout="fill"
          // objectFit="contain"
        />
      </Link>
    );
  });

  return (
    <div className={styles.itemInfoElement}>
      <div className={styles.itemInfoDescription}>
        <div className={styles.itemDescriptionImages}>
          <Image
            className={styles.bigImage}
            src={currentImage}
            alt={currentImage}
            height={500}
            width={200}
            // layout="fill"
            // objectFit="contain"
          />
          <div className={styles.smallImagesSection}>
            <div className={styles.arrowLeftContainer}>
              <Link href={"/"} onClick={shiftLeftHandler}>
                <Image
                  src="/img/left100.png"
                  alt="leftArrow"
                  height={50}
                  width={50}
                ></Image>
                {/* <FontAwesomeIcon icon={faSquareCaretLeft} size="4x" /> */}
              </Link>
            </div>
            <div className={styles.smallImagesContainer}>{smallImages}</div>
            <div className={styles.arrowRightContainer}>
              <Link href={"/"} onClick={shiftRightHandler}>
                <Image
                  src="/img/right100.png"
                  alt="rightArrow"
                  height={50}
                  width={50}
                ></Image>{" "}
              </Link>
            </div>
          </div>
        </div>
        <div className={styles.itemDescriptionComponents}>
          <p className={styles.itemDescriptionHead}>Состав:</p>

          <div className={styles.componentsTable}>
            <dl className={styles.componentsTableElement}>
              <dt className={styles.componentsTableNutrient}>Белки</dt>
              <dd className={styles.componentsTableNutrientValue}>
                <span>{props.currentItem.nutrients.protein}</span> гр
              </dd>
            </dl>
            <dl className={styles.componentsTableElement}>
              <dt className={styles.componentsTableNutrient}>Жиры</dt>
              <dd className={styles.componentsTableNutrientValue}>
                <span>{props.currentItem.nutrients.fat}</span> гр
              </dd>
            </dl>
            <dl className={styles.componentsTableElement}>
              <dt className={styles.componentsTableNutrient}>Углеводы</dt>
              <dd className={styles.componentsTableNutrientValue}>
                <span>{props.currentItem.nutrients.carbohydrates}</span> гр
              </dd>
            </dl>
          </div>
        </div>
      </div>
      <div className={styles.itemInfoPrice}>
        <p>
          Цена{" "}
          <span className={styles.itemInfoPriceValue}>
            {" "}
            {props.currentItem.price}{" "}
          </span>
          ₽
        </p>
        <div className={styles.productCardButton}>
          <Link href="/" onClick={addToCartHandler}>
            В корзину
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NutrientsPrice;
