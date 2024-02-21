const request = require('supertest');
let server;

describe('/book route test',() =>{
    beforeEach(()=>{server = require("../../index.js");} )
    afterEach(()=> {server.close();})
    
    describe('GET /book', () => {
        it('should return 401 while accessing without authentication',async()=>{
            const res = await request(server)
                        .get('/book?title=the&author=Er&pageSize=2&pageNo=1&publishedDateFrom=1980-01-01&publishedDateTo=2000-01-01&genre=romance')
          expect(res.status).toBe(401);
           
        })

        it('should return list of books with status 200 after authentication ',async()=>{
            const res = await request(server)
                        .get('/book?title=the&author=Er&pageSize=2&pageNo=1&publishedDateFrom=1980-01-01&publishedDateTo=2000-01-01&genre=romance')
                        .set('x-auth-token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc0FkbWluIjoxLCJlbWFpbCI6InRlc3RVc2VyMkBnbWFpbC5jb20iLCJpYXQiOjE3MDg0MzY0ODh9.10noXQljrO0LCwIcG41GieftJh0Df-SY3609-QaLLIU')
            expect(res.status).toBe(200);
           
        })
    })
})