import { makeStyles } from "@material-ui/core";

const SelectButton = ({ children, selected, onClick }) => {
  const useStyles = makeStyles({
    selectbutton: {
      border: "2px solid gold",
      borderRadius: 8,
      padding: "10px 16px",
      fontFamily: "Montserrat",
      cursor: "pointer",
      backgroundColor: selected ? "gold" : "transparent",
      color: selected ? "black" : "gold",
      fontWeight: selected ? 700 : 500,
      transition: "all 0.3s ease",
      "&:hover": {
        backgroundColor: "gold",
        color: "black",
        transform: "translateY(-2px)",
        boxShadow: "0 4px 12px rgba(238, 188, 29, 0.3)",
      },
      width: "23%",
      textAlign: "center",
    },
  });

  const classes = useStyles();

  return (
    <span onClick={onClick} className={classes.selectbutton}>
      {children}
    </span>
  );
};

export default SelectButton;
