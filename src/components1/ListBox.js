import React, { useState } from "react";
import MovieList from "./MovieList";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";

const ListBox = ({
  tempMovieData,
  movies,
  isloading,
  setLoading,
  error,
  handleMovieSelect,
}) => {
  const [isOpen1, setIsOpen1] = useState(true);

  return (
    <>
      <div className="box">
        {!isloading && !error && (
          <>
            <button
              className="btn-toggle"
              onClick={() => setIsOpen1((open) => !open)}
            >
              {isOpen1 ? "–" : "+"}
            </button>
            {isOpen1 && (
              <ul className="list list-movies">
                {movies?.map((movie, i) => (
                  <MovieList
                    movie={movie}
                    handleMovieSelect={handleMovieSelect}
                    key={i}
                  />
                ))}
              </ul>
            )}
          </>
        )}
        {isloading && <Loader />}
        {error && <ErrorMessage message={error} />}
      </div>
    </>
  );
};

export default ListBox;
