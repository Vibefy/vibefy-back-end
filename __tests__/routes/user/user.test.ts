import app from "../../../src/app"
import request from "supertest"
import { user, userUpdated, userWithout } from "../../mocks/user"
import {IUser} from "../../interfaces/user"
import { loginArtist, loginUser } from "../../mocks/session"
import {AppDataSource} from "../../../src/data-source"
import {DataSource} from "typeorm"
import { artist } from "../../mocks/artist"

let connect: DataSource;
let token: string;
let tokenArtist : string;
describe("/user",()=>
{
    beforeAll(async()=>
    {
        await AppDataSource.initialize().then((connection)=>
        {
            connect = connection
        })
        const artistCreate = await request(app).post("/artist").send(artist)
        const artistLogin = await request(app).post("/login").send(loginArtist)
        tokenArtist = artistLogin.body.token
    })
    afterAll(async()=>
    {
        await connect.destroy()
    })
    it("POST /user - Should to be able a creation of user",async ()=>
    {
        const response = await request(app).post("/user").send(user)
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
    it("POST /user - Should not to be able a creation of user using the same email",async()=>
    {
        const response = await request(app).post("/user").send(user)
        expect(response.statusCode).toBe(403)
        expect(response.body).toHaveProperty("message")
    })
    it("POST /user - Should not to be able a creation of user without fields",async()=>
    {
        const response = await request(app).post("/user").send(userWithout)
        expect(response.statusCode).toBe(400)
        expect(response.body).toHaveProperty("message")
    })
    it("GET /user/profile - Should be able show user profile",async()=>
    {
        const loginRes = await request(app).post("/login").send(loginUser)
        token = loginRes.body.token
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
    it("GET /user/profile - Should not be able show user profile without token",async()=>
    {
        const response = await request(app).get("/user/profile")
        expect(response.statusCode).toBe(401)
        expect(response.body).toHaveProperty("message")
    })
    it("PATCH /user/profile - Should be able an edit the user",async ()=>
    {
        const response = await request(app).patch("/user/profile").set("Authorization", `Bearer ${token}`).send(userUpdated)
        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveProperty("message")
    })
    it("PATCH /user/profile - Should not be able an edit the user without token",async ()=>
    {
        const response = await request(app).patch("/user/profile").send(userUpdated)
        expect(response.statusCode).toBe(401)
        expect(response.body).toHaveProperty("message")
    })
    it("PATCH /user/profile - Should not be able an edit the user without body",async ()=>
    {
        const response = await request(app).patch("/user/profile").set("Authorization", `Bearer ${token}`)
        expect(response.statusCode).toBe(400)
        expect(response.body).toHaveProperty("message")
    })
    it("DELETE /user/profile - Should to be delete an user",async()=>
    {
        const response = await request(app).delete("/user/profile").set("Authorization",`Bearer ${token}`)
        expect(response.statusCode).toBe(204)
    })
    it("DELETE /user/profile - Should not to be delete an user already deleted",async()=>
    {
        const response = await request(app).delete("/user/profile").set("Authorization",`Bearer ${token}`)
        expect(response.statusCode).toBe(400)
    })
    it("DELETE /user/profile - Should not to be delete an artist without token",async()=>
    {
        const response = await request(app).delete("/user/profile")
        expect(response.statusCode).toBe(401)
    })
    it("DELETE /user/profile - Should not to be delete an artist using artist token",async()=>
    {
        const response = await request(app).delete("/user/profile").set("Authorization",`Bearer ${tokenArtist}`)
        expect(response.statusCode).toBe(401)
    })
})