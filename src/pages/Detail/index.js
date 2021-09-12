import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import "react-dropdown/style.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useParams } from "react-router";
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
import { getNews, getSimilarNews } from "../../api/news";
import Loader from "../../assets/imgs/Loader.gif";
import Header from "../../components/Header";
import NewsItem from "../../components/NewsItem";
import { Context } from "../../store";
import "./index.scss";

const Detail = () => {
  const { id } = useParams();
  const { state, dispatch } = useContext(Context);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingRelated, setIsLoadingRelated] = useState(false);

  const localDomain =
    process.env.NODE_ENV === "production"
      ? `${process.env.REACT_APP_FRONTEND_URL}/news/${id}`
      : `http:localhost:3000/news/${id}`;
  const fetchNews = async () => {
    try {
      setIsLoading(true);
      const { data } = await getNews(id);
      setIsLoading(false);

      dispatch({ type: "GET_SINGLE_NEWS", payload: data });
    } catch (err) {
      setIsLoading(false);
      dispatch({
        type: "ERROR",
        payload: err.response?.data ?? "Something went wrong",
      });
    }
  };
  const fetchSimilarNews = async () => {
    try {
      setIsLoadingRelated(true);
      const {
        data: { data },
      } = await getSimilarNews(id);
      setIsLoadingRelated(false);
      dispatch({ type: "GET_SIMILAR_NEWS", payload: data });
    } catch (err) {
      setIsLoadingRelated(false);
      dispatch({
        type: "ERROR",
        payload: err.response?.data ?? "Something went wrong",
      });
    }
  };

  useEffect(() => {
    fetchNews();
    fetchSimilarNews();
  }, [id]);

  const renderRelatedNew = () => {
    if (isLoadingRelated)
      return (
        <div>
          <img src={Loader} alt="fetch loader" />
        </div>
      );
    if (state.loading === false && state.similarNews === 0)
      return <div>No data</div>;
    if (state.similarNews.length > 0)
      return (
        <div className="news_left_cont">
          {state?.similarNews?.map((item) => (
            <NewsItem news={item} key={item.uuid} />
          ))}
        </div>
      );
  };

  return (
    <div>
      <Header />
      <div className="main">
        <div className="main_container">
          <div className="container__left">
            {isLoading ? (
              <div>
                <img src={Loader} alt="fetch loader" />
              </div>
            ) : (
              <div className="content__wrapper">
                <h2 className="detail__title">{state.singleNews?.title}</h2>
                <div className="news__date_publish">
                  <p>
                    <time
                      dateTime={state.singleNews?.published_at}
                      className="time_publish"
                    >
                      Published{" "}
                      {moment(state.singleNews?.published_at).format(
                        "dddd DD MMMM YYYY"
                      )}
                    </time>
                  </p>
                </div>
                <img
                  src={state.singleNews?.image_url ?? ""}
                  alt="new logo"
                  className="news__imageurl"
                />
                <div className="new__content_box">
                  {state.singleNews?.description ?? ""}
                </div>

                <div className="social-share">
                  <span className="social-share-item">
                    <LinkedinShareButton
                      url={localDomain}
                      title={state.singleNews?.title}
                    >
                      <LinkedinIcon round size={40} />
                    </LinkedinShareButton>
                  </span>
                  <span className="social-share-item">
                    <FacebookShareButton
                      url={localDomain}
                      title={state.singleNews?.title}
                    >
                      <FacebookIcon round size={40} />
                    </FacebookShareButton>
                  </span>
                  <span className="social-share-item">
                    <WhatsappShareButton
                      url={localDomain}
                      title={state.singleNews?.title}
                    >
                      <WhatsappIcon round size={40} />
                    </WhatsappShareButton>
                  </span>
                </div>
              </div>
            )}
          </div>
          <div className="container__right">
            <h5 className="latest__header">Related News</h5>
            {renderRelatedNew()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
