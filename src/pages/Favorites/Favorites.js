import React from "react";
import Text from "components/Text";
import {UserList} from "components/UserList";
import FavoritesList from "components/FavoritesList"
import { usePeopleFetch } from "hooks";
import * as S from "./style";

const Favorites = () => {
  const { favoritesUsers } = usePeopleFetch();

  return (
    <S.Home>
      <S.Content>
        <S.Header>
          <Text size="64px" bold>
            Favorites
          </Text>
        </S.Header>
        <FavoritesList favoritesUsers={favoritesUsers}/>
      </S.Content>
    </S.Home>
  );
};

export default Favorites;
