import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTemas } from "../../../redux/temas/temas";
import styles from "./searchBarAdmin.module.scss";
import { CgSearch } from "react-icons/cg";
import { fetchUsers } from "../../../redux/user/users";
export const SearchBarAdmin = () => {
  const searchLocal = JSON.parse(localStorage.getItem('search'))

  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const select = JSON.parse(localStorage.getItem('select'))
  const estado = JSON.parse(localStorage.getItem('estado'))
  const bussi = JSON.parse(localStorage.getItem("empresa"));
  const {user}=useSelector(state=>state.user)
  let id=user?.id||null
   useEffect(()=>{
      dispatch(fetchTemas({search}))
   },[search])
  localStorage.setItem('search', JSON.stringify(search));

  const handleChange = (e) => {
    e.preventDefault()

    
    if(select=="Base de Conocimiento")
    { 
      e.preventDefault()

      if(e.target.value=="")
      {
        setSearch("");
        dispatch(fetchTemas({search:"",id}))

      }
      else{
        setSearch(e.target.value);

        dispatch(fetchTemas({ search: e.target.value }));
      }
      

    }
    else {
      if(e.target.value=="")
      {
        e.preventDefault()

        dispatch(fetchUsers({ search:"",estado:estado,empresas:bussi }));
        setSearch("");

      }
      else{
        
        setSearch(e.target.value);
        dispatch(fetchUsers({ search: e.target.value,estado:estado,empresas:bussi }));
      }

    }


  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if(select=="Base de Conocimiento")
      {
        
      dispatch(fetchTemas({ search ,id}));
      
    }
    else {
      dispatch(fetchUsers({ search:search,estado:estado,empresas:bussi }));

    }
  }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
    if(select=="Base de Conocimiento")
    { 
      e.preventDefault()


        dispatch(fetchTemas({ search}));
      
    

    }
    else {

     
        setSearch(e.target.value);
        dispatch(fetchUsers({ search,estado:estado,empresas:bussi }));
      

    }
  };
  
  const { temas } = useSelector((state) => state.temas);
  const { users } = useSelector((state) => state.user);

  return (
    <div>
   
      <div className={styles.searchTerm}>
        <input
          type="search"
          placeholder="Buscar..."
          value={search}
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
