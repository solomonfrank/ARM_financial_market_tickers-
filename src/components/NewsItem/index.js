import moment from "moment";
import React from "react";
import { FiClock } from "react-icons/fi";
import { useHistory } from "react-router";
import "./index.scss";

const NewsItem = ({ news }) => {
  const history = useHistory();
  return (
    <div
      className="news__list_item"
      onClick={() => history.push(`/news/${news.uuid}`)}
    >
      <div className="news__imgBox">
        <img
          src={news.image_url}
          alt="news list"
          className="news__list_item_img"
        />
        {/* <span className="news__tag">ICT</span> */}
      </div>

      <div className="news__list_item_content">
        <h4 className="news__item_title">{news.title}</h4>
        <div className="news__item_date">
          <span className="iconBox">
            <FiClock />
          </span>
          <span>{moment(news.published_at).fromNow()}</span>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;
