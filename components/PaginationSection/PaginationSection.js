import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import styles from "./PaginationSection.module.css";

function PaginationSection(props) {
  const router = useRouter();
  const sort = useSelector((state) => state.item.sortBy);

  const numbers = [];

  for (let i = 1; i <= Math.ceil(props.itemsQuantity / 4); i++) {
    numbers.push(i);
  }

  const pagesLinks = numbers.map((el, index) => {
    return (
      <div
        key={`${index}-${props.type}`}
        className={`${styles.pageElemant} ${
          Number(router.query.page) === index + 1 ? styles.activePageLink : ""
        }`}
      >
        <Link
          href={`${process.env.NEXTAUTH_URL}/catalog/${
            router.query.productType
          }?page=${index + 1}${
            router.query.sortBy ? `&sortBy=${router.query.sortBy}` : ""
          }`}
          className={styles.pageNumber}
        >
          {el}
        </Link>
      </div>
    );
  });

  return (
    <div>
      <div className={styles.paginationContainer}>{pagesLinks}</div>
    </div>
  );
}

export default PaginationSection;
