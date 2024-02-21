/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('authors').del()
  await knex('authors').insert([
    {id: 1, name: 'Jane Austen'},
    {id: 2, name: 'Ernest Hemingway'},
    {id: 3, name: 'Agatha Christie'},
    {id: 4, name: 'Paulo Cohelo'},
  ]);
};
