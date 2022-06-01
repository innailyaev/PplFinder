import React, { useEffect, useState, useContext } from "react";
import Text from "components/Text";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import * as S from "./style";
import {FavoritesContext} from "../../contexts/FavoritesContext";


const FavoritesList = () => {

  const {favoritesUsers, setFavoritesUsers} = useContext(FavoritesContext);

  useEffect(() => {
    setFavoritesUsers(JSON.parse(localStorage.getItem("favoritesUsers")));
  }, [favoritesUsers]);

  const onMouseClick = (user) =>{
    const filteredUsers = favoritesUsers.filter(favorite => favorite !== user);
    localStorage.setItem('favoritesUsers', JSON.stringify(filteredUsers));
  }


  return (
    <S.UserList>
      <S.List>
        {favoritesUsers?.map((user, index) => {
          return (
            <S.User
              key={index}
            >
              <S.UserPicture src={user?.picture.large} alt="" />
              <S.UserInfo>
                <Text size="22px" bold>
                  {user?.name.title} {user?.name.first} {user?.name.last}
                </Text>
                <Text size="14px">{user?.email}</Text>
                <Text size="14px">
                  {user?.location.street.number} {user?.location.street.name}
                </Text>
                <Text size="14px">
                  {user?.location.city} {user?.location.country}
                </Text>
              </S.UserInfo>
              
              <S.IconButtonWrapper isVisible={true}>
                <IconButton onClick={() => onMouseClick(user)}>
                  <FavoriteIcon color="error" />
                </IconButton>
              </S.IconButtonWrapper>
            </S.User>
          );
        })}
      </S.List>
    </S.UserList>
  );
};

export default FavoritesList;
