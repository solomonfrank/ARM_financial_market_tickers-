import moment from "moment";
import React from "react";
import { FiClock } from "react-icons/fi";
import { useHistory } from "react-router";

const NewList = ({ news }) => {
  const history = useHistory();
  return (
    <div
      className="latest__list"
      onClick={() => history.push(`/news/${news.uuid}`)}
    >
      <div className="latest__content">{news?.title ?? ""}</div>
      <div className="latest__meta">
        <span className="iconBox">
          <FiClock color="#005594" />
        </span>
        <span className="news__date">
          {moment(news?.published_at ?? new Date()).fromNow()}
        </span>
      </div>
    </div>
  );
};

export default NewList;
