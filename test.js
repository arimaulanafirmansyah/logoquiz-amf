const express = require('express');
const app = express();
const port = 1304;

app.use(express.json());

let books = [
  { id: 1, title: 'API BY AMFCODE', author: '@amfcode_' },
  { id: 2, title: 'Coming Soon', author: '@amfcode_' },
  { id: 3, title: 'PEPEK KUDA', author: '@amfcode_' },
];
let index = [
{
  status: true,
  message: 'Api By Amfcode',
  author: '@amfcode_'
}
];

app.get('/', (req, res) => {
  res.send(index);
});

app.get('/books', (req, res) => {
  res.send(books);
});

app.get('/books/:id', (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).send('The book with the given ID was not found.');
  res.send(book);
});

app.post('/books', (req, res) => {
  const book = {
    id: books.length + 1,
    title: req.body.title,
    author: req.body.author
  };
  books.push(book);
  res.send(book);
});

app.put('/books/:id', (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).send('The book with the given ID was not found.');

  book.title = req.body.title;
  book.author = req.body.author;
  res.send(book);
});

app.delete('/books/:id', (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).send('The book with the given ID was not found.');

  const index = books.indexOf(book);
  books.splice(index, 1);
  res.send(book);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
