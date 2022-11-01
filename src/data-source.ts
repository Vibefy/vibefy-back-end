import { DataSource } from "typeorm";
import "dotenv/config"

const dataSource = new DataSource(
    {
        type : "postgres",
        host : process.env.POSTGRES_HOST,
        username : process.env.POSTGRES_USER,
        password : process.env.POSTGRES_PASSWORD,
        database : process.env.POSTGRES_DB,
        synchronize : false,
        logging : true,
        port : 5432,
        migrations : ["./src/migrations/*.ts"],
        entities : ["./src/entities/*.ts"]
    })
export default dataSource