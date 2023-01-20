import styles from "./SearchComponent.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useRouter } from "next/router";

function SearchComponent(props) {
  const router = useRouter();
  const [searchText, setSearchText] = useState("");
  const changeSearchtextHandler = (e) => {
    setSearchText(e.target.value);
  };
  const searchHandler = (e) => {
    e.preventDefault();
    console.log("Search");
    console.log(searchText);
    router.push(`/search/${searchText}`);
  };

  return (
    <div className={styles.searchContainer}>
      <form className={styles.searchForm} onSubmit={searchHandler}>
        <div className={styles.searchInputContainer}>
          <input
            onChange={changeSearchtextHandler}
            className={styles.searchInput}
            placeholder="Введите название товара"
          ></input>
        </div>
        <div className={styles.searchButton}>
          <button>
            <FontAwesomeIcon
              className={styles.menuIcons}
              icon={faMagnifyingGlass}
              size="4x"
            />
          </button>
        </div>
      </form>
    </div>
  );
}

export default SearchComponent;
