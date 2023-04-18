const { Client } = require('pg');

const db_showAll = async (table_name: string): Promise<any[]> => {
  const client = new Client({
    connectionString: 'postgres://jmzpzvdu:8Lj-szyz9bkr20fUVpQ8QjxD7ttr1-hh@manny.db.elephantsql.com/jmzpzvdu',
    ssl: {
      rejectUnauthorized: false
    }
  });
  await client.connect();

  const query = `SELECT * FROM ${table_name}`;
  const res = await client.query(query);

  console.log(res.rows);
  await client.end();
  return res.rows;
};

const db_showInfo = async (table_name: string): Promise<number> => {
  const client = new Client({
    connectionString: 'postgres://jmzpzvdu:8Lj-szyz9bkr20fUVpQ8QjxD7ttr1-hh@manny.db.elephantsql.com/jmzpzvdu',
    ssl: {
      rejectUnauthorized: false
    }
  });
  await client.connect();

  const query = `SELECT COUNT(*) FROM ${table_name}`;
  const res = await client.query(query);

  console.log(res.rows[0].count);
  const count = res.rows[0].count;
  await client.end();
  return count;
};

const db_showPart = async (table_name: string, count: number, skip: number): Promise<any[]> => {
  const client = new Client({
    connectionString: 'postgres://jmzpzvdu:8Lj-szyz9bkr20fUVpQ8QjxD7ttr1-hh@manny.db.elephantsql.com/jmzpzvdu',
    ssl: {
      rejectUnauthorized: false
    }
  });
  await client.connect();

  const query = `SELECT * FROM ${table_name} LIMIT ${count} OFFSET ${skip};`;
  const res = await client.query(query);

  console.log(res.rows);
  await client.end();
  return res.rows;
};

const db_saveData = async (data: any[]): Promise<void> => {
  const client = new Client({
    connectionString: 'postgres://jmzpzvdu:8Lj-szyz9bkr20fUVpQ8QjxD7ttr1-hh@manny.db.elephantsql.com/jmzpzvdu',
    ssl: {
      rejectUnauthorized: false
    }
  });
  await client.connect();

  for (const apartment of data) {
    const query = `INSERT INTO Apartments VALUES ('${apartment.img}', '${apartment.name}', '${apartment.locality}', '${apartment.price}')`;
    const res = await client.query(query);
  }

  await client.end();
}

export {
  db_showAll,
  db_saveData,
  db_showPart,
  db_showInfo
};
