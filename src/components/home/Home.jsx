import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTemas } from "../../redux/temas/temas";
import { Footer } from "../footer/Footer";
import { SearchBar } from "../navbar/searchBar/SearchBar";
import { Temas } from "./basedeconocimiento/Temas/Temas";
import styles from "./basedeconocimiento/Temas/temas.module.scss"
import { FilterBar } from "./FilterBar/FilterBar";
export const Home = () => {
  const dispatch = useDispatch();

  const {user}=useSelector(state=>state.user)
  const id=user?.id||null
  useEffect(() => {
    if(id)
    {
      
      dispatch(fetchTemas({id}));
    }
    else{
      dispatch(fetchTemas({}));

    }
  }, [dispatch]);
  return (
    
    <div className={styles.cards}>

      <SearchBar></SearchBar> 
      <FilterBar></FilterBar>
      <Temas></Temas>
    </div>
  );
};
