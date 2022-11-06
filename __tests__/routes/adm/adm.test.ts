import { DataSource } from "typeorm"
import request from "supertest"
import { AppDataSource } from "../../../src/data-source"
import app from "../../../src/app"
import {adm,admHashInvalid,admUpdated,admWithout} from "../../mocks/adm"
import { IAdm } from "../../interfaces/adm"
import { user } from "../../mocks/user"
import {loginAdm,loginUser} from "../../mocks/session"
describe("/adm",()=>
{
    let connect : DataSource
    let tokenAdmin : string
    let tokenUser : string
    beforeAll(async()=>
    {
        await AppDataSource.initialize().then((connection)=>
        {
            connect = connection
        }).catch((err)=>
        {
            console.log(err)
        })
        await request(app).post("/user").send(user)
        const userResponse = await request(app).post("/login").send(loginUser)
        tokenUser = userResponse.body.token
    })
    afterAll(async()=>
    {
        await connect.destroy()
    })
    it("POST /adm - Should to be able a creation of adm",async()=>
    {
        const response = await request(app).post("/adm").send(adm)
        const admResponse = await request(app).post("/login").send(loginAdm)
        tokenAdmin = admResponse.body.token
        const body = response.body as IAdm
        expect(response.statusCode).toBe(201)
        expect(body).toHaveProperty("id")
        expect(body).toHaveProperty("email")
        expect(body).toHaveProperty("avatar_img")
    })
    it("POST /adm - Should not to be able a creation of adm using the same email",async()=>
    {
        const response = await request(app).post("/adm").send(adm)
        expect(response.statusCode).toBe(403)
        expect(response.body).toHaveProperty("message")
    })
    it("POST /adm - Should not to able a creation of adm with invalid hashAdm",async()=>
    {
        const response = await request(app).post("/adm").send(admHashInvalid)
        expect(response.statusCode).toBe(401)
        expect(response.body).toHaveProperty("message")
    })
    it("POST /adm - Should not to be able a creation of adm without fields",async()=>
    {
        const response = await request(app).post("/adm").send(admWithout)
        expect(response.statusCode).toBe(400)
        expect(response.body).toHaveProperty("message")
    })
    it("GET /adm/profile - Should to be able a list adm profile",async()=>
    {
        const response = await request(app).get("/adm/profile").set("Authorization",`Bearer ${tokenAdmin}`)
        const body = response.body as IAdm
        expect(response.statusCode).toBe(200)
        expect(body).toHaveProperty("id")
        expect(body).toHaveProperty("name")
        expect(body).toHaveProperty("email")
        expect(body).toHaveProperty("avatar_img")
    })
    it("GET /adm/profile - Should not to be able a list adm profile without token",async()=>
    {
        const response = await request(app).get("/adm/profile")
        expect(response.statusCode).toBe(401)
        expect(response.body).toHaveProperty("message")
    })
    it("PATCH /adm/profile - Should to be able edit adm profile",async()=>
    {
        const response = await request(app).patch("/adm/profile").set("Authorization",`Bearer ${tokenAdmin}`).send(admUpdated)
        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveProperty("message")
    })
})