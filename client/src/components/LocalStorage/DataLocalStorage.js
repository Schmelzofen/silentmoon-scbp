import { useState, useEffect, useContext } from "react";
import { useHttpClient } from "../../hooks/http-hook";
import LoadingSpinner from "../UI/spinner/LoadingSpinner";
import Card from "../UI/Card/Card";
import TokenContent from "../../store/token-provider";

const DataLocalStorage = () => {
  const [fetchedMusic, setFetchedMusic] = useState([]);
  const { isLoading, error, sendRequest } = useHttpClient();
  const tokenCtx = useContext(TokenContent)

  useEffect(() => {
    const fetchedData = async () => {
      let id;
      id = tokenCtx?.token?.user?._id ? tokenCtx?.token?.user?._id : tokenCtx?.token?.findUser?._id
      if (id) {
        console.log(id)
        try {
          const responseData = await sendRequest(`/api/favorite/${id}`);
          console.log(responseData)
          setFetchedMusic(() => responseData.list);
        } catch (e) { }
      }
    };

    fetchedData();
    console.log("favorite");
  }, [sendRequest, tokenCtx]);

  console.log(fetchedMusic);

  let content;

  if (error) {
    content = <h1>cant fetch data</h1>;
  }

  if (!error && isLoading) {
    content = <LoadingSpinner asOverlay />;
  }

  if (!error && !isLoading && fetchedMusic.length > 0) {
    console.log(fetchedMusic.length);
    content = fetchedMusic?.map((list, index) => {
      return (
        <Card
          to={list?.id}
          // src={list.images[0]?.url}
          src={list?.src}
          name={list?.name}
          key={index}
        />
      );
    });
  }

  if (!error && !isLoading && fetchedMusic.length === 0) {
    console.log("no data");
    content = <p>no favorites added</p>;
  }

  return <>{content}</>;
};

export default DataLocalStorage;
