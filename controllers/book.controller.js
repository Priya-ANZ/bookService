const BookService = require("../services/book.service.js");
const url = require('url');
const Joi = require("joi").extend(require('@joi/date'));

exports.getBooks = async function(req, res){
    //console.log("res", res)
        var queryData = url.parse(req.url, true).query;
        const { error } = validate(queryData)
        if (error) return res.status(400).send(error.details[0].message);
        const books = await BookService.getBooks(queryData);
        if(books.pagination.from == books.pagination.to) return res.status(400).json({data: [], message: "No data found for given parameters"});
        return res.status(200).json({status:200, data:books.data, message: "data sent"})
}

function validate (bookObj) {
    const schema = Joi.object({
        title: Joi.string().min(1).max(50).required(),
        author:Joi.string().min(2).max(50).required(),
        description: Joi.string().min(5).max(250),
        publishedDateFrom: Joi.date().format('YYYY-MM-DD').utc(),
        publishedDateTo: Joi.date().format('YYYY-MM-DD').utc(),
        genre: Joi.string().min(3),
        pageNo: Joi.number(),
        pageSize: Joi.number()
      });
      return schema.validate(bookObj);
    }


exports.validate = validate;
