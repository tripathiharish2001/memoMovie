import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Main from "./components/Main";

const tempMovieData = [];

const tempWatchedData = [];

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

// const average = (arr) => {
//   if (arr.length === 0) return 0; // Handle division by zero for an empty array

//   const sum = arr.reduce((acc, cur) => acc + cur, 0);
//   return sum / arr.length;
// };

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
    // console.log(JSON.parse(storeValue), "stored value");
    return JSON.parse(storeValue) ? JSON.parse(storeValue) : [];
  });

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
    localStorage.setItem("watched", JSON.stringify([...watched, movie]));
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
