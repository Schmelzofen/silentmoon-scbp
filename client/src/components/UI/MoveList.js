import { Swiper } from "swiper/react";
import "swiper/css";

const MoveList = (props) => {
  return (
    <Swiper
      tag="ul"
      spaceBetween={props.spaceBetween}
      slidesPerView={props.slidesPerView}
      className="mySwiper"
    >
      {props.children}
    </Swiper>
  );
};

export default MoveList;
