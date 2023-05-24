import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./PaginationSection.module.css";

function PaginationSection(props) {
  const router = useRouter();
  const numbers = [];

  for (let i = 1; i <= Math.ceil(props.itemsQuantity / 4); i++) {
    numbers.push(i);
  }

  console.log(router);
  console.log(props);

  const pagesLinks = numbers.map((el, index) => {
    return (
      <div
        key={`${index}-${props.type}`}
        className={`${styles.pageElemant} ${
          Number(router.query.page) === index + 1 ? styles.activePageLink : ""
        }`}
      >
        {router.query.productType && (
          <Link
            href={`${
              props.search
                ? `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/search/${
                    router.query.searchText
                  }?page=${index + 1}${
                    router.query.sortBy ? `&sortBy=${router.query.sortBy}` : ""
                  }`
                : `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/catalog/${
                    router.query.productType
                  }?page=${index + 1}${
                    router.query.sortBy ? `&sortBy=${router.query.sortBy}` : ""
                  }`
            }`}
            className={styles.pageNumber}
          >
            {el}
          </Link>
        )}

        {router.query.searchText && (
          <Link
            href={`${
              props.search
                ? `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/search/${
                    router.query.searchText
                  }?page=${index + 1}${
                    router.query.sortBy ? `&sortBy=${router.query.sortBy}` : ""
                  }`
                : `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/catalog/${
                    router.query.productType
                  }?page=${index + 1}${
                    router.query.sortBy ? `&sortBy=${router.query.sortBy}` : ""
                  }`
            }`}
            className={styles.pageNumber}
          >
            {el}
          </Link>
        )}

        {!router.query.productType && !router.query.searchText && (
          <Link
            href={`${
              props.search
                ? `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/search/?page=${
                    index + 1
                  }${
                    router.query.sortBy ? `&sortBy=${router.query.sortBy}` : ""
                  }`
                : `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/catalog/?page=${
                    index + 1
                  }${
                    router.query.sortBy ? `&sortBy=${router.query.sortBy}` : ""
                  }`
            }`}
            className={styles.pageNumber}
          >
            {el}
          </Link>
        )}
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
