import SparqlClient from "sparql-http-client";
import { IBook, IBookDetails } from "../models/interfaces";
import { IGetBooksListRequest } from "../models/requests";

const endpointUrl = "https://query.wikidata.org/sparql";
const client = new SparqlClient({ endpointUrl });

export const GetBooks = async (
  request: IGetBooksListRequest
): Promise<IBook[]> => {
  const query = `
    SELECT DISTINCT ?book ?bookLabel ?author ?authorLabel ?image
      WHERE {
        ?book wdt:P31 wd:Q7725634;
              wdt:P50 ?author.
        OPTIONAL { ?book wdt:P18 ?image. }
        SERVICE wikibase:label {
          bd:serviceParam wikibase:language "en".
          ?author rdfs:label ?authorLabel.
          ?book rdfs:label ?bookLabel.
        }
        
        FILTER(BOUND(?bookLabel))
        FILTER(BOUND(?authorLabel))
      }
    LIMIT ${request.count}
    OFFSET ${request.offset}
  `;

  try {
    const stream = client.query.select(query);
    const books: IBook[] = [];

    for await (const row of stream) {
      books.push({
        book: row.book?.value || "",
        bookLabel: row.bookLabel?.value || "",
        author: row.author?.value || "",
        authorLabel: row.authorLabel?.value || "",
        genre: row.genre?.value,
        genreLabel: row.genreLabel?.value,
        image: row.image?.value,
      });
    }

    return books;
  } catch (error) {
    console.error("Error fetching books:", error);
    return [];
  }
};

export const GetBookById = async (
  bookId: string
): Promise<IBookDetails | null> => {
  const query = `
    SELECT ?book ?bookLabel ?bookDescription ?image ?title ?author ?authorLabel ?instanceOfLabel ?date ?placeOfPublicationLabel
      WHERE {
        BIND(wd:${bookId} AS ?book)
        ?book rdfs:label ?bookLabel .
        FILTER(LANG(?bookLabel) = "en")
        OPTIONAL { ?book schema:description ?bookDescription . 
          FILTER(LANG(?bookDescription) = "en") }
        OPTIONAL { ?book wdt:P18 ?image . }
        OPTIONAL { ?book wdt:P1476 ?title . }
        OPTIONAL {
          ?book p:P50 ?statement .
          ?statement ps:P50 ?author .
          ?author rdfs:label ?authorLabel .
          FILTER(LANG(?authorLabel) = "en")
        }
        OPTIONAL { 
          ?book wdt:P291 ?placeOfPublication . 
          ?placeOfPublication rdfs:label ?placeOfPublicationLabel . 
          FILTER(LANG(?placeOfPublicationLabel) = "en")
        }
        ?book wdt:P31 ?instanceOf .
        SERVICE wikibase:label { bd:serviceParam wikibase:language "en" }
        OPTIONAL { ?book wdt:P577 ?date . }
      }
  `;

  try {
    const stream = client.query.select(query);
    let bookData: IBookDetails | null = null;

    for await (const row of stream) {
      bookData = {
        book: row.book?.value || "",
        bookLabel: row.bookLabel?.value || "",
        bookDescription: row.bookDescription?.value || "",
        title: row.title?.value || "",
        author: row.author?.value || "",
        authorLabel: row.authorLabel?.value || "",
        instanceOfLabel: row.instanceOfLabel?.value || "",
        image: row.image?.value || "",
        date: row.date?.value || "",
        placeOfPublicationLabel: row.placeOfPublicationLabel?.value || "",
      };
    }

    return bookData;
  } catch (error) {
    console.error("Error fetching book details:", error);
    return null;
  }
};
