import { DataSource } from "typeorm"
import app from "../../../src/app"
import { AppDataSource } from "../../../src/data-source"
import { adm } from "../../mocks/adm"
import { artist } from "../../mocks/artist"
import { loginAdm, loginArtist, loginUser } from "../../mocks/session"
import { user } from "../../mocks/user"
import request from "supertest"
import { playlistCreate } from "../../mocks/playlist"
import { IPlaylist } from "../../interfaces/playlist"

describe("/user/playlist",()=>
{
    let connect : DataSource
    let admToken : string
    let userToken : string
    let artistToken : string
    let userId : String
    let artistId : string
    let playlistId : string

    beforeAll(async()=>
    {
       await AppDataSource.initialize().then((connection)=>
        {
            connect = connection
        }).catch((errConnection)=>
        {
            console.log(errConnection)
        })
        const userCreate = await request(app).post("/user").send(user)
        const userLogin = await request(app).post("/login").send(loginUser)
        const artistCreate = await request(app).post("/artist").send(artist)
        const artistLogin = await request(app).post("/login").send(loginArtist)
        const admCreate = await request(app).post("/adm").send(adm)
        const admLogin = await request(app).post("/login").send(loginAdm)

        userToken = userLogin.body.token
        artistToken = artistLogin.body.token
        admToken = admLogin.body.token

        const playlistResponse = await request(app).post("/playlist").set("Authorization", `Bearer ${admToken}`).send(playlistCreate)
        userId = userCreate.body.id
        artistId = artistCreate.body.id
        playlistId = playlistResponse.body.id

    })
    afterAll(async()=>
    {
        await connect.destroy()
    })
    it("/user/playlist/:id_playlist - Should to be add playlist",async()=>
    {
        const response = await request(app).post(`/user/playlist/${playlistId}`).set("Authorization",`Bearer ${userToken}`)
        expect(response.statusCode).toBe(200)
    })
    it("/user/playlist/:id_playlist - Should not to be add duplicate playlist",async()=>
    {
        const response = await request(app).post(`/user/playlist/${playlistId}`).set("Authorization",`Bearer ${userToken}`)
        expect(response.statusCode).toBe(403)
    })
    it("/user/playlist/:id_playlist - Should not to be add playlist without token",async()=>
    {
        const response = await request(app).post(`/user/playlist/${playlistId}`)
        expect(response.statusCode).toBe(401)
    })
    it("/user/playlist/:id_playlist - Should not to be add playlist using artist token",async()=>
    {
        const response = await request(app).post(`/user/playlist/${playlistId}`).set("Authorization",`Bearer ${artistToken}`)
        expect(response.statusCode).toBe(401)
    })
    it("/user/playlist/:id_playlist - Should not to be add playlist using adm token",async()=>
    {
        const response = await request(app).post(`/user/playlist/${playlistId}`).set("Authorization",`Bearer ${admToken}`)
        expect(response.statusCode).toBe(401)
    })
    it("POST /user/playlist/:id_playlist - Should not to be add playlist with invalid id",async()=>
    {
        const response = await request(app).post(`/user/playlist/invalidId`).set("Authorization",`Bearer ${userToken}`)
        expect(response.statusCode).toBe(404)
    })
    it("GET /user/playlist/ - Should to be list all playlists in user",async()=>
    {
        const response = await request(app).get(`/user/playlist/`).set("Authorization",`Bearer ${userToken}`)
        const body = response.body as IPlaylist
        expect(response.statusCode).toBe(200)
        expect(Array.isArray(body)).toBeTruthy()
        expect(body[0]).toHaveProperty("id")
        expect(body[0]).toHaveProperty("name")
        expect(body[0]).toHaveProperty("music")
        expect(body[0]).toHaveProperty("created_At")
        expect(body[0]).toHaveProperty("updated_At")
    })
    it("GET /user/playlist/ - Should not to be list all playlists in user without token",async()=>
    {
        const response = await request(app).get(`/user/playlist/`)
        expect(response.statusCode).toBe(401)
    })
    it("GET /user/playlist/ - Should not to be list all playlists using artist token",async()=>
    {
        const response = await request(app).get(`/user/playlist/`).set("Authorization",`Bearer ${artistToken}`)
        expect(response.statusCode).toBe(401)
    })
    it("GET /user/playlist/ - Should not to be list all playlists using adm token",async()=>
    {
        const response = await request(app).get(`/user/playlist/`).set("Authorization",`Bearer ${admToken}`)
        expect(response.statusCode).toBe(401)
    })
    it("GET /user/playlist/ - Should not to be list all playlists using invalid token",async()=>
    {
        const response = await request(app).get(`/user/playlist/`).set("Authorization",`Bearer invalidToken`)
        expect(response.statusCode).toBe(401)
    })
    it("GET /user/playlist/:id - Should to be list playlist by id",async()=>
    {
        const response = await request(app).get(`/user/playlist/${playlistId}`).set("Authorization",`Bearer ${userToken}`)
        const body = response.body as IPlaylist
        expect(response.statusCode).toBe(200)
        expect(body).toHaveProperty("id")
        expect(body).toHaveProperty("name")
        expect(body).toHaveProperty("music")
        expect(body).toHaveProperty("created_At")
        expect(body).toHaveProperty("updated_At")
    })
    it("GET /user/playlist/:id - Should not to be list playlist by id without token",async()=>
    {
        const response = await request(app).get(`/user/playlist/${playlistId}`)
        expect(response.statusCode).toBe(401)
    })
    it("GET /user/playlist/:id - Should not to be list playlist by id with invalid token",async()=>
    {
        const response = await request(app).get(`/user/playlist/${playlistId}`).set("Authorization",`Bearer invalidToken`)
        expect(response.statusCode).toBe(401)
    })
    it("GET /user/playlist/:id - Should not to be list playlist by id with using artist token",async()=>
    {
        const response = await request(app).get(`/user/playlist/${playlistId}`).set("Authorization",`${artistToken}`)
        expect(response.statusCode).toBe(401)
    })
    it("GET /user/playlist/:id - Should not to be list playlist by id with using adm token",async()=>
    {
        const response = await request(app).get(`/user/playlist/${playlistId}`).set("Authorization",`${admToken}`)
        expect(response.statusCode).toBe(401)
    })
    it("GET /user/playlist/:id - Should not to be list playlist with invalid id",async()=>
    {
        const response = await request(app).get(`/user/playlist/invalidId`).set("Authorization",`Bearer ${userToken}`)
        expect(response.statusCode).toBe(404)
    })
    it("DELETE /user/playlist/:id - Should to be remove playlist in user",async()=>
    {
        const response = await request(app).delete(`/user/playlist/${playlistId}`).set("Authorization",`Bearer ${userToken}`)
        expect(response.statusCode).toBe(204)
    })
    it("DELETE /user/playlist/:id - Should not to be remove playlist in user without token",async()=>
    {
        const response = await request(app).delete(`/user/playlist/${playlistId}`)
        expect(response.statusCode).toBe(401)
    })
    it("DELETE /user/playlist/:id - Should not to be remove playlist in user with invalid token",async()=>
    {
        const response = await request(app).delete(`/user/playlist/${playlistId}`).set("Authorization",`Bearer invalidToken`)
        expect(response.statusCode).toBe(401)
    })
    it("DELETE /user/playlist/:id - Should not to be remove playlist in user with artist token",async()=>
    {
        const response = await request(app).delete(`/user/playlist/${playlistId}`).set("Authorization",`Bearer ${artistToken}`)
        expect(response.statusCode).toBe(401)
    })
    it("DELETE /user/playlist/:id - Should not to be remove playlist in user with adm token",async()=>
    {
        const response = await request(app).delete(`/user/playlist/${playlistId}`).set("Authorization",`Bearer ${admToken}`)
        expect(response.statusCode).toBe(401)
    })
    it("DELETE /user/playlist/:id - Should not to be remove playlist in user with invalid id",async()=>
    {
        const response = await request(app).delete(`/user/playlist/invalidId`).set("Authorization",`Bearer ${userToken}`)
        expect(response.statusCode).toBe(404)
    })
})