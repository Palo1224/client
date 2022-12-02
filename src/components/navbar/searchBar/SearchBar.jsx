import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTemas } from "../../../redux/temas/temas";
import styles from "./searchbar.module.scss";
import { CgSearch } from "react-icons/cg";
export const SearchBar = () => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  let id = user?.id || null;

  useEffect(() => {
  }, [search]);

  const handleChange = (e) => {
    e.preventDefault();

    if (e.target.value == "") {
      dispatch(fetchTemas({ search: "", id }));
      setSearch("");
    } else {
      setSearch(e.target.value);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      dispatch(fetchTemas({ search, id }));
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
    dispatch(fetchTemas({ search, id }));
  };
  return (
    <div className={styles.container}>
      <div className={styles.searchTerm}>
        <input
          value={search}
          type="search"
          placeholder="Buscar problemas..."
          onChange={(e) => handleChange(e)}
          onKeyPress={handleKeyPress}
          aria-label="Search"
        />

        <button
          className={styles.BtnSearch}
          onClick={(e) => handleSubmit(e)}
          type="submit"
        >
          <CgSearch />
        </button>
      </div>
    </div>
  );
};
