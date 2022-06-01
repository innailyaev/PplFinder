import React, { useEffect, useState, useContext, useRef, useCallback} from "react";
import Text from "components/Text";
import Spinner from "components/Spinner";
import CheckBox from "components/CheckBox";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import * as S from "./style";
import {NationalitiesContext} from "../../contexts/NationalitiesContext";
import {FavoritesContext} from "../../contexts/FavoritesContext";
import {PageContext} from "../../contexts/PageContext";
import * as C from "../../constant";

const UserList = ({ users, isLoading }) => {

  const [hoveredUserId, setHoveredUserId] = useState();
  const {nationalities,setNationalities,handleCheckboxChange} = useContext(NationalitiesContext);
  const {favoritesUsers,setFavoritesUsers,addToFavorites} = useContext(FavoritesContext);
  const {setPageNumber} = useContext(PageContext);
  const observer = useRef();

  const lastUserElementRef = useCallback(node => {
    if (observer.current) {
      observer.current.disconnect();
    }
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setPageNumber(prevPageNumber=>prevPageNumber+1);
      }
    })
    if (node) observer.current.observe(node);
  }, []);


  const handleMouseEnter = (index) => {
    setHoveredUserId(index);
  };

  const handleMouseLeave = () => {
    setHoveredUserId();
  };

  
  useEffect(() => {
     setFavoritesUsers((JSON.parse(localStorage.getItem("favoritesUsers"))) || []);
  }, []);

  return (
    <S.UserList>
      <S.Filters>{
        C.NATIONS.map((nation,index)=>{
          return <CheckBox key={index} value={nation.value} label={nation.label} onChange={handleCheckboxChange}/>
        })
        }
      </S.Filters>
      <S.List>
        {users.map((user, index) => {
          return (
            <S.User
              ref={index + 1 == users.length ? lastUserElementRef : null}
              key={index}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
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
                <IconButton onClick={() => addToFavorites(user)}>
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
