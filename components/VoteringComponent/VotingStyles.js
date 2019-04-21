import grey from "@material-ui/core/colors/grey";

const VotingStyles = theme => ({
  button: {
    backgroundColor: grey[100],
    width: "100%",
    borderRadius: "0.25rem",
    marginBottom: "0.25rem",
    padding: "0.5rem"
  },
  contentContainer: {
    marginBottom: "1rem"
  },
  chart: {
    width: "calc(100% + 20px) !important",
    marginTop: "1rem",
    marginLeft: "-20px"
  },
  pieChartContainer: {
    [theme.breakpoints.down("xs")]: {
      maxWidth: "75%",
      height: "225px !important",
      margin: "auto",
      "& .recharts-wrapper": {
        display: "flex",
        height: "225px !important",
        "& .recharts-surface": {
          margin: "auto",
          height: "225px !important",
          overflow: "visible",
          maxWidth: "75%"
        }
      }
    }
  },
  arrow: {
    "-webkit-transition": "transform 0.25s ease-in-out",
    transition: "transform 0.25s ease-in-out",
    fontSize: "2.5rem",
    marginLeft: "auto",
    color: theme.palette.primary.dark
  },
  arrowVisible: {
    "-webkit-transform": "rotate(180deg)",
    transform: "rotate(180deg)"
  }
});

export default VotingStyles;
