import React from "react";
import Text from "components/Text";
import FavoritesList from "components/FavoritesList";
import UserList from "components/UserList";
import * as S from "./style";

const Favorites = () => {

    const { favoritesUsers} = UserList();


  return (
    <S.Home>
      <S.Content>
        <S.Header>
          <Text size="64px" bold>
            PplFinder
          </Text>
        </S.Header>
        <FavoritesList favoritesUsers={favoritesUsers} isLoading={isLoading} />
      </S.Content>
    </S.Home>
  );
};

export default Favorites;
