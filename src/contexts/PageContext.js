import { useState, createContext } from 'react';

export const PageContext = createContext();


const PageContextProvider = (props) =>{

    const [pageNumber,setPageNumber] = useState(1);

    return(
        <PageContext.Provider value={{pageNumber,setPageNumber}}>
            {props.children}
        </PageContext.Provider>
    );

}

export default PageContextProvider;

