import request from "supertest"
import app from "../../../src/app"
import {DataSource} from "typeorm" 
import { AppDataSource } from "../../../src/data-source"
import { adm } from "../../mocks/adm"
import { loginAdm, loginArtist, loginUser } from "../../mocks/session"
import { artist } from "../../mocks/artist"
import { user } from "../../mocks/user"
import { musicCreate } from "../../mocks/music"
import { IMusicCreate } from "../../interfaces/music"
import path from "path"

describe("/artist/music",()=>
{
    let connect: DataSource
    let admToken : string
    let userToken : string
    let artistToken : string
    let musicId : string
    beforeAll(async()=>
    {
        await AppDataSource.initialize().then((connection)=>
        {
            connect = connection
        }).catch((errConnection)=>
        {
            console.log(errConnection)
        })
        const artistCreate = await request(app).post("/artist").send(artist)
        const artistLogin = await request(app).post("/login").send(loginArtist)
        const userCreate = await request(app).post("/user").send(user)
        const userLogin = await request(app).post("/login").send(loginUser)
        const admCreate = await request(app).post("/adm").send(adm)
        const admLogin = await request(app).post("/login").send(loginAdm)
        
        artistToken = artistLogin.body.token
        admToken = admLogin.body.token
        userToken = userLogin.body.token
    })
    afterAll(async()=>
    {
        await connect.destroy()
    })
    it("POST /artist/music - Should to be create a music",async()=>
    {
        const response = await request(app).post("/artist/music").send(musicCreate).set("Authorization",`Bearer ${artistToken}`)
        const body = response.body as IMusicCreate
        expect(response.statusCode).toBe(201)
        expect(body).toHaveProperty("id")
        musicId = body.id
        expect(body).toHaveProperty("name")
        expect(body).toHaveProperty("artistName")
        expect(body).toHaveProperty("music_url")
        expect(body).toHaveProperty("image_url")
        expect(body).toHaveProperty("description")
        expect(body).toHaveProperty("created_At")
        expect(body).toHaveProperty("updated_At")   
    })
    it("POST /artist/music - Should not to be create a music without token",async()=>
    {
        const response = await request(app).post("/artist/music").send(musicCreate)
        expect(response.statusCode).toBe(401) 
    })
    it("POST /artist/music - Should not to be create a music using user token",async()=>
    {
        const response = await request(app).post("/artist/music").send(musicCreate).set("Authorization",`Bearer ${userToken}`)
        expect(response.statusCode).toBe(401) 
    })
    it("POST /artist/music - Should not to be create a music using adm token",async()=>
    {
        const response = await request(app).post("/artist/music").send(musicCreate).set("Authorization",`Bearer ${admToken}`)
        expect(response.statusCode).toBe(401) 
    })
    it("GET /artist/music - Should to be list all musics of artist",async()=>
    {
        const response = await request(app).get("/artist/music").set("Authorization", `Bearer ${artistToken}`)
        const body = response.body as IMusicCreate[]
        expect(response.statusCode).toBe(200)
        expect(Array.isArray(body)).toBeTruthy()
        expect(body[0]).toHaveProperty("id")
        expect(body[0]).toHaveProperty("name")
        expect(body[0]).toHaveProperty("artistName")
        expect(body[0]).toHaveProperty("music_url")
        expect(body[0]).toHaveProperty("image_url")
        expect(body[0]).toHaveProperty("description")
        expect(body[0]).toHaveProperty("created_At")
        expect(body[0]).toHaveProperty("updated_At")   
    })
    it("GET /artist/music - Should not to be list all musics of artist without token",async()=>
    {
        const response = await request(app).get("/artist/music")
        expect(response.statusCode).toBe(401)  
    })
    it("GET /artist/music - Should not to be list all musics of artist using user token",async()=>
    {
        const response = await request(app).get("/artist/music").set("Authorization",`Bearer ${userToken}`)
        expect(response.statusCode).toBe(401)  
    })
    it("GET /artist/music - Should not to be list all musics of artist using adm token",async()=>
    {
        const response = await request(app).get("/artist/music").set("Authorization",`Bearer ${admToken}`)
        expect(response.statusCode).toBe(401)  
    })
    it("GET /artist/music/:id_music - Should to be list music of artist",async()=>
    {
        const response = await request(app).get(`/artist/music/${musicId}`).set("Authorization",`Bearer ${artistToken}`)
        const body = response.body as IMusicCreate
        expect(response.statusCode).toBe(200)
        expect(body).toHaveProperty("id")
        expect(body).toHaveProperty("name")
        expect(body).toHaveProperty("artistName")
        expect(body).toHaveProperty("music_url")
        expect(body).toHaveProperty("image_url")
        expect(body).toHaveProperty("description")
        expect(body).toHaveProperty("created_At")
        expect(body).toHaveProperty("updated_At")  
    })
    it("GET /artist/music/:id_music - Should not to be list music of artist with invalid id",async()=>
    {
        const response = await request(app).get(`/artist/music/invalidId`).set("Authorization",`Bearer ${artistToken}`)
        expect(response.statusCode).toBe(404)
    })
    it("GET /artist/music/:id_music - Should not to be list music of artist without token",async()=>
    {
        const response = await request(app).get(`/artist/music/${musicId}`)
        expect(response.statusCode).toBe(401)
    })
    it("GET /artist/music/:id_music - Should not to be list music of artist using user token",async()=>
    {
        const response = await request(app).get(`/artist/music/${musicId}`).set("Authorization",`Bearer ${userToken}`)
        expect(response.statusCode).toBe(401)
    })
    it("GET /artist/music/:id_music - Should not to be list music of artist using adm token",async()=>
    {
        const response = await request(app).get(`/artist/music/${musicId}`).set("Authorization",`Bearer ${admToken}`)
        expect(response.statusCode).toBe(401)
    })
})