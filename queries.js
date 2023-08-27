const { Client } = require("pg");
const connectionString =
  "postgressql://postgres:postgres@localhost:5432/postgres";

//Creating Client
const client = new Client({
  connectionString: connectionString,
});

client.connect();

const data = async (req, res) => {
  const result = await client.query('Select * from public."users"');
  res.status(200).send(result.rows);
};

const sentData = async (req, res) => {
  let { id, name, email, age } = req.body;
  const result = await client.query(
    "INSERT INTO users VALUES ($1, $2, $3, $4) RETURNING *",
    [id, name, email, age]
  );
  console.log(result.rows);
  res
    .status(201)
    .send(`one data inserted to table with ID: ${result.rows[0].id}`);
};

module.exports = { data, sentData };
