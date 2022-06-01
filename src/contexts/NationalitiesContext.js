import { useState, createContext } from 'react';

export const NationalitiesContext = createContext();


const NationalitiesContextProvider = (props) =>{

    const [nationalities,setNationalities] = useState([]);


    const handleCheckboxChange = (value,isChecked) => {
        if(isChecked){
          if(!(nationalities.includes(value))){
            nationalities.push(value);
            setNationalities(nationalities=>[...nationalities]);
          }
        }
        else{
          const filteredNations = nationalities.filter(nation => nation !== value);
          setNationalities(filteredNations);}
      }

    return(
        <NationalitiesContext.Provider value={{nationalities,setNationalities,handleCheckboxChange}}>
            {props.children}
        </NationalitiesContext.Provider>
    );

}

export default NationalitiesContextProvider;

