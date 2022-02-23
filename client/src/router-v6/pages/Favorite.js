import Footer from "../../components/footer/Footer";
import DataLocalStorage from "../../components/LocalStorage/DataLocalStorage";
import FlexForFavs from "../../components/UI/FlexForFavs";
import Logo from "../../components/UI/Logo";

const Favorite = () => {
  return (
    <>
      <Logo />
      <h1 style={{ textAlign: "center" }}>Favorites</h1>
      <FlexForFavs>
        <DataLocalStorage />
      </FlexForFavs>
      <Footer />
    </>
  );
};

export default Favorite;
