import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mysql from "mysql2";
const app = express();

// Enable CORS
app.use(cors());

// Configure body-parser to handle POST requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  password: "", //silce
  database: "comp306",
});

//To retrieve the names of stars who have acted in movies directed by Martin Scorsese
export function stars_in_movies_directed_by(director_name) {
  const query1 = `
  SELECT DISTINCT s.primaryName, m.primaryTitle
  FROM Stars s
  JOIN PlaysIn pi ON s.starId = pi.starId
  JOIN Movies m ON pi.filmId = m.id
  JOIN Directs dt ON m.id = dt.filmId
  JOIN Directors d ON dt.directorId = d.nconst
  WHERE d.primaryName = '${director_name}'
  ORDER BY s.primaryName ASC;  
    `;
  return new Promise((resolve, reject) => {
    pool.query(query1, (err, results) => {
      if (err) reject(err);
      console.log("query1", results);
      resolve(results);
    });
  });
}

//To find the average rating for movies of each genre:
export function avg_rating_for_each_genre() {
  const query1 = `
    SELECT mg.genre, AVG(r.averageRating) AS averageRating
    FROM MovieGenres mg
    JOIN Movies m ON mg.movieId = m.id
    JOIN Ratings r ON m.id = r.tconst
    GROUP BY mg.genre
    `;
  return new Promise((resolve, reject) => {
    pool.query(query1, (err, results) => {
      if (err) reject(err);
      console.log("query2", results);
      resolve(results);
    });
  });
}

//To find the names of stars who born after birthYear and appeared in at least 20 movies
export function born_after_and_acted_in_at_least(birthYear, moreThan) {
  const query1 = `
  SELECT DISTINCT s.primaryName
  FROM Stars s
  JOIN PlaysIn pi ON s.starId = pi.starId
  WHERE s.birthYear > '${birthYear}'
  GROUP BY s.primaryName
  HAVING COUNT(DISTINCT pi.filmId) >= '${moreThan}';
    `;
  return new Promise((resolve, reject) => {
    pool.query(query1, (err, results) => {
      if (err) reject(err);
      console.log("query3", results);
      resolve(results);
    });
  });
}

//To find the names of directors who have directed movies of all genres:
export function directed_movies_of_all_genres() {
  const query1 = `
  SELECT DISTINCT primaryName
  FROM Directors
  WHERE nconst IN (
    SELECT directorId
    FROM Directs
    GROUP BY directorId
    HAVING COUNT(DISTINCT filmId) = (
        SELECT COUNT(DISTINCT genre)
        FROM MovieGenres
    )
  )
    `;
  return new Promise((resolve, reject) => {
    pool.query(query1, (err, results) => {
      if (err) reject(err);
      console.log("query4", results);
      resolve(results);
    });
  });
}

//To find the movies with the highest average rating:
export function highest_rated() {
  const query1 = `
    SELECT m.primaryTitle, r.averageRating
    FROM Movies m
    JOIN Ratings r ON m.id = r.tconst
    WHERE r.averageRating < (
      SELECT MAX(averageRating)
      FROM Ratings) AND r.numVotes > 30000
      ORDER BY r.averageRating DESC
      LIMIT 100;
    `;
  return new Promise((resolve, reject) => {
    pool.query(query1, (err, results) => {
      if (err) reject(err);
      console.log("query3", results);
      resolve(results);
    });
  });
}

//To find the names of directors who directed at least one movie between the years of 2000 and 2010: 
export function one_movie_between(start_year, end_year) {
  const query1 = `
  SELECT primaryName
  FROM Directors
  WHERE nconst IN (
      SELECT directorId
      FROM Directs
      GROUP BY directorId
      HAVING COUNT(DISTINCT filmId) = (
          SELECT COUNT(DISTINCT startYear)
          FROM Movies
          WHERE startYear BETWEEN '${start_year}' AND '${end_year}' 
      )
  )
    `;
  return new Promise((resolve, reject) => {
    pool.query(query1, (err, results) => {
      if (err) reject(err);
      console.log("query3", results);
      resolve(results);
    });
  });
}

