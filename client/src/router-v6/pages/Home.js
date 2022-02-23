import { useState, useEffect, useContext } from "react";
import Logo from "../../components/UI/Logo";
import LoadingSpinner from "../../components/UI/spinner/LoadingSpinner";
import Card from "../../components/UI/Card/Card";
import Pcard from "../../components/UI/Pcard";
import MoveList from "../../components/UI/MoveList";
import Footer from "../../components/footer/Footer";
import { useHttpClient } from "../../hooks/http-hook";
import { SwiperSlide } from "swiper/react";
import "swiper/css";
import classes from "./Home.module.css";
import TokenContent from "../../store/token-provider";
import MusicContent from "../../store/musicProvider"

const Home = () => {
  const { isLoading, error, sendRequest } = useHttpClient();
  const tokenCtx = useContext(TokenContent);
  const music = useContext(MusicContent)

  let favoriteListContent;
  let swiperFavContent;
  let swiperMediContent;
  let swiperYogaContent;



  if (!music.favorites) {
    favoriteListContent = <p>You dont have any favorites</p>;
  } else {
    favoriteListContent = music.favorites?.map((list, index) => {
      console.log(list.src);
      return (
        <SwiperSlide key={index} tag="li">
          <Card
            to={list.id}
            /* src={list.images[0]?.url} */
            src={list.src}
            name={list?.name}
          />
        </SwiperSlide>
      );
    });

    swiperFavContent = (
      <MoveList spaceBetween={20} slidesPerView={2}>
        {favoriteListContent}
      </MoveList>
    );
  }

  swiperYogaContent = (
    <MoveList spaceBetween={150} slidesPerView={3}>
      {music.yoga.length !== 0 &&
        music.yoga?.map((list, index) => {
          return (
            <SwiperSlide key={index} tag="li">
              <Card
                to={list.id}
                /*src={list.images[0]?.url}*/ src={list.images[0]?.url}
                name={list?.name}
              />
            </SwiperSlide>
          );
        })}
    </MoveList>
  );

  swiperMediContent = (
    <MoveList spaceBetween={150} slidesPerView={3}>
      {music.meditation.length !== 0 &&
        music.meditation?.map((list, index) => {
          return (
            <SwiperSlide key={index} tag="li">
              <Card to={list.id} src={list.images[0]?.url} name={list?.name} />
            </SwiperSlide>
          );
        })}
    </MoveList>
  );

  return (
    <>
      <Logo />
      <Pcard>
        {error && <h1>Cant Find Data :/</h1>}
        {!error && isLoading && <LoadingSpinner asOverlay />}
        {!error && !isLoading && (
          <>
            <h2>{`Hello ${tokenCtx?.token?.user?.name ? tokenCtx?.token?.user?.name : tokenCtx?.token?.findUser?.name}`}</h2>
            <p className={classes.par}>We hope you have a good day!</p>
            <div className={classes.recommented}>
              <h3>Favorite List</h3>
              {swiperFavContent}
            </div>
            <div className={classes.recommented}>
              <h3>Recomended Yoga for you</h3>
              {swiperYogaContent}
            </div>
            <div className={` ${classes.last}`}>
              <h3>Recomended Meditation for you</h3>
              {swiperMediContent}
            </div>
          </>
        )}
      </Pcard>
      <Footer />
    </>
  );
};

export default Home;
