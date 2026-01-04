import pkg from 'sqlite3';
import { promisify } from 'util';

const {verbose, Database} = pkg

const sqlite3 = verbose();

const db = new Database('upload.db', (err) => {
  if (err) console.error('DB Error:', err.message);
  else console.log('Connected to SQLite database.');
});

// For db.run, manual Promise needed to capture lastID & changes
const run = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function(err) {
      if (err) reject(err);
      else resolve({ lastID: this.lastID, changes: this.changes });
    });
  });
};

// db.get and db.all can be promisified
const get = promisify(db.get.bind(db));
const all = promisify(db.all.bind(db));

const initUploadTable = async()=>{
    try {
        const query = `CREATE TABLE IF NOT EXISTS uploads (
                            upload_id TEXT NOT NULL,
                            path TEXT NOT NULL,
                            file_name TEXT NOT NULL,
                            size INTEGER NOT NULL,
                            ext TEXT NOT NULL,
                            date_added TIMESTAMP NOT NULL DEFAULT (CURRENT_TIMESTAMP)
                        )`
        await run(query)
    } catch (err) {
        console.log(err)
        throw err
    }
}

export {run, get, all, initUploadTable}