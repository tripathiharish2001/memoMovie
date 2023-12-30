import React, { useState } from "react";
import ListBox from "./ListBox";
import WatchedBox from "./WatchedBox";
import Loader from "./Loader";

const Main = ({
  movies,
  tempMovieData,
  tempWatchedData,
  average,
  isLoading,
  setIsLoading,
  error,
  selectedId,
  handleMovieSelect,
  handleCloseMovie,
  watched,
  handleWatchedMovie,
  handleDeleteWatched,
}) => {
  return (
    <>
      <main className="main">
        <ListBox
          tempMovieData={tempMovieData}
          movies={movies}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          error={error}
          handleMovieSelect={handleMovieSelect}
        />

        <WatchedBox
          tempWatchedData={tempMovieData}
          average={average}
          selectedId={selectedId}
          handleCloseMovie={handleCloseMovie}
          watched={watched}
          handleWatchedMovie={handleWatchedMovie}
          handleDeleteWatched={handleDeleteWatched}
        />
      </main>
    </>
  );
};

export default Main;
