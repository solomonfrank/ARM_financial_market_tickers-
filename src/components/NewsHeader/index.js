import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useHistory } from "react-router";
import "./index.scss";

const NewsHeader = ({ news }) => {
  const history = useHistory();
  return (
    <div
      className="latest_news"
      onClick={() => history.push(`/news/${news.uuid}`)}
    >
      <LazyLoadImage
        className="news__list_item_img"
        alt="latest new"
        effect="blur"
        src={news?.image_url}
        placeholderSrc="https://picsum.photos/640/360"
      />
      <div className="latest__title">{news?.title}</div>
    </div>
  );
};

export default NewsHeader;
