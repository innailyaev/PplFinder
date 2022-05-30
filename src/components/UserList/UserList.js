import React, { useEffect, useState } from "react";
import Text from "components/Text";
import Spinner from "components/Spinner";
import CheckBox from "components/CheckBox";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import * as S from "./style";

const UserList = ({ users, isLoading,nationalities,setNationalities,favoritesUsers,setFavoritesUsers }) => {
  const [hoveredUserId, setHoveredUserId] = useState();

  const handleMouseEnter = (index) => {
    setHoveredUserId(index);
  };

  const handleMouseLeave = () => {
    setHoveredUserId();
  };

  const onMouseClick = (user)=>{
    if(!(favoritesUsers.includes(user))){
      favoritesUsers.push(user);
      setFavoritesUsers(favoritesUsers=>[...favoritesUsers]);
    }
    else{
      let index=favoritesUsers.indexOf(user);
      favoritesUsers.splice(index,1);
      setFavoritesUsers(favoritesUsers=>[...favoritesUsers]);
    }
    console.log(favoritesUsers);
    //localStorage.setItem('favoritesUsers', JSON.stringify(favoritesUsers));
  }

  const handleChange = (value,isChecked) => {
    if(isChecked){
      console.log(nationalities.includes(value));
      if(!(nationalities.includes(value))){
        nationalities.push(value);
        setNationalities(nationalities=>[...nationalities]);
      }
    }
    else{
      let index=nationalities.indexOf(value);
      nationalities.splice(index,1);
      setNationalities(nationalities=>[...nationalities]);
      console.log(nationalities);
    }
  }

  useEffect(() => {
    localStorage.setItem('favoritesUsers', JSON.stringify(favoritesUsers));
  }, [favoritesUsers]);

  return (
    <S.UserList>
      <S.Filters>
        <CheckBox value="BR" label="Brazil" onChange={handleChange}/>
        <CheckBox value="AU" label="Australia" onChange={handleChange} />
        <CheckBox value="CA" label="Canada" onChange={handleChange} />
        <CheckBox value="DE" label="Germany" onChange={handleChange} />
        <CheckBox value="FR" label="France" onChange={handleChange} /> 

      </S.Filters>
      <S.List>
        {users.map((user, index) => {
          return (
            <S.User
              key={index}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
              //onClick={() => handleMouseClick(user)}
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
              
              <S.IconButtonWrapper isVisible={index === hoveredUserId || favoritesUsers.includes(user) }>
                <IconButton onClick={() => onMouseClick(user)}>
                  <FavoriteIcon color="error" />
                </IconButton>
              </S.IconButtonWrapper>
            </S.User>
          );
        })}
        {isLoading && (
          <S.SpinnerWrapper>
            <Spinner color="primary" size="45px" thickness={6} variant="indeterminate" />
          </S.SpinnerWrapper>
        )}
      </S.List>
    </S.UserList>
  );
};

export default UserList;
