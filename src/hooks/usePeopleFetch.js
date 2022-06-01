import { useState, useEffect, useContext } from "react";
import axios from "axios";
import {NationalitiesContext} from "../contexts/NationalitiesContext";
import {PageContext} from "../contexts/PageContext";

export const usePeopleFetch = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const {nationalities} = useContext(NationalitiesContext);
  const {pageNumber,setPageNumber} = useContext(PageContext);

  useEffect(() => {
    users.length  = 0;
    setPageNumber(1);
    fetchUsers();

  }, [nationalities]);

  useEffect(() => {
    fetchUsers();
  }, [pageNumber]);

  
  async function fetchUsers() {
    setIsLoading(true);
    const response = await axios.get(`https://randomuser.me/api/?results=10&page=${pageNumber}&nat=${nationalities.join()}`);
    setIsLoading(false);
    setUsers([...users,...response.data.results]);

   
   
  }

  return { users, isLoading, fetchUsers};
};
