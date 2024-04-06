// create web server
// create a route for comments
// read the comments from a file
// serve the comments to the client
// create a route to post comments
// read the comments from the file
// append the new comment
// save the comments to the file
// serve the comments to the client

const express = require('express');
const fs = require('fs');

const app = express();
app.use(express.json());

app.get('/comments', (req, res) => {
  fs.readFile('./comments.json', 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Internal Server Error');
      return;
    }
    res.send(data);
  });
});

app.post('/comments', (req, res) => {
  fs.readFile('./comments.json', 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Internal Server Error');
      return;
    }
    const comments = JSON.parse(data);
    comments.push(req.body.comment);
    fs.writeFile('./comments.json', JSON.stringify(comments), (err) => {
      if (err) {
        res.status(500).send('Internal Server Error');
        return;
      }
      res.send('Comment added');
    });
  });
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});

// Path: comments.json
// []

// Path: comments.json
// ["A comment"]

// Path: comments.json
// ["A comment", "Another comment"]

// Path: comments.json
// ["A comment", "Another comment", "A third comment"]

// Path: comments.json
// ["A comment", "Another comment", "A third comment", "A fourth comment"]