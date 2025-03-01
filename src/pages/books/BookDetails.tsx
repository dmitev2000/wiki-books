import { useEffect, useState } from "react";
import { GetBookById } from "../../services/book-service";
import { useParams } from "react-router-dom";
import { IBookDetails } from "../../models/interfaces";
import BookDetailsCard from "./BookDetailsCard";
import { CircularProgress, Box, Typography } from "@mui/material";

const BookDetails = () => {
  const { id } = useParams();
  const [bookDetails, setBookDetails] = useState<IBookDetails | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!id) {
      setIsLoading(false);
      return;
    }

    GetBookById(id)
      .then((res) => {
        setBookDetails(res);
      })
      .catch((error) => {
        console.error("Error fetching book details:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id]);

  if (!id) {
    return <Typography color="error">Invalid book ID.</Typography>;
  }

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
      {isLoading ? (
        <CircularProgress />
      ) : bookDetails ? (
        <BookDetailsCard book={bookDetails} />
      ) : (
        <Typography color="error">Book not found.</Typography>
      )}
    </Box>
  );
};

export default BookDetails;
