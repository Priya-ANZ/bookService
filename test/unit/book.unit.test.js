
const BookController = require("../../controllers/book.controller.js");


describe('test request body validation',() => {
  it('should return error if book title not present in request querystring',() =>{
   
    const bookObj = {
        title: '',
        author: 'Er',
        pageSize: '2',
        pageNo: '1',
        publishedDateFrom: '1980-01-01',
        publishedDateTo: '2000-01-01',
        genre: 'romance'
      }
    const {error} = BookController.validate(bookObj)
    expect(error.details[0].message).toBe('"title" is not allowed to be empty')
  } )

  it('should return error if book author not present in request querystring',() =>{
   
    const bookObj = {
        title: 'The',
        author: '',
        pageSize: '2',
        pageNo: '1',
        publishedDateFrom: '1980-01-01',
        publishedDateTo: '2000-01-01',
        genre: 'romance'
      }
    const {error} = BookController.validate(bookObj)
    expect(error.details[0].message).toBe('"author" is not allowed to be empty')
  } )

  it('should return error if published date range not in YYYY-MM-DD format in request querystring',() =>{
   
    const bookObj = {
        title: 'The',
        author: 'Er',
        pageSize: '2',
        pageNo: '1',
        publishedDateFrom: '1980',
        publishedDateTo: '2000-01-01',
        genre: 'romance'
      }
    const {error} = BookController.validate(bookObj);
    expect(error.details[0].message).toBe('"publishedDateFrom" must be in YYYY-MM-DD format')
  } )
})

