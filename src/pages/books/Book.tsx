import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, Skeleton } from "@mui/material";
import { IBook } from "../../models/interfaces";
import noPreviewImg from "../../assets/images/no_preview.png";
import { useNavigate } from "react-router-dom";

export const Book = ({ data }: { data: IBook }) => {
  const [imageSrc, setImageSrc] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    if (data.image) {
      const directImageURL = data.image.includes("Special:FilePath")
        ? `${data.image}?width=300`
        : data.image;
      setImageSrc(directImageURL);
    } else {
      setImageSrc(noPreviewImg);
    }
  }, [data.image]);

  return (
    <Card sx={{ display: "flex", justifyContent: "space-between", width: 400 }}>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h5">
            {data.bookLabel}
          </Typography>
          <Typography
            variant="subtitle1"
            component="div"
            sx={{ color: "text.secondary" }}
          >
            {data.authorLabel}
          </Typography>
        </CardContent>
        <Box sx={{ pl: 1, pb: 1 }}>
          <Button
            onClick={() => navigate(`/books/${data.book.split("/").at(-1)}`)}
          >
            Learn more
          </Button>
        </Box>
      </Box>
      <Box sx={{ width: 151, height: 200, position: "relative" }}>
        {isLoading && (
          <Skeleton variant="rectangular" width={151} height={200} />
        )}
        <CardMedia
          component="img"
          sx={{
            width: 151,
            height: 200,
            objectFit: "cover",
            display: isLoading ? "none" : "block",
          }}
          src={imageSrc}
          alt={`${data.bookLabel} cover`}
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setImageSrc(noPreviewImg);
            setIsLoading(false);
          }}
        />
      </Box>
    </Card>
  );
};

export default Book;
