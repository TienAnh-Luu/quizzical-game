import { React } from "react";
import { createUseStyles } from "react-jss";
import { formatTime, calculateTimeFraction } from "../utils/timeHelpers";

const useStyles = createUseStyles({
  container: {
    position: "absolute",
    right: "4%",
    top: "11%",
    zIndex: 1,
  },
  baseTimer: {
    position: "relative",
    height: "150px",
    width: "150px",
  },
  circle: {
    fill: "none",
    stroke: "none",
  },
  pathElapsed: {
    strokeWidth: "7px",
    stroke: "grey",
  },
  label: {
    position: "absolute",

    /* Size should match the parent container */
    width: "150px",
    height: "150px",

    /* Keep the label aligned to the top */
    top: 0,

    /* Create a flexible box that centers content vertically and horizontally */
    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    /* Sort of an arbitrary number; adjust to your liking */
    fontSize: "48px",
  },
  pathRemaining: {
    /* Just as thick as the original ring */
    strokeWidth: "7px",

    /* Rounds the line endings to create a seamless circle */
    strokeLinecap: "round",

    /* Makes sure the animation starts at the top of the circle */
    transform: "rotate(90deg)",
    transformOrigin: "center",

    /* One second aligns with the speed of the countdown timer */
    transition: " 1s linear all",
    fillRule: "nonzero",

    /* Allows the ring to change color when the color value updates */
    stroke: "currentColor",
  },
  pathInfoColor: {
    color: "rgb(65, 184, 131)",
  },
  pathWarningColor: {
    color: "orange",
  },
  pathAlertColor: {
    color: "red",
  },
  svg: {
    /* Flips the svg and makes the animation to move left-to-right */
    transform: "scaleX(-1)",
  },
});

const Timer = ({ timeLeft, initTime }) => {
  const classes = useStyles();
  const pathColor =
    timeLeft <= initTime * 0.25
      ? "pathAlertColor"
      : timeLeft <= initTime * 0.5
      ? "pathWarningColor"
      : "pathInfoColor";

  const FULL_DASH_ARRAY = 283;

  return (
    <div className={classes.container}>
      <div className={classes.baseTimer}>
        <svg
          className={classes.svg}
          viewBox='0 0 100 100'
          xmlns='http://www.w3.org/2000/svg'
        >
          <g className={classes.circle}>
            <circle className={classes.pathElapsed} cx='50' cy='50' r='45' />
            <path
              id='base-timer-path-remaining'
              stroke-dasharray={`${(
                calculateTimeFraction(timeLeft, initTime) * FULL_DASH_ARRAY
              ).toFixed(0)} ${FULL_DASH_ARRAY}`}
              className={`${classes.pathRemaining} ${classes[pathColor]}`}
              d='
          M 50, 50
          m -45, 0
          a 45,45 0 1,0 90,0
          a 45,45 0 1,0 -90,0
        '
            ></path>
          </g>
        </svg>
        <span className={classes.label}>{formatTime(timeLeft)}</span>
      </div>
    </div>
  );
};

export default Timer;
