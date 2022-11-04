import { DataSource } from "typeorm";
import "dotenv/config";

const AppDataSource = new DataSource(process.env.NODE_ENV === "test" ? 
    {
        type : "postgres",
        host : process.env.POSTGRES_HOST,
        username : process.env.POSTGRES_USER,
        password : process.env.POSTGRES_PASSWORD,
        database : process.env.POSTGRES_DB,
        synchronize : true,
        port : 5432,
        entities : ["src/entities/*.ts"]
    }
    :
    {
        type : "postgres",
        host : process.env.POSTGRES_HOST,
        username : process.env.POSTGRES_USER,
        password : process.env.POSTGRES_PASSWORD,
        database : process.env.POSTGRES_DB,
        synchronize : false,
        logging : true,
        port : 5432,
        migrations : ["src/migrations/*.ts"],
        entities : ["src/entities/*.ts"]
    })
export default AppDataSource
