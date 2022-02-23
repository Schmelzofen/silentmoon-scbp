import Card from "../Card/Card";

const BreathMusicList = ({ music }) => {
  let content;

  content = music?.map((list, index) => {
    return (
      <Card
        to={list.id}
        src={list.images[0]?.url}
        name={list?.name}
        key={index}
      />
    );
  });

  return <>{content}</>;
};

export default BreathMusicList;
