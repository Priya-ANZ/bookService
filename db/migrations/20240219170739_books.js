/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("books", (table) => {
        table.increments("id").primary();
        table.string("title").notNullable();
        table.string("description"),
        table.date("published_date"),
        table.integer('author_id').unsigned().notNullable();
        table.integer('genre_id').unsigned().notNullable();
        table.foreign('author_id').references('authors.id');
        table.foreign('genre_id').references('genres.id');
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists("books");
};
