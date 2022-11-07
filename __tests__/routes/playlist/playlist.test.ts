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

describe("/playlist Only Adm",()=>
{
    let connect: DataSource
    let admToken : string
    let userToken : string
    let artistToken : string
    beforeAll(async()=>
    {
        AppDataSource.initialize().then((connection)=>
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
        admToken = admLogin.body.token
        userToken = userLogin.body.token
        artistToken = artistLogin.body.token
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
        expect(body).toHaveProperty("name")
        expect(body).toHaveProperty("music")
        expect(body).toHaveProperty("user")
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
})