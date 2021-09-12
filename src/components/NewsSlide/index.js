import React from "react";
import { useHistory } from "react-router";
import "./index.scss";

const NewSlide = ({ news }) => {
  const history = useHistory();
  const style = {
    backgroundImage: `linear-gradient(
    to right bottom,
    rgba(0,0,0,0.3),
    rgba(0,0,0,0.3)
), url(${news.image_url})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    height: "500px",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
    justifyContent: "flex-end",
  };

  const truncateWithEllipses = (str, length, ending) => {
    if (length == null) {
      length = 100;
    }
    if (ending == null) {
      ending = "...";
    }
    if (str.length > length) {
      return str.substring(0, length - ending.length) + ending;
    } else {
      return str;
    }
  };
  return (
    <div
      className="slider_wrap"
      style={style}
      onClick={() => history.push(`/news/${news.uuid}`)}
    >
      <div className="slide_container">
        <div className="slider_wrap_title">{news.title}</div>
        <div className="slider_wrap_description">
          {truncateWithEllipses(news.description, 100)}
        </div>
      </div>
    </div>
  );
};

export default NewSlide;
