import {createPool} from 'mysql2'
import { config } from 'dotenv'

config()


try{
    var dbConnection = createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
})
}
catch (err) {
    console.log(err, "err")
    throw new Error(err)
}


export default dbConnection;