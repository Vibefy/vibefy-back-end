import { DataSource } from "typeorm";
import "dotenv/config"

const dataSource = new DataSource(process.env.NODE_ENV == "test" ? 
    {
        type : "sqlite",
        database : ":memory:",
        synchronize : true,
        entities : ["./entities/*.ts"]
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
        migrations : ["./migrations/*.ts"],
        entities : ["./entities/*.ts"]
    })
export default dataSource