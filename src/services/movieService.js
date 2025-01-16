// src/services/movieService.js

export const getRecommendations = async (selectedMovies) => {
  try {
    console.log("Sending request with movies:", selectedMovies);
    const response = await fetch("/api/recommend-multi", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ titles: selectedMovies }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("Server response:", errorData);
      throw new Error(
        errorData.error || `HTTP error! status: ${response.status}`
      );
    }

    const data = await response.json();
    console.log("Received recommendations:", data);
    return data;
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    throw error;
  }
};

export const processRecommendations = (recommendationsPerMovie) => {
  const seen = new Set();
  const allRecommendations = [];

  Object.values(recommendationsPerMovie).forEach((movieRecs) => {
    if (Array.isArray(movieRecs)) {
      movieRecs.forEach((movie) => {
        if (!seen.has(movie.Series_Title)) {
          seen.add(movie.Series_Title);
          allRecommendations.push({
            id: movie.Series_Title.toLowerCase().replace(/\s+/g, "-"),
            title: movie.Series_Title,
            year: movie.Released_Year,
            director: movie.Director,
            rating: movie.IMDB_Rating,
            overview: movie.Overview,
            runtime: movie.Runtime,
            poster: movie.Poster_Link,
            genre: Array.isArray(movie.Genre)
              ? movie.Genre.join(", ")
              : movie.Genre,
          });
        }
      });
    }
  });

  return allRecommendations.slice(0, 10);
};
