module.exports = getPerson;

// Requires the environment variable from this application to use the DATABASE_URL
require('dotenv').config();

// Require the a new instance of the pg node module
const { Pool } = require("pg");

// Setting the connection string for the database at Heroku or Local environment
const connectionString = process.env.DATABASE_URL;

// Create a new instance of the Pool class and pass the connectionString variable
const pool = new Pool({ connectionString: connectionString });

// Handling the request and response from the express route /api/person/:id
function getPerson(req, res) {
  
  // Capture the :id from the route param object and cast into a numeric value
  let id = Number(req.params.id) || Number(req.query.id);

  // If the numeric value is less than one OR the Number method returns NaN send a 500 code to the response
  if (id < 1 || Number.isNaN(id)) {
    res.status(500).json({ success: false, data: "ID must be a valid number and greater than zero" });
  } else {

    // Else use the getPersonFromDb to process the query and use a callback function to send the response back to the client
    getPersonFromDb(id, (error, result) => {
      
      // Checking if the error object is set or if the result array is null or empty
      if (error || result == null || result.length < 1) {
        res.status(500).json({ success: false, data: error });
      } else {

        // If the result has an array with values send it with the response as an object using the .json method
        res.status(200).json(result);
      }
    });
  }
}


function getPersonFromDb(id, callback) {
  console.log("Getting person from DB");

  // Defining the query string
  const sql = "SELECT * FROM person WHERE id = $1::int";

  // Defining the param ::1 as an array
  const params = [id];

  // Call the .query method from the pool object to perform the query and a callback to feed the upper callback parameters
  pool.query(sql, params, (err, result) => {
    if (err) {
      console.log("Error in query: ");
      console.log(err);
      callback(err, null);
    }
    console.log(result.rows);
    callback(null, result.rows);
  })
}