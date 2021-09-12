import React, { useContext, useEffect, useState } from "react";
import "react-dropdown/style.css";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { getAllNews, getSimilarNews } from "../api/news";
import Loader from "../assets/imgs/Loader.gif";
import ErrorFallback from "../components/ErrorBoundary";
import Header from "../components/Header";
import NewsHeader from "../components/NewsHeader";
import NewsItem from "../components/NewsItem";
import NewList from "../components/NewsItem/NewList";
import NewSlide from "../components/NewsSlide";
import { Context } from "../store";
import "./index.scss";

const Landing = () => {
  const { state, dispatch } = useContext(Context);
  const [trending, setTrending] = useState(null);
  const [isLoadingRelated, setIsLoadingRelated] = useState(false);
  const fetchNews = async () => {
    try {
      dispatch({ type: "LOADING" });
      const {
        data: { data },
      } = await getAllNews();
      setTrending(data[0]);
      dispatch({ type: "GET_ALL_NEWS", payload: data });
    } catch (err) {
      dispatch({
        type: "ERROR",
        payload: err.response?.data ?? "Something went wrong",
      });
    }
  };

  const fetchSimilarNews = async (id) => {
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
  }, [dispatch]);

  useEffect(() => {
    if (trending) {
      fetchSimilarNews(trending?.uuid);
    }
  }, [trending]);

  const renderFeaturedNews = () => {
    if (state.loading)
      return (
        <div>
          <img src={Loader} alt="fetch loader" />
        </div>
      );
    if (state.loading === false && state.length === 0)
      return <div>No data</div>;
    if (state.news.length > 0) {
      return (
        <Carousel
          infiniteLoop={true}
          showThumbs={false}
          showStatus={false}
          swipeable
        >
          {state.news.slice(0, 1).map((item) => (
            <NewSlide news={item} key={item.uuid} />
          ))}
        </Carousel>
      );
    }

    if (state.error)
      return (
        <ErrorFallback
          error={state.error}
          resetErrorBoundary={() => fetchNews()}
        />
      );
  };

  const renderRelatedNew = () => {
    if (isLoadingRelated)
      return (
        <div>
          <img src={Loader} alt="fetch loader" />
        </div>
      );
    if (state.loading === false && state.similarNews === 0)
      return <div>No data</div>;
    if (state.similarNews && state.similarNews.length > 0) {
      return (
        <>
          <NewsHeader news={trending} />
          <div className="latest__container">
            <div className="latest__list">
              {state?.similarNews?.slice(1).map((item) => (
                <NewList news={item} key={item.uuid} />
              ))}
            </div>
          </div>
        </>
      );
    }
  };

  return (
    <div>
      <Header />
      <div className="main">
        <div className="main_container">
          <div className="container__left">
            <div className="new__container">
              <div className="news_slide">{renderFeaturedNews()}</div>
            </div>
            <div className="news__list_wrapper">
              <div className="news__list">
                {state.loading ? (
                  <div />
                ) : (
                  state.news.slice(1).map((item) => (
                    <div className="news__list_links" key={item.uuid}>
                      <NewsItem news={item} />
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
          <div className="container__right">
            <div className="container__news">
              <h5 className="latest__header">Latest News</h5>
              {renderRelatedNew()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
