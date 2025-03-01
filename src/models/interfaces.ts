import { SvgIconComponent } from "@mui/icons-material";

export interface INavLink {
  text: string;
  path: string;
  icon: SvgIconComponent
}

export interface IBook {
  book: string;
  bookLabel: string;
  author: string;
  authorLabel: string;
  genre?: string;
  genreLabel?: string;
  image?: string;
}

export interface IBookDetails extends IBook {
  bookDescription: string;
  title: string;
  author: string;
  authorLabel: string;
  instanceOfLabel: string;
  date: string;
  placeOfPublicationLabel: string;
}
