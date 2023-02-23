import React from "react";
import { Link } from "react-router-dom";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  backButton: {
    position: "absolute",
    left: "40px",
    top: "15px",
    padding: "18px",
    borderRadius: "50%",
    backgroundColor: "rgba(184, 184, 184, 0.3)",
    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
    cursor: "pointer",
    transition: "background-color 0.15s",
    "&:hover": {
      backgroundColor: "rgba(113, 113, 113, 0.5)",
    },
  },
});

const BackButton = ({ path }) => {
  const classes = useStyles();
  return (
    <Link to={path}>
      <i
        className={`fa-solid fa-arrow-left ${classes.backButton}`}
        data-testid='back-button'
      ></i>
    </Link>
  );
};

export default BackButton;
