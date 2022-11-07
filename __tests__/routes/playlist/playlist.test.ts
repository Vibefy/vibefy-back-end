import request from "supertest"
import app from "../../../src/app"
import { playlistCreate } from "../../mocks/playlist"

describe("/playlist",async()=>
{
    it("POST /playlist - Should to be create a playlist",async()=>
    {
        const response = await request(app).post("/playlist").send(playlistCreate)
        
    })
})