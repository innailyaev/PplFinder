import { useState, useEffect } from "react";
import axios from "axios";

export const usePeopleFetch = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [nationalities,setNationalities] = useState([]);
  const[favoritesUsers,setFavoritesUsers] = useState([]);



  useEffect(() => {
    fetchUsers();
  }, [nationalities]);

  useEffect(() => {
    const favoritesUsers = JSON.parse(localStorage.getItem('favoritesUsers'));
    if (favoritesUsers) {
      setFavoritesUsers(favoritesUsers);
    }
  }, []);

  async function fetchUsers() {
    setIsLoading(true);
    const response = await axios.get(`https://randomuser.me/api/?results=25&page=1&nat=${nationalities.join()}`);
    setIsLoading(false);
    setUsers(response.data.results);
   
  }

  return { users, isLoading, fetchUsers,nationalities,setNationalities,favoritesUsers,setFavoritesUsers};
};
