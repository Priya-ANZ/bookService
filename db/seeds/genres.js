/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex("genres").del();
  await knex("genres").insert([
    { id: 1, name: "Romance" },
    { id: 2, name: "Mystery" },
    { id: 3, name: "Thriller" },
    { id: 4, name: "Science Fiction" },])
};
