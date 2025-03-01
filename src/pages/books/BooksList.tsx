import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Card,
  Chip,
  Divider,
  Typography,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CircularProgress from "@mui/material/CircularProgress";
import { GetBooks } from "../../services/book-service";
import { IBook } from "../../models/interfaces";
import { useEffect, useState } from "react";
import Book from "./Book";
import "./books.css";

const BooksList = () => {
  const [books, setBooks] = useState<IBook[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [booksOffset, setBooksOffset] = useState<number>(0);
  const BOOKS_PER_LOAD = 25;

  useEffect(() => {
    setLoading(true);
    const fetchBooks = async () => {
      try {
        const res = await GetBooks({
          count: BOOKS_PER_LOAD,
          offset: booksOffset,
        });
        setBooks((prev) => prev.concat(res));
      } catch (err) {
        console.error("Error fetching books:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, [booksOffset]);

  const loadMore = () => {
    setBooksOffset((prev) => prev + BOOKS_PER_LOAD);
  };

  return (
    <Card>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 1,
        }}
      >
        <Typography
          variant="overline"
          color="primary"
          sx={{ fontWeight: "bold", pl: 2 }}
        >
          Books list
        </Typography>
        <Chip
          label={`Total: ${books.length}`}
          variant="outlined"
          color="primary"
          sx={{ fontWeight: "bold" }}
        />
      </Box>
      <Divider />
      <Box
        sx={{
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
          p: 1,
        }}
      >
        <Accordion sx={{ width: "100%" }}>
          <AccordionSummary
            expandIcon={<ArrowDropDownIcon />}
            aria-controls="panel-content"
            id="panel-header"
            sx={{
              minHeight: 32,
              "&.Mui-expanded": { minHeight: 32 },
              "& .MuiAccordionSummary-content": { my: 0.5 },
              "& .MuiAccordionSummary-content.Mui-expanded": { my: 0.5 },
            }}
          >
            <Typography variant="overline">Filters</Typography>
          </AccordionSummary>
          <AccordionDetails></AccordionDetails>
        </Accordion>
      </Box>
      <Divider />
      <div className="book-list">
        {books.length > 0
          ? books.map((book, index) => <Book data={book} key={index} />)
          : !loading && <p>No books found.</p>}
      </div>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          my: 5,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {books.length > 0 && (
            <Button fullWidth disabled={loading} onClick={loadMore}>
              Load more
            </Button>
          )}
          {loading && <CircularProgress disableShrink />}
        </Box>
      </Box>
    </Card>
  );
};

export default BooksList;
