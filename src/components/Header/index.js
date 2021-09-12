import React, { useContext, useEffect, useState } from "react";
import "react-dropdown/style.css";
import { FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";
import {
  getAllNews,
  getEntityTypes,
  getExchanges,
  getIndustries,
} from "../../api/news";
import countryList from "../../constants/countries";
import { Context } from "../../store";
import { Dropdown, DropdownMenu } from "../Dropdown";
import style from "./index.module.scss";
import "./index.scss";

const Header = ({ toggleLogin }) => {
  const { state, dispatch } = useContext(Context);
  const [phrase, setPhrase] = useState("");

  const fetchEntities = async () => {
    const [industries, entityTypes, exchanges] = await Promise.all([
      getIndustries(),
      getEntityTypes(),
      getExchanges(),
    ]);

    const industriesResult =
      industries?.data?.data.map((industry, idx) => ({
        title: industry,
        id: idx + 1,
      })) ?? [];
    const entityTypesResult =
      entityTypes?.data?.data.map((entityType, idx) => ({
        title: entityType,
        id: idx + 1,
      })) ?? [];
    const exchangeResult =
      exchanges?.data?.data.map((item, idx) => ({
        title: item.exchange,
        id: idx + 1,
      })) ?? [];
    dispatch({ type: "GET_NEWS_INDUSTRIES", payload: industriesResult });
    dispatch({ type: "GET_NEWS_ENTITIES_TYPES", payload: entityTypesResult });
    dispatch({ type: "GET_NEWS_EXCHANGES", payload: exchangeResult });
  };

  useEffect(() => {
    fetchEntities();
  }, [dispatch]);

  const handleChange = async (item, entity) => {
    const payload = { ...item };
    if (entity === "countries") {
      payload.title = item.code;
    }
    try {
      dispatch({ type: "LOADING" });
      const {
        data: { data },
      } = await getAllNews({ [`${entity}`]: payload.title });
      dispatch({ type: "GET_ALL_NEWS", payload: data });
    } catch (err) {
      dispatch({
        type: "ERROR",
        payload: err.response?.data ?? "Something went wrong",
      });
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    handleChange({ title: phrase }, "search");
  };
  return (
    <nav className={style.header__nav}>
      <div className={style.header__nav__left}>
        <Link to="/" className={style.header__nav_link}>
          Logo
        </Link>
        <form className="navbar__search_box">
          <div className="navbar__search">
            <input
              value={phrase}
              onChange={(e) => setPhrase(e.target.value)}
              type="text"
              className="navbar__search_input"
            />
            <span className="search__box" onClick={handleSearch}>
              <FiSearch color="rgba(255, 255, 255, 0.5)" />
            </span>
          </div>
        </form>
      </div>

      <div className={style.header__nav__right}>
        <Dropdown>
          <DropdownMenu
            selectedItem={(item) => handleChange(item, "countries")}
            key="1"
            title="Countries"
            dropDownList={countryList}
          />
          <DropdownMenu
            key="2"
            title="Industries"
            dropDownList={state.industries}
            selectedItem={(item) => handleChange(item, "industries")}
          />
          <DropdownMenu
            selectedItem={(item) => handleChange(item, "exchanges")}
            key="3"
            title="Exchange"
            dropDownList={state.exchanges}
          />
          <DropdownMenu
            selectedItem={(item) => handleChange(item, "entity_types")}
            key="4"
            title="Types"
            dropDownList={state.entityTypes}
          />
        </Dropdown>
      </div>
    </nav>
  );
};

export default Header;
