import { useState, createContext } from 'react';

export const FavoritesContext = createContext();

const FavoritesContextProvider = (props) =>{

    const[favoritesUsers,setFavoritesUsers] = useState([]);


    const addToFavorites = (user)=>{
        if(!(favoritesUsers.includes(user))){
          favoritesUsers.push(user);
          setFavoritesUsers(favoritesUsers=>[...favoritesUsers]);
        }
        else{
          let index=favoritesUsers.indexOf(user);
          favoritesUsers.splice(index,1);
          setFavoritesUsers(favoritesUsers=>[...favoritesUsers]);
        }
        localStorage.setItem('favoritesUsers', JSON.stringify(favoritesUsers));
      }


    return(
        <FavoritesContext.Provider value={{favoritesUsers,setFavoritesUsers,addToFavorites}}>
            {props.children}
        </FavoritesContext.Provider>
    );

}

export default FavoritesContextProvider;

