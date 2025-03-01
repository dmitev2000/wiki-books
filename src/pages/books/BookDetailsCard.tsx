import { useState, useEffect } from "react";
import noPreviewImage from "../../assets/images/no_preview.png";
import { IBookDetails } from "../../models/interfaces";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Box,
  Avatar,
  Divider,
  Skeleton,
} from "@mui/material";

const BookDetailsCard = ({ book }: { book: IBookDetails }) => {
  const [imageSrc, setImageSrc] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (book.image) {
      const directImageURL = book.image.includes("Special:FilePath")
        ? `${book.image}?width=400`
        : book.image;
      setImageSrc(directImageURL);
    } else {
      setImageSrc(noPreviewImage);
    }
  }, [book.image]);

  return (
    <Box sx={{ my: 4 }}>
      <Card
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          maxWidth: 1200,
          margin: "auto",
        }}
      >
        <Box sx={{ width: { xs: "100%", sm: 250 }, position: "relative" }}>
          {isLoading && <Skeleton variant="rectangular" width="100%" height={350} />}
          <CardMedia
            component="img"
            sx={{
              width: "100%",
              height: 350,
              objectFit: "cover",
              display: isLoading ? "none" : "block",
            }}
            src={imageSrc}
            alt={book.bookLabel}
            onLoad={() => setIsLoading(false)}
            onError={() => {
              setImageSrc(noPreviewImage);
              setIsLoading(false);
            }}
          />
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", flex: 1, padding: 2 }}>
          <CardContent>
            <Typography variant="h4" component="h1" gutterBottom>
              {book.title}
            </Typography>
            <Typography variant="h6" color="textSecondary" gutterBottom>
              {book.authorLabel}
            </Typography>

            <Typography variant="body1" paragraph>
              {book.bookDescription}
            </Typography>

            <Divider sx={{ margin: "16px 0" }} />

            <Grid container spacing={2}>
              {book.genre && (
                <Grid item xs={12} sm={6}>
                  <Typography variant="body1">
                    <strong>Genre:</strong> {book.genreLabel || book.genre}
                  </Typography>
                </Grid>
              )}

              <Grid item xs={12} sm={6}>
                <Typography variant="body1">
                  <strong>Published:</strong>{" "}
                  {book.date ? new Date(book.date).getFullYear() : "Unknown"}
                </Typography>
              </Grid>

              {book.placeOfPublicationLabel && (
                <Grid item xs={12} sm={6}>
                  <Typography variant="body1">
                    <strong>Place of Publication:</strong> {book.placeOfPublicationLabel}
                  </Typography>
                </Grid>
              )}

              <Grid item xs={12} sm={6}>
                <Typography variant="body1">
                  <strong>Instance of:</strong> {book.instanceOfLabel}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>

          <Box sx={{ display: "flex", alignItems: "center", marginTop: 2 }}>
            {book.author && (
              <Avatar
                sx={{ width: 40, height: 40, marginRight: 2 }}
                src={`/path-to-author-image/${book.author}.jpg`}
              />
            )}
            <Typography variant="body2" color="textSecondary">
              {book.authorLabel}
            </Typography>
          </Box>
        </Box>
      </Card>
    </Box>
  );
};

export default BookDetailsCard;
