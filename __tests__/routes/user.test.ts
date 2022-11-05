import request from "supertest"
import app from "../../src/app"
import { user, userUpdated, userWithout } from "../mocks/user"
import {IUser} from "../interfaces/user"
import { login } from "../mocks/session"
import AppDataSource from "../../src/data-source"
import { DataSource } from "typeorm"

describe("POST - /user",()=>
{
    let connect: DataSource
    beforeAll(async()=>
    {
        await AppDataSource.initialize().then((connection)=>
        {
            connect = connection
        })
    })
    afterAll(async()=>
    {
        await AppDataSource.dropDatabase()
        await connect.destroy()
    })
    it("Should to be able a creation of user",async ()=>
    {
        const response = await request(app).post("/user").send(user)
        console.log(response.body)
        const body = response.body as IUser
        expect(typeof body).toBe("object")
        expect(response.statusCode).toBe(201)
        expect(body).toHaveProperty("id")
        expect(body).toHaveProperty("name")
        expect(body).toHaveProperty("email")
        expect(body).toHaveProperty("avatar_img")
        expect(body).toHaveProperty("payment")
        expect(body).toHaveProperty("playlist")
        expect(Array.isArray(body.playlist)).toBeTruthy()
        expect(body).toHaveProperty("created_At")
        expect(body).toHaveProperty("updated_At")
    }) 
    it("Should not to be able a creation of user with duplicate email",async()=>
    {
        const response = await request(app).post("/user").send(user)
        expect(response.statusCode).toBe(403)
        expect(response.body).toHaveProperty("message")
    })
    it("Should not to be able a creation of user without fields",async()=>
    {
        const response = await request(app).post("/user").send(userWithout)
        expect(response.statusCode).toBe(400)
        expect(response.body).toHaveProperty("message")
    })
})
describe("GET - /user/profile",()=>
{
    it("Should not be able show user profile",async()=>
    {
        const loginRes = await request(app).post("/login").send(login)
        const token = loginRes.body.token
        const response = await request(app).get("/user/profile").set("Authorization", `Bearer ${token}`)
        const body = response.body as IUser
        expect(typeof body).toBe("object")
        expect(response.statusCode).toBe(200)
        expect(body).toHaveProperty("id")
        expect(body).toHaveProperty("name")
        expect(body).toHaveProperty("email")
        expect(body).toHaveProperty("avatar_img")
        expect(body).toHaveProperty("payment")
        expect(body).toHaveProperty("playlist")
        expect(Array.isArray(body.playlist)).toBeTruthy()
        expect(body).toHaveProperty("created_At")
        expect(body).toHaveProperty("updated_At")
    })
    it("Should not be able show user profile without token",async()=>
    {
        const response = await request(app).get("/user/profile")
        expect(response.statusCode).toBe(401)
        expect(response.body).toHaveProperty("message")
    })
})

describe("PATCH - user/profile",()=>
{
    it("Should be able an edit the user",async ()=>
    {
        const loginRes = await request(app).post("/login").send(login)
        const token = loginRes.body.token
        const response = await request(app).patch("/user/profile").set("Authorization", `Bearer ${token}`).send(userUpdated)
        const body = response.body as IUser
        expect(response.statusCode).toBe(200)
        expect(body.email).toBe(userUpdated.email)
        expect(body.name).toBe(userUpdated.name)
        expect(body.password).toBe(userUpdated.password)
    })
    it("Should not be able an edit the user without token",async ()=>
    {
        const loginRes = await request(app).post("/login").send(login)
        const token = loginRes.body.token
        const response = await request(app).patch("/user/profile").send(userUpdated)
        expect(response.statusCode).toBe(401)
        expect(response.body).toHaveProperty("message")
    })
})
describe("DELETE /user/profile",()=>
{
    it("Should be able a delete the user",async()=>
    {
        const loginRes = await request(app).post("/login").send(login)
        const token = loginRes.body.token
        const response = await request(app).delete("/user/profile").set("Authorization",`Bearer : ${token}`)
        expect(response.statusCode).toBe(204)
    })
    it("Should not be able a delete the user without token",async()=>
    {
        const response = await request(app).delete("/user/profile")
        expect(response.statusCode).toBe(401)
    })
})