import Logo from "../../components/UI/Logo";
import Pcard from "../../components/UI/Pcard";
import DataLocalStorage from "../../components/LocalStorage/DataLocalStorage";
import FlexForFavs from "../../components/UI/FlexForFavs";
import ProfilePic from "../../components/UI/profile/ProfilePic";
import Footer from "../../components/footer/Footer";
import ProfileContent from "../../components/UI/profileContent/ProfileContent";

const Profile = () => {
  // fetche favorites
  return (
    <>
      <Logo />
      <Pcard>
        <ProfilePic />
        <ProfileContent />
        <h2>Your favorite lists</h2>
        <FlexForFavs>
          <DataLocalStorage />
        </FlexForFavs>
      </Pcard>
      <Footer />
    </>
  );
};

export default Profile;
