import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";
import {
  Container,
  createTheme,
  TableCell,
  LinearProgress,
  ThemeProvider,
  Typography,
  TextField,
  TableBody,
  TableRow,
  TableHead,
  TableContainer,
  Table,
  Paper,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { CryptoState } from "../CryptoContext";

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default function CoinsTable() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const { symbol, coins, loading } = CryptoState();

  const useStyles = makeStyles({
    row: {
      backgroundColor: "#1a1a1a",
      cursor: "pointer",
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      "&:hover": {
        backgroundColor: "#252525",
        transform: "translateX(5px)",
        boxShadow: "0 4px 20px rgba(238, 188, 29, 0.15)",
        borderLeft: "3px solid #EEBC1D",
      },
      fontFamily: "Montserrat",
      borderBottom: "1px solid rgba(238, 188, 29, 0.08)",
    },
    pagination: {
      "& .MuiPaginationItem-root": {
        color: "#EEBC1D",
        fontWeight: "600",
        transition: "all 0.3s ease",
        "&:hover": {
          backgroundColor: "rgba(238, 188, 29, 0.1)",
          transform: "scale(1.1)",
        },
        "&.Mui-selected": {
          backgroundColor: "#EEBC1D",
          color: "#000",
          fontWeight: "700",
        },
      },
    },
  });

  const classes = useStyles();
  const history = useHistory();

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });

  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    );
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Container style={{ textAlign: "center" }}>
        <Typography
          variant="h4"
          style={{
            margin: "60px 0 30px 0",
            fontFamily: "Montserrat",
            fontWeight: "700",
            color: "#fff",
          }}
        >
          Cryptocurrency Prices by Market Cap
        </Typography>
        <TextField
          label="Search For a Crypto Currency"
          variant="outlined"
          style={{
            marginBottom: 30,
            width: "100%",
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            borderRadius: "8px",
          }}
          InputProps={{
            style: { color: "white" },
          }}
          InputLabelProps={{
            style: { color: "#aaa" },
          }}
          onChange={(e) => setSearch(e.target.value)}
        />
        <TableContainer component={Paper} style={{ backgroundColor: "#1a1a1a", borderRadius: "16px", overflow: "hidden", boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)" }}>
          {loading ? (
            <LinearProgress style={{ backgroundColor: "gold" }} />
          ) : (
            <Table aria-label="simple table">
              <TableHead style={{ backgroundColor: "#0f0f0f", borderBottom: "2px solid #333" }}>
                <TableRow>
                  {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                    <TableCell
                      style={{
                        color: "#aaa",
                        fontWeight: "600",
                        fontFamily: "Montserrat",
                        fontSize: "0.9rem",
                        borderBottom: "none",
                        padding: "20px 16px",
                        letterSpacing: "1px",
                        textTransform: "uppercase",
                      }}
                      key={head}
                      align={head === "Coin" ? "left" : "right"}
                    >
                      {head}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {handleSearch()
                  .slice((page - 1) * 10, (page - 1) * 10 + 10)
                  .map((row) => {
                    const profit = row.price_change_percentage_24h > 0;
                    return (
                      <TableRow
                        onClick={() => history.push(`/coins/${row.id}`)}
                        className={classes.row}
                        key={row.name}
                      >
                        <TableCell
                          component="th"
                          scope="row"
                          style={{
                            display: "flex",
                            gap: 15,
                          }}
                        >
                          <img
                            src={row?.image}
                            alt={row.name}
                            height="50"
                            style={{ marginBottom: 10 }}
                          />
                          <div
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            <span
                              style={{
                                textTransform: "uppercase",
                                fontSize: "1.1rem",
                                fontWeight: "700",
                                color: "#fff",
                              }}
                            >
                              {row.symbol}
                            </span>
                            <span style={{ 
                              color: "#888", 
                              fontSize: "0.95rem",
                              fontWeight: "500",
                            }}>
                              {row.name}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell align="right" style={{ 
                          fontSize: "1.05rem",
                          fontWeight: "600",
                          color: "#fff",
                          fontFamily: "Montserrat",
                        }}>
                          {symbol}{" "}
                          {row.current_price ? numberWithCommas(row.current_price.toFixed(2)) : "N/A"}
                        </TableCell>
                        <TableCell
                          align="right"
                          style={{
                            color: profit > 0 ? "#0ecb81" : "#f6465d",
                            fontWeight: 600,
                            fontSize: "1.05rem",
                            fontFamily: "Montserrat",
                          }}
                        >
                          {row.price_change_percentage_24h !== null && row.price_change_percentage_24h !== undefined ? (
                            <>
                              {profit && "+"}
                              {row.price_change_percentage_24h.toFixed(2)}%
                            </>
                          ) : "N/A"}
                        </TableCell>
                        <TableCell align="right" style={{ 
                          fontSize: "1.05rem",
                          fontWeight: "600",
                          color: "#ccc",
                          fontFamily: "Montserrat",
                        }}>
                          {symbol}{" "}
                          {row.market_cap ? numberWithCommas(
                            row.market_cap.toString().slice(0, -6)
                          ) + "M" : "N/A"}
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          )}
        </TableContainer>

        {/* Comes from @material-ui/lab */}
        <Pagination
          count={parseInt((handleSearch()?.length / 10).toFixed(0))}
          style={{
            padding: 30,
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
          classes={{ ul: classes.pagination }}
          onChange={(_, value) => {
            setPage(value);
            window.scroll({ top: 450, behavior: 'smooth' });
          }}
        />
      </Container>
    </ThemeProvider>
  );
}
