const db = require("../db/db.js");
const { attachPaginate } = require('knex-paginate');
attachPaginate();

exports.getBooks = async function(queryData){

    const {title, author, publishedDateFrom, publishedDateTo, genre,pageNo, pageSize} = queryData;
    const {DEFAULT_PAGENO,DEFAULT_PAGESIZE} = process.env;
    const pageNumber = pageNo? pageNo : DEFAULT_PAGENO;
    const pageLimit = pageSize? pageSize : DEFAULT_PAGESIZE;
    const books = await db('books')
                            .innerJoin('authors','books.author_id','authors.id')
                            .innerJoin('genres','books.genre_id','genres.id')
                            .select('books.title','books.description','books.published_date','authors.name as author', 'genres.name as genre')
                            .whereILike('books.title',`%${title}%`)
                            .whereILike('authors.name',`%${author}%`)
                            .modify(function(queryBuilder) {
                                if (publishedDateFrom && publishedDateTo) {
                                    queryBuilder.whereBetween('published_date', [publishedDateFrom,publishedDateTo]);
                                }
                                if(genre){
                                    queryBuilder.whereILike('genres.name',`%${genre}%`);
                                }
                            }) 
                            .orderBy([
                                { column: 'books.title'}, 
                                { column: 'authors.name'},
                                { column: 'books.published_date', nulls:'last'}
                              ])
                            .paginate({perPage: pageLimit, currentPage: pageNumber})  
                           
                            
        return books;
}