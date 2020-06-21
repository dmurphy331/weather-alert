import React, { useEffect, useState } from "react";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { Link, useParams } from "react-router-dom";

const DetailView = () => {
  const [data, setData] = useState({
    weather: null,
    fetched: false,
  });

  let { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?id=${id}&appid=c9607fe011ee26826aec9cb58ca5f815`
      ).then((res) => res.json());
      setData({
        weather: data,
        fetched: true,
      });
    };
    fetchData();
  }, [id]);

  return (
    <>
      {data.fetched ? (
        <>
          <Link to="/">
            <ArrowBackIosIcon />
          </Link>
          <h1>{data.weather.name}</h1>
        </>
      ) : (
        <h3>Loading.....</h3>
      )}
    </>
  );
};

export default DetailView;
