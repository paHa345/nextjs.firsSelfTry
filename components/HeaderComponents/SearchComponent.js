import styles from "./SearchComponent.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useRouter } from "next/router";

function SearchComponent() {
  const router = useRouter();
  const [searchText, setSearchText] = useState("Введите название");
  const changeSearchtextHandler = (e) => {
    setSearchText(e.target.value);
  };
  const searchHandler = (e) => {
    e.preventDefault();

    if (searchText === "" || searchText === "Введите название") {
      return;
    }
    router.push(`/search/${searchText}`);
  };

  const clickhandler = (e) => {
    e.preventDefault();
    setSearchText("");
  };

  return (
    <div className={styles.searchContainer}>
      <div className={styles.searchForm}>
        <div className={styles.searchInputContainer}>
          <input
            onChange={changeSearchtextHandler}
            className={styles.searchInput}
            onClick={clickhandler}
            placeholder={searchText}
          ></input>
        </div>
        <div className={styles.searchButton}>
          <div>
            <FontAwesomeIcon
              onClick={searchHandler}
              className={styles.menuIcons}
              icon={faMagnifyingGlass}
              size="2x"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchComponent;
