import React,{useState} from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { Home , Favorites} from "pages";
import { ThemeProvider } from "theme";
import NavBar from "components/NavBar";
import NationalitiesContext from "./contexts/NationalitiesContext";
import  FavoritesContext  from "./contexts/FavoritesContext";
import PageContext from "./contexts/PageContext";

const AppRouter = () => {


  return (
    <ThemeProvider>
      <NationalitiesContext>
        <FavoritesContext>
          <PageContext>
            <Router>
              <NavBar />
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/Favorites" component={Favorites} />
              </Switch>
            </Router>
      </PageContext>
      </FavoritesContext>
      </NationalitiesContext>
    </ThemeProvider>
  );
};

export default AppRouter;
