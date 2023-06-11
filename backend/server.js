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

export function stars_in_movies_directed_by(director_name) {
  const query1 = `
  SELECT DISTINCT s.primaryName
  FROM Stars s
  JOIN PlaysIn pi ON s.starId = pi.starId
  JOIN Movies m ON pi.filmId = m.id
  JOIN Directs dt ON m.id = dt.filmId
  JOIN Directors d ON dt.directorId = d.nconst
  WHERE d.primaryName = '${director_name}'
  ORDER BY s.primaryName ASC  
    `;
  return new Promise((resolve, reject) => {
    pool.query(query1, (err, results) => {
      if (err) reject(err);
      console.log("Re", results);
      resolve(results);
    });
  });
}


export function diff_lang(country1, country2, callback) {
  const query1 = `SELECT countrylanguage.language
    FROM countrylanguage
    INNER JOIN country ON country.code = countrylanguage.countrycode
    WHERE country.name = '${country1}'
    AND countrylanguage.language NOT IN (
        SELECT countrylanguage.language
        FROM countrylanguage
        INNER JOIN country ON country.code = countrylanguage.countrycode
        WHERE country.name = '${country2}'
      ); 
    `;
  return new Promise((resolve, reject) => {
    pool.query(query1, (err, results) => {
      if (err) reject(err);
      console.log("Re", results);
      resolve(results);
    });
  });
}

export function diff_lang_join(country1, country2) {
  const query = 
    `SELECT DISTINCT cl.language
    FROM countrylanguage cl
    INNER JOIN country c1 ON c1.code = cl.countrycode
    LEFT JOIN countrylanguage cl2 ON cl2.countrycode = c1.code
    INNER JOIN country c2 ON c2.code = cl2.countrycode
    WHERE c1.name = '${country1}' AND (c2.name <> '${country2}' OR c2.name IS NULL);
    `;
  return new Promise((resolve, reject) => {
    pool.query(query, (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });

}

export function aggregate_countries(agg_type, country_name, callback) {
  const query = 
  `SELECT DISTINCT
  country.name,
  country.lifeexpectancy,
  country.governmentform,
  countrylanguage.language
  FROM
    country
    INNER JOIN countrylanguage ON countrylanguage.countrycode = country.code
  WHERE
    lifeexpectancy > (
      SELECT ${agg_type}(lifeexpectancy)
      FROM country
    ) AND lifeexpectancy < (
      SELECT lifeexpectancy
      FROM country
      WHERE name = '${country_name}'
    )
  `;

  pool.query(query, (err, results) => {
    if (err) callback(err);
    callback(results);
  });
}

function find_min_max_continent() {
  const query = 
  `SELECT c.continent, c.name, c.lifeexpectancy
  FROM country c
  WHERE c.lifeexpectancy = (
    SELECT MIN(lifeexpectancy)
    FROM country
    WHERE continent = c.continent
  )
  OR c.lifeexpectancy = (
    SELECT MAX(lifeexpectancy)
    FROM country
    WHERE continent = c.continent
  )
  ORDER BY c.continent, c.lifeexpectancy DESC;`;

  return new Promise((resolve, reject) => {
    pool.query(query, (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });
}

function find_country_languages(percentage, language) {
  const query = `SELECT country.name, countrylanguage.language, countrylanguage.percentage
      FROM country 
      JOIN countrylanguage ON country.code = countrylanguage.countrycode
      WHERE countrylanguage.language = '${language}'
      AND countrylanguage.percentage >= ${percentage};`;
  return new Promise((resolve, reject) => {
    pool.query(query, (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });
}

function find_country_count(amount) {
  const query = ` 
      SELECT country.name, MAX(country.lifeexpectancy) as LifeExpectancy, country.continent
      FROM country
      WHERE country.code IN (
          SELECT city.countrycode
          FROM city
          GROUP BY city.countrycode
          HAVING COUNT(*) > ${amount}
      )
      GROUP BY country.name, country.continent;
  `;

  // I changed the GROUP BY country.continent to GROUP BY country.name, country.continent
  // for the query to work. 
  // There are duplicate results due to sql_mode=only_full_group_by. 
  // It works otherwise but the settings 
  return new Promise((resolve, reject) => {
    pool.query(query, (err, results) => {
      if (err) reject(err);
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

app.get("/getDiffLang", (req, res) => {
  const { country1, country2 } = req.query;
  diff_lang(country1, country2)
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      throw err;
    });
});

app.get("/getDiffLangJoin", (req, res) => {
  const { country1, country2 } = req.query;
  diff_lang_join(country1, country2)
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      throw err;
    });
});

app.get("/aggregateCountries", (req, res) => {
  const { agg, country } = req.query;
  aggregate_countries(agg, country, (results) => {
    res.send(results);
  });
});

app.post("/", (req, res) => {

  const data = req.body.director
  console.log(data);
  stars_in_movies_directed_by(data).then(response => res.send(response));
  // contains("AFG", "countryCode", "city", (res) => console.log("Q1) AFG ", res));
  // contains("AFK", "countryCode", "city", (res) => console.log("Q1) AFK ", res));
  // find_min_max_continent().then((response)=>{console.log("Q5-1) ",response)});
  // find_country_languages(85,"arabic").then((response)=>{console.log("Q5-2) ",response)});
  // find_country_count(100).then((response)=>{console.log("Q5-3) ",response)}).catch((err)=>{console.error(err);});
});

app.listen(3008, () => {
  console.log("Started... on 3008");
});