//To find the names of stars who have played in movies directed by Martin Scorsese and Christopher Nolan:
export function played_in_both(director1, director2) {
  const query1 = `
  SELECT s.primaryName
  FROM Stars s
  JOIN PlaysIn pi ON s.starId = pi.starId
  JOIN Movies m ON pi.filmId = m.id
  JOIN Directs dt ON m.id = dt.filmId
  JOIN Directors d ON dt.directorId = d.nconst
  WHERE d.primaryName IN ('${director1}', '${director2}')
  GROUP BY s.primaryName
  HAVING COUNT(DISTINCT d.nconst) = 2;
   `;
  return new Promise((resolve, reject) => {
    pool.query(query1, (err, results) => {
      if (err) reject(err);
      console.log("query1", results);
      resolve(results);
    });
  });
}

//To get the names of stars who have appeared in movies directed by Martin Scorsese and have an average rating higher than the average rating of all his movies:
export function appeared_in_higher_than_average_rating(director_name) {
  const query1 = `
  SELECT DISTINCT s.primaryName
  FROM Stars s
  JOIN PlaysIn pi ON s.starId = pi.starId
  JOIN Movies m ON pi.filmId = m.id
  JOIN Directs dt ON m.id = dt.filmId
  JOIN Directors d ON dt.directorId = d.nconst
  JOIN Ratings r ON m.id = r.tconst
  WHERE d.primaryName = '${director_name}'
  GROUP BY s.primaryName
  HAVING AVG(r.averageRating) > (
      SELECT AVG(rating.averageRating)
      FROM Movies movie
      JOIN Directs dir ON movie.id = dir.filmId
      JOIN Directors director ON dir.directorId = director.nconst
      JOIN Ratings rating ON movie.id = rating.tconst
      WHERE director.primaryName = '${director_name}'
  );
    `;
  return new Promise((resolve, reject) => {
    pool.query(query1, (err, results) => {
      if (err) reject(err);
      console.log("query3", results);
      resolve(results);
    });
  });
}


//To find the names of directors who have directed at least two movies with an average rating higher than 9:
export function directors_with_lower_rating(rating) {
  const query1 = `
  SELECT d.primaryName
  FROM Directors d
  JOIN Directs dt ON d.nconst = dt.directorId
  JOIN Movies m ON dt.filmId = m.id
  JOIN Ratings r ON m.id = r.tconst
  GROUP BY d.primaryName
  HAVING COUNT(DISTINCT m.id) >= 2 AND AVG(r.averageRating) < '${rating}';
    `;
  return new Promise((resolve, reject) => {
    pool.query(query1, (err, results) => {
      if (err) reject(err);
      console.log("query3", results);
      resolve(results);
    });
  });
}

//To get the total number of movies in each genre that have an average rating higher than given number:
export function count_favs_each_genre(rating) {
  const query1 = `
  SELECT mg.genre, COUNT(DISTINCT m.id) AS movieCount
  FROM MovieGenres mg
  JOIN Movies m ON mg.movieId = m.id
  JOIN Ratings r ON m.id = r.tconst
  WHERE r.averageRating > '${rating}'
  GROUP BY mg.genre;  
    `;
  return new Promise((resolve, reject) => {
    pool.query(query1, (err, results) => {
      if (err) reject(err);
      console.log("query3", results);
      resolve(results);
    });
  });
}

////////////////////////////////////////////bunlar dümdüz queryler////////////////////////////////////////////
//TODO: rapora her querynin son hali eklenecek -> hepsinin açıklaması düzenlenecek, project description yazılacak, screenshot veya video

