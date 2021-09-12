import classNames from "classnames";
import React, { Children, cloneElement, useEffect, useState } from "react";
import "./index.scss";

export const Dropdown = ({
  onChange,
  children,
  containerStyle,
  selectedDefaultItem,
  closeDrop,
}) => {
  const [isSelected, setSelected] = useState(null);
  const [closeMenuDropdown, setCloseMenuDropdown] = useState(true);

  const handleClick = (id, item) => {
    setSelected(id);
    if (onChange) {
      onChange(item);
    }
  };

  const handleCloseDropDownMenu = () => {
    setCloseMenuDropdown(false);
  };

  useEffect(() => {
    if (!selectedDefaultItem) {
      setSelected(selectedDefaultItem);
    }
  }, [selectedDefaultItem]);
  return (
    <ul className="navbar__wrap" style={{ ...containerStyle }}>
      {Children.toArray(children).map((child, idx) => {
        const composedChildProps = {
          stepIndex: idx,
          key: idx,
          isSelected,
          childKey: child.props.position,
          cardClick: (id, item) => handleClick(id, item),
          handleCloseDropDownMenu: handleCloseDropDownMenu,
          closeMenuDropdown: closeMenuDropdown,
          ...child.props,
        };
        return cloneElement(child, composedChildProps);
      })}
    </ul>
  );
};
export const DropdownMenu = ({
  cardClick,
  isSelected,
  title,
  childKey,
  stepIndex,
  data,
  dropDownList,
  selectedItem,
  closeMenuDropdown,
  handleCloseDropDownMenu,
  prefixCls = "navbar__wrap_item",
  prefixMenuCls = "menuDropdown",
}) => {
  const classString = classNames(`${prefixCls}`, {
    [`${prefixCls}__selected`]: isSelected === stepIndex,
  });
  const handleSelected = (item) => {
    selectedItem(item);
  };

  const dropDownMenuClass = classNames("navbar__wrap_sub", {
    [`${prefixMenuCls}`]: isSelected === stepIndex,
  });

  return (
    <li
      className={classString}
      onClick={() => cardClick(stepIndex, { id: childKey, title })}
    >
      {title}
      {dropDownList.length > 0 && (
        <ul className={dropDownMenuClass}>
          {dropDownList.map((item) => (
            <li
              key={item.code}
              className="navbar__wrap_sub_item"
              onClick={() => handleSelected(item)}
            >
              {item.title}
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};
