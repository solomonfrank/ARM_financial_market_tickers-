import React from "react";
import "./layout.scss";

const Layout = (props) => {
  const styles = {
    root: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      overflowX: "hidden",
      height: "100%",
    },
    sidebar: {
      zIndex: 100,
      position: "fixed",

      top: 0,
      bottom: 0,
      transition: "transform .3s ease-out",
      WebkitTransition: "-webkit-transform .3s ease-out",
      willChange: "transform",
      overflowY: "auto",
      overflowX: "hidden",
      background: "rgba(0,0,0,.8)",
      // padding: 30,
      width: "100%",
      height: "100%",
    },
    overlay: {
      zIndex: 1,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      opacity: 0,
      overflowX: "hidden",
      visibility: "hidden",
      transition: "opacity .3s ease-out, visibility .3s ease-out",
      backgroundColor: "rgba(0,0,0,.8)",
      height: "100%",
    },
    dragHandle: {
      zIndex: 1,
      position: "fixed",
      top: 0,
      bottom: 0,
      transition: "opacity .3s ease-out, visibility .3s ease-out",
    },
  };

  const sidebar = <AuthModalForm component={Asidebar} />;
  const sidebarProps = {
    sidebar,
    open: sidebarStatus,
    onSetOpen: closeSidebar,
    styles: styles,
    transitions: true,
    pullRight: true,
    rootClassName: "rootSidebar",
    contentClassName: "sidebarContent",
  };
  return <Sidebar {...sidebarProps}>{props.children}</Sidebar>;
};

export default Layout;