//bu yönetmen ismi alıyo -> bütün filmlerini ve yapım yıllarını döndürüyor
export function all_movies_directed_by(director_name) {
  const query1 = `
  SELECT Movies.primaryTitle, Movies.startYear
  FROM Movies 
  INNER JOIN Directs ON Movies.id = Directs.filmId
  INNER JOIN Directors ON Directs.directorId = Directors.nconst
  WHERE Directors.primaryName = '${director_name}'
  ORDER BY Movies.startYear ASC;
    `;
  return new Promise((resolve, reject) => {
    pool.query(query1, (err, results) => {
      if (err) reject(err);
      console.log("query3", results);
      resolve(results);
    });
  });
}

//oyuncu ismi alıyo -> oynadığı tüm filmlerin adı ve yapım yılı
export function all_movies_of_a_star(star_name) {
  const query1 = `
  SELECT Movies.primaryTitle, Movies.startYear
  FROM Movies 
  INNER JOIN PlaysIn ON Movies.id = PlaysIn.filmId
  INNER JOIN Stars ON PlaysIn.starId = Stars.starId
  WHERE Stars.primaryName = '${star_name}' AND Movies.startYear IS NOT NULL
  ORDER BY Movies.startYear ASC;
    `;
  return new Promise((resolve, reject) => {
    pool.query(query1, (err, results) => {
      if (err) reject(err);
      console.log("query3", results);
      resolve(results);
    });
  });
}

//film adı -> filmdeki tüm oyuncuların adı
export function cast_of_movie(movie_name) {
  const query1 = `
  SELECT DISTINCT Stars.primaryName 
  FROM Stars 
  INNER JOIN PlaysIn ON Stars.starId = PlaysIn.starId
  INNER JOIN Movies ON PlaysIn.filmId = Movies.id
  WHERE Movies.primaryTitle = '${movie_name}' OR Movies.originalTitle = '${movie_name}'
  ORDER BY Stars.primaryName ASC;
    `;
  return new Promise((resolve, reject) => {
    pool.query(query1, (err, results) => {
      if (err) reject(err);
      console.log("query3", results);
      resolve(results);
    });
  });
}

//yıl alıyo -> o yıl yapılmış tüm filmlerin adları
export function all_movies_in_a_year(year) {
  const query1 = `
  SELECT Movies.primaryTitle
  FROM Movies
  INNER JOIN Ratings ON Movies.id = Ratings.tconst
  WHERE Movies.startYear = '${year}' AND Ratings.numVotes > 50000
  ORDER BY Movies.startYear ASC;
    `;
  return new Promise((resolve, reject) => {
    pool.query(query1, (err, results) => {
      if (err) reject(err);
      console.log("query3", results);
      resolve(results);
    });
  });
}

//genre alıyo -> o genredaki en iyi 100 filmin adını, yılını ve ratingini döndürüyor(ratinge göre sıralı)
export function best_of_genre(genre) {
  const query1 = `
  SELECT DISTINCT Movies.primaryTitle, Movies.startYear, Ratings.averageRating
  FROM Movies
  JOIN MovieGenres ON Movies.id = MovieGenres.movieId
  JOIN Ratings ON Movies.id = Ratings.tconst
  WHERE MovieGenres.genre = '${genre}' AND Movies.startYear IS NOT NULL AND Ratings.numVotes > 50000
  ORDER BY Ratings.averageRating DESC
  LIMIT 100;
    `;
  return new Promise((resolve, reject) => {
    pool.query(query1, (err, results) => {
      if (err) reject(err);
      console.log("query3", results);
      resolve(results);
    });
  });
}

//en çok puan verilmiş 100 filmi döndürüyor (en çok izlenenler gibi düşündüm)
export function most_voted() {
  const query1 = `
  SELECT Movies.primaryTitle
  FROM Movies
  INNER JOIN Ratings ON Movies.id = Ratings.tconst
  ORDER BY Ratings.numVotes DESC
  LIMIT 100;
    `;
  return new Promise((resolve, reject) => {
    pool.query(query1, (err, results) => {
      if (err) reject(err);
      console.log("query3", results);
      resolve(results);
    });
  });
}

