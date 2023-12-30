import React, { useEffect, useState } from "react";
import StarRatings from "./StarRatings";
import Loader from "./Loader";

const key = `${process.env.REACT_APP_KEY}`;

const MoviDetails = ({
  selectedId,
  handleCloseMovie,
  handleWatchedMovie,
  watched,
}) => {
  const [movie, setMovie] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState(0);

  const isWatched = watched
    .map((movie) => {
      return movie.imdbID;
    })
    .includes(selectedId);

  const watchedUserrating = watched.find((movie) => {
    return movie.imdbID === selectedId;
  })?.userRating;

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  useEffect(() => {
    const loadDetails = async () => {
      setIsLoading(true);
      const res = await fetch(
        `https://www.omdbapi.com/?apikey=${key}&i=${selectedId}`
      );
      const data = await res.json();
      setMovie(data);
      setIsLoading(false);
    };
    loadDetails();
  }, [selectedId]);

  useEffect(() => {
    if (!title) return;
    document.title = `Movie : ${title}`;

    return function () {
      document.title = "mygame";
    };
  }, [title]);

  const addMovie = () => {
    const newWatchedMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      userRating,
      runtime: Number(runtime.split(" ").at(0)),
    };
    handleWatchedMovie(newWatchedMovie);
    handleCloseMovie();
  };

  const handleRate = (rate) => {
    setUserRating((userRating) => rate);
  };

  return (
    <>
      <div className="details">
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <header>
              <button className="btn-back" onClick={handleCloseMovie}>
                &larr;
              </button>
              <img src={poster} alt={`Poster of movie: ${movie} `} />
              <div className="details-overview">
                <h2>{title}</h2>
                <p>
                  {released} &bull; {runtime}
                </p>
                <p>{genre}</p>
                <p>
                  <span>⭐</span>
                  {imdbRating} IMDB Rating
                </p>
              </div>
            </header>

            <section>
              <div className="rating">
                {!isWatched ? (
                  <>
                    <StarRatings handleRate={handleRate} />
                    {userRating > 0 && (
                      <button
                        className="btn-add"
                        onClick={() => {
                          addMovie();
                        }}
                      >
                        Add to history
                      </button>
                    )}
                  </>
                ) : (
                  <p>You rated this movie with {watchedUserrating}⭐</p>
                )}
              </div>

              <p>
                <em>{plot}</em>,
              </p>
              <p>Starring {actors}</p>
              <p>Directed by {director}</p>
            </section>
          </>
        )}
      </div>
    </>
  );
};

export default MoviDetails;
