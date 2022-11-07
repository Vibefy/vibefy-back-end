import request from "supertest"
import { DataSource } from "typeorm";
import app from "../../../src/app"
import { user } from "../../mocks/user"
import {loginUser, loginAdm, loginArtist, loginWithout} from "../../mocks/session"
import {AppDataSource} from "../../../src/data-source";
import { adm } from "../../mocks/adm";
import { decode } from "jsonwebtoken";
import { artist } from "../../mocks/artist";
describe("/login",()=>
{
    let connect: DataSource
    beforeAll(async()=>
    {
        // await request(app).post("/artist")
        await AppDataSource.initialize().then((connection)=>
        {
            connect = connection
        })
        await request(app).post("/adm").send(adm)
        await request(app).post("/user").send(user)
        await request(app).post("/artist").send(artist)
    })
    afterAll(async ()=>
    {
        await connect.destroy()
    })
    it("POST /login - Should to able a login with user account",async ()=>
    {
        const response = await request(app).post("/login").send(loginUser)
        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveProperty("token")
        const token = response.body.token
        expect(decode(token)).toMatchObject({type : "user"})
    })
    it("POST /login - Should to be able a login with adm account",async ()=>
    {
        const response = await request(app).post("/login").send(loginAdm)
        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveProperty("token")
        const token = response.body.token
        expect(decode(token)).toMatchObject({type : "adm"})
    })
    it("POST /login - Should to be able a login with artist account",async ()=>
    {
        const response = await request(app).post("/login").send(loginArtist)
        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveProperty("token")
        const token = response.body.token
        expect(decode(token)).toMatchObject({type : "artist"})
    })
    it("POST /login - Should not to be able a login without fields",async()=>
    {
        const response = await request(app).post("/login").send(loginWithout)
        expect(response.statusCode).toBe(400)
    })
})
