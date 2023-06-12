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
    WHERE r.averageRating = (
      SELECT MAX(averageRating)
      FROM Ratings
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




app.get("/starInMovies", (req, res) => {
  const {director_name} = req.query;
  stars_in_movies_directed_by(director_name)
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      throw err;
    });
});

app.get("/actedInAtLeast", (req, res) => {
  const {birthYear} = req.query;
  born_after_and_acted_in_at_least(birthYear)
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      throw err;
    });
});

app.get("/directedAllGenres", (req, res) => {
  const {} = req.query;
  directed_movies_of_all_genres()
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      throw err;
    });
});

app.get("/highestRated", (req, res) => {
  const {} = req.query;
  highest_rated()
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      throw err;
    });
});

app.get("/avgRating", (req, res) => {
  const {} = req.query;
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

app.get("/higherThanAverage", (req, res) => {
  const {director_name} = req.query;
  appeared_in_higher_than_average_rating(director_name)
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      throw err;
    });
});

app.post("/starsDirectedBy", (req, res) => {
  const data = req.body.director
  console.log(data);
  stars_in_movies_directed_by(data).then(response => res.send(response));
  // contains("AFG", "countryCode", "city", (res) => console.log("Q1) AFG ", res));
});

app.get("/", (req, res) => {
  stars_in_movies_directed_by("Martin Scorsese")
  born_after_and_acted_in_at_least("1990")
  directed_movies_of_all_genres()
  avg_rating_for_each_genre()
  highest_rated()
  appeared_in_higher_than_average_rating("Martin Scorsese")
  played_in_both("Martin Scorses", "Christoper Nolan")
});

app.listen(3008, () => {
  console.log("Started... on 3008");
});

