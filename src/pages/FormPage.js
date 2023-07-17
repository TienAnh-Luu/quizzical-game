import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createUseStyles } from "react-jss";
import BackButton from "../components/BackButton";

const useStyles = createUseStyles({
  formStyle: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "left",
    padding: "0 10%",
    zIndex: 2,
    position: "relative",
  },
  formHeading: {
    fontSize: "32px",
    fontWeight: 400,
    lineHeight: 1.1,
    marginBottom: "20px",
  },
  formLabel: {
    marginBottom: "5px",
    fontWeight: "bold",
  },
  formControl: {
    width: "100%",
    padding: "10px 15px",
    height: "45px",
    marginBottom: "18px",
    minWidth: "250px",
  },
  formOption: {
    // padding: "0 2px 1px 2px",
    // clear: "both",
    // width: "100%",
    // textAlign: "left",
    // marginTop: "10px",
    // marginBottom: "10px",
    // borderStyle: "none",
  },
  playButton: {
    width: "100%",
    marginTop: "10px",
    padding: "16px 28px",
    border: "none",
    backgroundColor: "#4d5b9e",
    borderRadius: "15px",
    fontFamily: "Inter",
    fontWeight: 500,
    fontSize: "16px",
    lineHeight: "19px",
    color: "#f5f7fb",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#5f6aa1",
    },
    "&:focus": {
      outline: "none",
    },
    "&:active": {
      boxShadow: "inset 5px 5px 10px -3px rgba(0, 0, 0, 0.7)",
    },
  },
});

export default function FormPage() {
  const classes = useStyles();

  const [amount, setAmount] = useState(5);
  const [timeAmount, setTimeAmount] = useState(0);
  const [category, setCategory] = useState("any");
  const [difficulty, setDifficulty] = useState("any");

  return (
    <form action='' className={classes.formStyle}>
      <BackButton path='/' />
      <h2 className={classes.formHeading}>Specify your questions</h2>
      <label htmlFor='trivia_amount' className={classes.formLabel}>
        Number of Questions:
      </label>
      <input
        type='number'
        name='trivia_amount'
        id='trivia_amount'
        className={classes.formControl}
        data-testid='amount-input'
        min={1}
        max={50}
        defaultValue={5}
        onChange={(e) => setAmount(e.target.value)}
      />
      <label htmlFor='trivia_category' className={classes.formLabel}>
        Select Category:
      </label>
      <select
        name='trivia_category'
        className={classes.formControl}
        data-testid='category-select'
        onChange={(e) => setCategory(e.target.value)}
      >
        <option
          value='any'
          className={classes.formOption}
          data-testid='cate-select-option'
        >
          Any Category
        </option>
        <option
          value='9'
          className={classes.formOption}
          data-testid='cate-select-option'
        >
          General Knowledge
        </option>
        <option
          value='10'
          className={classes.formOption}
          data-testid='cate-select-option'
        >
          Entertainment: Books
        </option>
        <option
          value='11'
          className={classes.formOption}
          data-testid='cate-select-option'
        >
          Entertainment: Film
        </option>
        <option
          value='12'
          className={classes.formOption}
          data-testid='cate-select-option'
        >
          Entertainment: Music
        </option>
        <option
          value='13'
          className={classes.formOption}
          data-testid='cate-select-option'
        >
          Entertainment: Musicals & Theatres
        </option>
        <option
          value='14'
          className={classes.formOption}
          data-testid='cate-select-option'
        >
          Entertainment: Television
        </option>
        <option
          value='15'
          className={classes.formOption}
          data-testid='cate-select-option'
        >
          Entertainment: Video Games
        </option>
        <option
          value='16'
          className={classes.formOption}
          data-testid='cate-select-option'
        >
          Entertainment: Board Games
        </option>
        <option
          value='17'
          className={classes.formOption}
          data-testid='cate-select-option'
        >
          Science & Nature
        </option>
        <option
          value='18'
          className={classes.formOption}
          data-testid='cate-select-option'
        >
          Science: Computers
        </option>
        <option
          value='19'
          className={classes.formOption}
          data-testid='cate-select-option'
        >
          Science: Mathematics
        </option>
        <option
          value='20'
          className={classes.formOption}
          data-testid='cate-select-option'
        >
          Mythology
        </option>
        <option
          value='21'
          className={classes.formOption}
          data-testid='cate-select-option'
        >
          Sports
        </option>
        <option
          value='22'
          className={classes.formOption}
          data-testid='cate-select-option'
        >
          Geography
        </option>
        <option
          value='23'
          className={classes.formOption}
          data-testid='cate-select-option'
        >
          History
        </option>
        <option
          value='24'
          className={classes.formOption}
          data-testid='cate-select-option'
        >
          Politics
        </option>
        <option
          value='25'
          className={classes.formOption}
          data-testid='cate-select-option'
        >
          Art
        </option>
        <option
          value='26'
          className={classes.formOption}
          data-testid='cate-select-option'
        >
          Celebrities
        </option>
        <option
          value='27'
          className={classes.formOption}
          data-testid='cate-select-option'
        >
          Animals
        </option>
        <option
          value='28'
          className={classes.formOption}
          data-testid='cate-select-option'
        >
          Vehicles
        </option>
        <option
          value='29'
          className={classes.formOption}
          data-testid='cate-select-option'
        >
          Entertainment: Comics
        </option>
        <option
          value='30'
          className={classes.formOption}
          data-testid='cate-select-option'
        >
          Science: Gadgets
        </option>
        <option
          value='31'
          className={classes.formOption}
          data-testid='cate-select-option'
        >
          Entertainment: Japanese Anime & Manga
        </option>
        <option
          value='32'
          className={classes.formOption}
          data-testid='cate-select-option'
        >
          Entertainment: Cartoon & Animations
        </option>
      </select>
      <label htmlFor='trivia_difficulty' className={classes.formLabel}>
        Select Difficulty:
      </label>
      <select
        name='trivia_difficulty'
        className={classes.formControl}
        data-testid='difficulty-select'
        onChange={(e) => setDifficulty(e.target.value)}
      >
        <option
          value='any'
          className={classes.formOption}
          data-testid='diff-select-option'
        >
          Any Difficulty
        </option>
        <option
          value='easy'
          className={classes.formOption}
          data-testid='diff-select-option'
        >
          Easy
        </option>
        <option
          value='medium'
          className={classes.formOption}
          data-testid='diff-select-option'
        >
          Medium
        </option>
        <option
          value='hard'
          className={classes.formOption}
          data-testid='diff-select-option'
        >
          Hard
        </option>
      </select>
      <label htmlFor='time_amount' className={classes.formLabel}>
        Number of Questions:
      </label>
      <input
        type='number'
        name='time_amount'
        id='time_amount'
        className={classes.formControl}
        data-testid='time-amount-input'
        min={0}
        max={300}
        step={20}
        defaultValue={0}
        onChange={(e) => setTimeAmount(e.target.value)}
      />
      <Link to={`/questions/${amount}/${category}/${difficulty}/${timeAmount}`}>
        <button className={classes.playButton}>Let's Play</button>
      </Link>
    </form>
  );
}
