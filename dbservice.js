const mysql = require('mysql2');
const dotenv = require('dotenv');
let instance = null;
dotenv.config();


const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT

    // host: 'powerg-dev-db-do-user-6517601-0.b.db.ondigitalocean.com',
    // user: 'doadmin',
    // password: 'h7usfz25o3wdsp82',
    // database: 'defaultdb',
    // port: '25060'
});

connection.connect((err) => {
    if (err) {
        console.log(err.message);
    }
    // console.log('db ' + connection.state);
});

// connection.query(
//     'SELECT * FROM sqlweb;', 
//     function(err, results) {
//         console.log(results);
//     }
// );

class DbService {
    static getDbServiceInstance() {
        return instance ? instance : new DbService();
    }

    async getAllData() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM names;"

                connection.query(query, (err, results) => {
                    if (err) reject (new Error(err.message));
                    resolve(results);
                })
            });
            // console.log(response);
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async insertNewName(name) {
        try {
            const dateAdded = new Date();
            const insertId = await new Promise((resolve, reject) => {
                const query = "INSERT INTO names (name, date_added) VALUES (?, ?);"

                connection.query(query, [name, dateAdded], (err, result) => {
                    if (err) reject (new Error(err.message));
                    resolve(result.insertId);
                })
            });
            console.log(insertId);
            // return insertId;
        } catch (err) {
            console.log(error);
        }
    }

    async deleteRowById(id) {
        try {
            id = parseInt(id);

            const response = await new Promise((resolve, reject) => {
                const query = "DELETE FROM names WHERE id = ?";
                connection.query(query, [id], (err, result) => {
                    if(err) reject(new Error(err.message));
                    resolve(result.affectedRows);
                })
            });
            // console.log(response);
            return response === 1 ? true : false;
        } catch (error) {
            console.log(error);
        }
    }

    async editById(new_name, id) {
        try {
            id = parseInt(id);
            // new_name = String(new_name);
            // new_name = parseString(new_name);
            const response = await new Promise((resolve, reject) => {
                const query = "UPDATE names SET name = ? WHERE id = ?";
                connection.query(query, [new_name, id], (err, result) => {
                    if(err) reject(new Error(err.message));
                    resolve(result);
                })
            });
            return response;
        } catch (error) {
            console.log(error);
        }
    }
}



// module.exports = connection;
module.exports = DbService;
