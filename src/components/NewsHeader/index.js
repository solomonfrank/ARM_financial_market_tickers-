import React from "react";
import { useHistory } from "react-router";
import "./index.scss";

const NewsHeader = ({ news }) => {
  const history = useHistory();
  return (
    <div
      className="latest_news"
      onClick={() => history.push(`/news/${news.uuid}`)}
    >
      <img src={news?.image_url} alt="latest new" className="latest__new_img" />
      <div className="latest__title">{news?.title}</div>
    </div>
  );
};

export default NewsHeader;
