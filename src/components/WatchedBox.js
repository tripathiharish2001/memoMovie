import React, { useState } from "react";
import Summary from "./Summary";
import WatchedList from "./WatchedList";
import MoviDetails from "./MoviDetails";

const WatchedBox = ({
  tempWatchedData,
  average,
  selectedId,
  handleCloseMovie,
  watched,
  handleWatchedMovie,
  handleDeleteWatched,
}) => {
  console.log(watched, "movies");
  const [isOpen2, setIsOpen2] = useState(true);
  const avgImdbRating = average(watched?.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched?.map((movie) => movie.userRating));
  const avgRuntime = average(watched?.map((movie) => movie.runtime));

  return (
    <>
      <div className="box">
        <button
          className="btn-toggle"
          onClick={() => setIsOpen2((open) => !open)}
        >
          {isOpen2 ? "–" : "+"}
        </button>
        {isOpen2 && (
          <>
            {selectedId ? (
              <MoviDetails
                selectedId={selectedId}
                handleCloseMovie={handleCloseMovie}
                handleWatchedMovie={handleWatchedMovie}
                watched={watched}
              />
            ) : (
              <>
                <Summary
                  watched={watched}
                  avgImdbRating={avgImdbRating}
                  avgUserRating={avgUserRating}
                  avgRuntime={avgRuntime}
                  // handleDeleteWatched={handleDeleteWatched}
                />

                <WatchedList
                  watched={watched}
                  handleDeleteWatched={handleDeleteWatched}
                />
              </>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default WatchedBox;
