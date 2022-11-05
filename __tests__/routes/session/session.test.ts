import request from "supertest"
import { DataSource } from "typeorm";
import app from "../../../src/app"
import { user } from "../../mocks/user"
import {login} from "../../mocks/session"
import AppDataSource from "../../../src/data-source";
describe("POST - /login",()=>
{
    let connect: DataSource
    beforeAll(async()=>
    {
        // await request(app).post("/adm")
        // await request(app).post("/artist")
        await AppDataSource.initialize().then((connection)=>
        {
            connect = connection
        })
    })
    afterAll(async ()=>
    {
        await connect.destroy()
    })
    it("Should to able a login",async ()=>
    {
        await request(app).post("/user").send(user)
        const response = await request(app).post("/login").send(login)
        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveProperty("token")
    })
})

export { login };
