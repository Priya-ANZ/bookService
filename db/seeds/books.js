/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex("books").del();
  await knex("books").insert([
    {
      id: 1,
      title: "Pride and Prejudice",
      description: "A novel of manners by Jane Austen",
      published_date: new Date('1987-08-12'),
      author_id: 1,
      genre_id: 1,
    },
    {
      id: 2,
      title: "The Old Man and the Sea",
      description: "A short novel by Ernest Hemingway",
      published_date: new Date('1986-03-14'),
      author_id: 2,
      genre_id: 3,
    },
    {
      id: 3,
      title: "Murder on the Orient Express",
      description: "A detective novel by Agatha Christie",
      published_date: new Date('1997-09-22'),
      author_id: 3,
      genre_id: 2,
    },
    {
      id: 4,
      title: "Emma",
      description: "A novel by Jane Austen",
      published_date: new Date('1991-04-23'),
      author_id: 1,
      genre_id: 1,
    },
    {
      id: 5,
      title: "The Sun Also Rises",
      description: "A novel by Ernest Hemingway",
      published_date: new Date('1999-10-11'),
      author_id: 2,
      genre_id: 1,
    },
    {
      id: 6,
      title: "Alchemist",
      description: "A novel by Paulo Cohelo",
      published_date: new Date('2000-10-11'),
      author_id: 4,
      genre_id: 3,
    },
  ]);
};
