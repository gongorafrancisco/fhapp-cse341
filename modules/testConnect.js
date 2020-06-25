module.exports = testConnect;

const { Pool } = require("pg");
const connectionString = process.env.DATABASE_URL || "postgres://cseuser:Spring2020@localhost:5432/cse341";
const pool = new Pool({ connectionString: connectionString });

function testConnect(request, response) {
  let id = Number(request.query.id);
  if (id < 1) {
    response.status(500).json({ success: false, data: "ID must be greater than zero" });
  } else {
    getCustomersFromDb(id, (error, result) => {
      
      if (error || result == null) {
        response.status(500).json({ success: false, data: error });
      } else {
        response.status(200).json(result);
      }
    });
  }
}

function getCustomersFromDb(id, callback) {
  console.log("Getting person from DB");

  const sql = "SELECT * FROM person WHERE id = $1::int";

  const params = [id];

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