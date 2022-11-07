import { DataSource } from "typeorm"
import request from "supertest"
import { AppDataSource } from "../../../src/data-source"
import app from "../../../src/app"
import { user } from "../../mocks/user"
import { loginArtist, loginUser } from "../../mocks/session"
import { artist, artistWithout,artistUpdated } from "../../mocks/artist"
import { IArtist } from "../../interfaces/artist"

describe("/artist",()=>
{
    let connect : DataSource
    let tokenUser : string
    let tokenArtist  : string
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
        const userLogin = await request(app).post("/login").send(loginUser)
        const artistLogin = await request(app).post("/login").send(loginArtist)
        tokenUser = userLogin.body.token
    })
    afterAll(async()=>
    {
        await connect.destroy()
    })
    it("POST /artist - Should to be create an artist",async()=>
    {
        const response = await request(app).post("/artist").send(artist)
        const artistLogin = await request(app).post("/login").send(loginArtist)
        tokenArtist = artistLogin.body.token
        const body = response.body as IArtist
        expect(response.statusCode).toBe(201)
        expect(body).toHaveProperty("id")
        expect(body).toHaveProperty("name")
        expect(body).toHaveProperty("email")
        expect(body).toHaveProperty("avatar_img")
        expect(body).toHaveProperty("isActive")
        expect(body).toHaveProperty("created_At")
        expect(body).toHaveProperty("updated_At")
    })
    it("POST /artist - Should not to be create an artist with the same email",async()=>
    {
        const response = await request(app).post("/artist").send(artist)
        expect(response.statusCode).toBe(403)
        expect(response.body).toHaveProperty("message")
    })
    it("POST /artist - Should not to be create an artist without fields",async()=>
    {
        const response = await request(app).post("/artist").send(artistWithout)
        expect(response.statusCode).toBe(400)
        expect(response.body).toHaveProperty("message")
    })
    it("GET /artist/profile - Should to be list an artist",async()=>
    {
        const response = await request(app).get("/artist/profile").set("Authorization",`Bearer ${tokenArtist}`)
        const body = response.body as IArtist
        expect(response.statusCode).toBe(200)
        expect(body).toHaveProperty("id")
        expect(body).toHaveProperty("name")
        expect(body).toHaveProperty("email")
        expect(body).toHaveProperty("avatar_img")
        expect(body).toHaveProperty("isActive")
        expect(body).toHaveProperty("created_At")
        expect(body).toHaveProperty("updated_At")
    })
    it("GET /artist/profile - Should not to be list an artist without token",async()=>
    {
        const response = await request(app).get("/artist/profile")
        expect(response.statusCode).toBe(401)
        expect(response.body).toHaveProperty("message")
    })
    it("GET /artist/profile - Should not to be list an artist using user token",async()=>
    {
        const response = await request(app).get("/artist/profile").set("Authorization",`Bearer ${tokenUser}`)
        expect(response.statusCode).toBe(401)
        expect(response.body).toHaveProperty("message")
    })
    it("PATCH /artist/profile - Should to be edit an artist",async()=>
    {
        const response = await request(app).patch("/artist/profile").set("Authorization",`Bearer ${tokenArtist}`).send(artistUpdated)
        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveProperty("message")
    })
    it("PATCH /artist/profile - Should not to be edit an artist without token",async()=>
    {
        const response = await request(app).patch("/artist/profile").send(artistUpdated)
        expect(response.statusCode).toBe(401)
        expect(response.body).toHaveProperty("message")
    })
    it("PATCH /artist/profile - Should not to be edit an artist using user token",async()=>
    {
        const response = await request(app).patch("/artist/profile").send(artistUpdated).set("Authorization",`Bearer ${tokenUser}`)
        expect(response.statusCode).toBe(401)
        expect(response.body).toHaveProperty("message")
    })
    it("PATCH /artist/profile - Should not to be edit an artist without fields",async()=>
    {
        const response = await request(app).patch("/artist/profile").set("Authorization",`Bearer ${tokenArtist}`)
        expect(response.statusCode).toBe(400)
        expect(response.body).toHaveProperty("message")
    })
    it("DELETE /artist/profile - Should to be delete an artist",async()=>
    {
        const response = await request(app).delete("/artist/profile").set("Authorization",`Bearer ${tokenArtist}`)
        expect(response.statusCode).toBe(204)
    })
    it("DELETE /artist/profile - Should not to be delete an artist already deleted",async()=>
    {
        const response = await request(app).delete("/artist/profile").set("Authorization",`Bearer ${tokenArtist}`)
        expect(response.statusCode).toBe(400)
    })
    it("DELETE /artist/profile - Should not to be delete an artist without token",async()=>
    {
        const response = await request(app).delete("/artist/profile")
        expect(response.statusCode).toBe(401)
    })
    it("DELETE /artist/profile - Should not to be delete an artist using user token",async()=>
    {
        const response = await request(app).delete("/artist/profile").set("Authorization",`Bearer ${tokenUser}`)
        expect(response.statusCode).toBe(401)
    })
})