import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Main from "./components/Main";

const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

const key = `${process.env.REACT_APP_KEY}`;

export default function App() {
  const [movies, setMovies] = useState(tempMovieData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  // const [watched, setWatched] = useState([]);
  const [watched, setWatched] = useState(() => {
    const storeValue = localStorage.getItem("watched");
    return JSON.parse(storeValue);
  });
  // const [movies, setMovies] = useState();

  const handleMovieSelect = (id) => {
    setSelectedId((selectedId) => {
      return id === selectedId ? null : id;
    });
  };

  const handleCloseMovie = () => {
    setSelectedId(null);
  };

  const handleWatchedMovie = (movie) => {
    setWatched(() => {
      return [...watched, movie];
    });
  };

  const handleDeleteWatched = (id) => {
    setWatched((watched) => {
      return watched.filter((movie) => {
        return movie.imdbID !== id;
      });
    });
  };

  useEffect(() => {
    localStorage.setItem("watched", JSON.stringify(watched));
  }, [watched]);

  useEffect(() => {
    // abort controller for cleaning up API calls

    const controller = new AbortController();

    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        setError("");
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${key}&s=${query}`,
          { signal: controller.signal }
        );

        if (!res.ok) {
          throw new Error(
            "We are unable to fetch movies right now, please come after some times!"
          );
          console.error("In response block!");
        }

        const data = await res.json();

        if (data.Response == "False") {
          console.error("In response block!");
          throw new Error("404! Movie Not Found!!!! 🤕");
        }
        setMovies(data.Search);
      } catch (err) {
        console.error("In catch block!");
        if (err.name !== "AbortError") setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (!query.length) {
      setMovies([]);
      setError("");
      return;
    }

    handleCloseMovie();
    fetchMovies();

    return function () {
      controller.abort();
    };
  }, [query]);

  return (
    <>
      <Navbar movies={movies} query={query} setQuery={setQuery} />
      <Main
        tempMovieData={tempMovieData}
        tempWatchedData={tempWatchedData}
        average={average}
        movies={movies}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        error={error}
        selectedId={selectedId}
        handleMovieSelect={handleMovieSelect}
        handleCloseMovie={handleCloseMovie}
        watched={watched}
        handleWatchedMovie={handleWatchedMovie}
        handleDeleteWatched={handleDeleteWatched}
      />
    </>
  );
}
