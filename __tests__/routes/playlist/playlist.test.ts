import request from "supertest"
import app from "../../../src/app"
import { playlistCreate } from "../../mocks/playlist"
import {DataSource} from "typeorm" 
import { AppDataSource } from "../../../src/data-source"
import { adm } from "../../mocks/adm"
import { loginAdm, loginArtist, loginUser } from "../../mocks/session"
import { IPlaylist } from "../../interfaces/playlist"
import { artist } from "../../mocks/artist"
import { user } from "../../mocks/user"
import { musicCreate } from "../../mocks/music"

describe("/playlist Only Adm",()=>
{
    let connect: DataSource
    let admToken : string
    let userToken : string
    let artistToken : string
    let playlistId : string
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
        artistToken = artistLogin.body.token
        const artistMusicCreate = await request(app).post("/artist/music").send(musicCreate).set("Authorization",`Bearer ${artistToken}`)
        musicId = artistMusicCreate.body.id
        const userCreate = await request(app).post("/user").send(user)
        const userLogin = await request(app).post("/login").send(loginUser)
        const admCreate = await request(app).post("/adm").send(adm)
        const admLogin = await request(app).post("/login").send(loginAdm)

        admToken = admLogin.body.token
        userToken = userLogin.body.token
    })
    afterAll(async()=>
    {
        await connect.destroy()
    })
    it("POST /playlist - Should to be create a playlist",async()=>
    {
        const response = await request(app).post("/playlist").set("Authorization", `Bearer ${admToken}`).send(playlistCreate)
        const body = response.body as IPlaylist
        expect(response.statusCode).toBe(200)
        expect(body).toHaveProperty("id")
        playlistId = body.id
        expect(body).toHaveProperty("name")
        expect(body).toHaveProperty("music")
        expect(body).toHaveProperty("created_At")
        expect(body).toHaveProperty("updated_At")
    })
    it("POST /playlist - Should not to be create a playlist already exist",async()=>
    {
        const response = await request(app).post("/playlist").set("Authorization", `Bearer ${admToken}`).send(playlistCreate)
        expect(response.statusCode).toBe(403)
    })
    it("POST /playlist - Should not to be create a playlist without token",async()=>
    {
        const response = await request(app).post("/playlist").send(playlistCreate)
        expect(response.statusCode).toBe(401)
    })
    it("POST /playlist - Should not to be create a playlist using user token",async()=>
    {
        const response = await request(app).post("/playlist").send(playlistCreate).set("Authorization", `Bearer ${userToken}`)
        expect(response.statusCode).toBe(401)
    })
    it("POST /playlist - Should not to be create a playlist using artist token",async()=>
    {
        const response = await request(app).post("/playlist").send(playlistCreate).set("Authorization", `Bearer ${artistToken}`)
        expect(response.statusCode).toBe(401)
    })
    it("GET /playlist - Should to be list all playlists",async()=>
    {
        const response = await request(app).get("/playlist").set("Authorization", `Bearer ${admToken}`)
        const body = response.body as IPlaylist
        expect(response.statusCode).toBe(200)
        expect(Array.isArray(body)).toBeTruthy()
        expect(body[0]).toHaveProperty("id")
        expect(body[0]).toHaveProperty("name")
        expect(body[0]).toHaveProperty("music")
        expect(body[0]).toHaveProperty("created_At")
        expect(body[0]).toHaveProperty("updated_At")
    })
    it("GET /playlist - Should not to be list all playlists without token",async()=>
    {
        const response = await request(app).get("/playlist")
        expect(response.statusCode).toBe(401)
    })
    it("GET /playlist/:id - Should to be a list a playlist by id",async()=>
    {
        const response = await request(app).get(`/playlist/${playlistId}`).set("Authorization", `Bearer ${admToken}`)
        const body = response.body as IPlaylist
        expect(response.statusCode).toBe(200)
        expect(body).toHaveProperty("id")
        expect(body).toHaveProperty("name")
        expect(body).toHaveProperty("music")
        expect(body).toHaveProperty("created_At")
        expect(body).toHaveProperty("updated_At")
    })
    it("GET /playlist/:id - Should not to be a list a playlist by id without token",async()=>
    {
        const response = await request(app).get(`/playlist/${playlistId}`)
        expect(response.statusCode).toBe(401)
    })
    it("GET /playlist/:id - Should not to be a list a playlist with invalid id",async()=>
    {
        const response = await request(app).get(`/playlist/invalidId`).set("Authorization", `Bearer ${admToken}`)
        expect(response.statusCode).toBe(400)
    })
    it("GET /playlist/:id - Should not to be a list a playlist by id using user token",async()=>
    {
        const response = await request(app).get(`/playlist/${playlistId}`).set("Authorization", `Bearer ${userToken}`)
        expect(response.statusCode).toBe(401)
    })
    it("GET /playlist/:id - Should not to be a list a playlist by id using artist token",async()=>
    {
        const response = await request(app).get(`/playlist/${playlistId}`).set("Authorization", `Bearer ${artistToken}`)
        expect(response.statusCode).toBe(401)
    })
    it("POST /playlist/:id/:id_music - Should to be add music in playlist",async()=>
    {
        const response = await request(app).post(`/playlist/${playlistId}/${musicId}`).set("Authorization", `Bearer ${admToken}`)
        expect(response.statusCode).toBe(200)
    })
    it("POST /playlist/:id/:id_music - Should not to be add music in playlist without token",async()=>
    {
        const response = await request(app).post(`/playlist/${playlistId}/${musicId}`)
        expect(response.statusCode).toBe(401)
    })
    it("POST /playlist/:id/:id_music - Should not to be add music in playlist using user token",async()=>
    {
        const response = await request(app).post(`/playlist/${playlistId}/${musicId}`).set("Authorization", `Bearer ${userToken}`)
        expect(response.statusCode).toBe(401)
    })
    it("POST /playlist/:id/:id_music - Should not to be add music in playlist using artist token",async()=>
    {
        const response = await request(app).post(`/playlist/${playlistId}/${musicId}`).set("Authorization", `Bearer ${artistToken}`)
        expect(response.statusCode).toBe(401)
    })
    it("POST /playlist/:id/:id_music - Should not to be add music in playlist with invalid playlist id",async()=>
    {
        const response = await request(app).post(`/playlist/invalidId/${musicId}`).set("Authorization", `Bearer ${admToken}`)
        expect(response.statusCode).toBe(400)
    })
    it("POST /playlist/:id/:id_music - Should not to be add music in playlist with invalid music id",async()=>
    {
        const response = await request(app).post(`/playlist/${playlistId}/invalidId`).set("Authorization", `Bearer ${admToken}`)
        expect(response.statusCode).toBe(404)
    })
    it("DELETE /playlist/:id/:id_music - Should to be delete music in playlist",async()=>
    {
        const response = await request(app).delete(`/playlist/${playlistId}/${musicId}`).set("Authorization", `Bearer ${admToken}`)
        expect(response.statusCode).toBe(204)
    })
    it("DELETE /playlist/:id/:id_music - Should not to be delete music in playlist without token",async()=>
    {
        const response = await request(app).delete(`/playlist/${playlistId}/${musicId}`)
        expect(response.statusCode).toBe(401)
    })
    it("DELETE /playlist/:id/:id_music - Should not to be delete music in playlist using user token",async()=>
    {
        const response = await request(app).delete(`/playlist/${playlistId}/${musicId}`).set("Authorization", `Bearer ${userToken}`)
        expect(response.statusCode).toBe(401)
    })
    it("DELETE /playlist/:id/:id_music - Should not to be delete music in playlist using artist token",async()=>
    {
        const response = await request(app).delete(`/playlist/${playlistId}/${musicId}`).set("Authorization", `Bearer ${artistToken}`)
        expect(response.statusCode).toBe(401)
    })
    it("DELETE /playlist/:id/:id_music - Should not to be delete music in playlist with invalid playlist id",async()=>
    {
        const response = await request(app).delete(`/playlist/invalidId/${musicId}`).set("Authorization", `Bearer ${admToken}`)
        expect(response.statusCode).toBe(400)
    })
    it("DELETE /playlist/:id/:id_music - Should not to be delete music in playlist with invalid music id",async()=>
    {
        const response = await request(app).post(`/playlist/${playlistId}/invalidId`).set("Authorization", `Bearer ${admToken}`)
        expect(response.statusCode).toBe(404)
    })
    it("DELETE /playlist/:id - Should to be delete a playlist",async()=>
    {
        const response = await request(app).delete(`/playlist/${playlistId}`).set("Authorization", `Bearer ${admToken}`)
        expect(response.statusCode).toBe(204)
    })
    it("DELETE /playlist/:id - Should not to be delete a playlist with invalid id",async()=>
    {
        const response = await request(app).delete(`/playlist/invalidId`).set("Authorization", `Bearer ${admToken}`)
        expect(response.statusCode).toBe(400)
    })
    it("DELETE /playlist/:id - Should not to be delete a playlist without token",async()=>
    {
        const response = await request(app).delete(`/playlist/${playlistId}`)
        expect(response.statusCode).toBe(401)
    })
    it("DELETE /playlist/:id - Should not to be delete a playlist using user token",async()=>
    {
        const response = await request(app).delete(`/playlist/${playlistId}`).set("Authorization", `Bearer ${userToken}`)
        expect(response.statusCode).toBe(401)
    })
    it("DELETE /playlist/:id - Should not to be delete a playlist using artist token",async()=>
    {
        const response = await request(app).delete(`/playlist/${playlistId}`).set("Authorization", `Bearer ${artistToken}`)
        expect(response.statusCode).toBe(401)
    })
})