//returns all genres, bunlar button olcak, tıklayınca 
export function get_all_genres() {
  const query1 = `
  SELECT DISTINCT genre
  FROM MovieGenres
  ORDER BY genre ASC;
    `;
  return new Promise((resolve, reject) => {
    pool.query(query1, (err, results) => {
      if (err) reject(err);
      console.log("query3", results);
      resolve(results);
    });
  });
}

app.post("/starInMovies", (req, res) => {
  const director_name = req.body.director;
  stars_in_movies_directed_by(director_name)
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      throw err;
    });
});

app.post("/actedInAtLeast", (req, res) => {
  const birthYear = req.body.birthYear;
  const num = req.body.playnum;
  born_after_and_acted_in_at_least(birthYear, num)
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      throw err;
    });
});

app.post("/directedAllGenres", (req, res) => {
  const { } = req.query;
  directed_movies_of_all_genres()
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      throw err;
    });
});

app.post("/highestRated", (req, res) => {
  const { } = req.query;
  highest_rated()
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      throw err;
    });
});

app.post("/avgRating", (req, res) => {
  const { } = req.query;
  avg_rating_for_each_genre()
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      throw err;
    });
});

app.post("/playedInBoth", (req, res) => {
  const dir1 = req.body.director1;
  const dir2 = req.body.director2;

  played_in_both(dir1, dir2)
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      throw err;
    });
});

app.post("/higherThanAverage", (req, res) => {
  const director_name = req.body.director;
  appeared_in_higher_than_average_rating(director_name)
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      throw err;
    });
});

app.post("/oneMovieBetween", (req, res) => {
  const start_year = req.body.start
  const end_year = req.body.end;
  one_movie_between(start_year, end_year)
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      throw err;
    });
});

app.post("/directorsWithLowerRating", (req, res) => {
  const  rating  = req.body.rating;
  directors_with_lower_rating(rating)
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      throw err;
    });
});

app.post("/genreCount", (req, res) => {
  const rating  = req.body.genreCount;
  count_favs_each_genre(rating)
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      throw err;
    });
});

app.post("/genreCount", (req, res) => {
  const {rating} = req.query;
  count_favs_each_genre(rating)
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      throw err;
    });
});

/////////////////////////////////////////////////////////

app.post("/allMoviesOfADirector", (req, res) => {
  const director_name = req.body.director;
  all_movies_directed_by(director_name)
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      throw err;
    });
});

app.post("/allMoviesOfAStar", (req, res) => {
  const star_name = req.body.star;
  all_movies_of_a_star(star_name)
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      throw err;
    });
});

app.post("/getCastOfTheMovie", (req, res) => {
  const movie_name = req.body.movieName;
  cast_of_movie(movie_name)
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      throw err;
    });
});

app.post("/allMoviesReleasedIn", (req, res) => {
  const { year } = req.query;
  all_movies_in_a_year(year)
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      throw err;
    });
});

app.post("/getBestOfGenres", (req, res) => {
  const genre  = req.body.genre;
  console.log("Deneme", genre);
  best_of_genre(genre)
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      throw err;
    });
});

app.get("/getMostVoted", (req, res) => {
  // const {genre} = req.query;
  most_voted()
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      throw err;
    });
});

app.get("/getAllGenres", (req, res) => {
  // const {genre} = req.query;
  get_all_genres()
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      throw err;
    });
});

app.get("/", (req, res) => {
  stars_in_movies_directed_by("Martin Scorsese")
  born_after_and_acted_in_at_least("1990")
  directed_movies_of_all_genres()
  avg_rating_for_each_genre()
  highest_rated()
  appeared_in_higher_than_average_rating("Martin Scorsese")
  played_in_both("Martin Scorsese", "Christoper Nolan")


  // contains("AFG", "countryCode", "city", (res) => console.log("Q1) AFG ", res));
});

app.listen(3008, () => {
  console.log("Started... on 3008");
});

