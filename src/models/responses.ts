export interface IResponseHead {
  vars: string[];
}

export interface IBooksBinding {
  book?: string;
  bookLabel?: string;
  author?: string;
  authorLabel?: string;
  genre?: string;
  genreLabel?: string;
  image?: string;
}

export interface IBooksResults {
  bindings: IBooksBinding[];
}

export interface IBooksResponse {
  head: IResponseHead;
  results: IBooksResults;
}
