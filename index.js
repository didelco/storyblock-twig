'use strict';

const express = require('express');
const url = require('url');
const app = express();
const StoryblokClient = require('storyblok-node-client');
let Storyblok = new StoryblokClient({
  privateToken: 'xS2f2eSzW5k3pEvIdL8sAAtt'
});

app.get('/*', function(req, res) {
  var path = url.parse(req.url).pathname;
  path = path == '/' ? 'home' : path;

  Storyblok
    .get(`stories/${path}`, {
      version: req.query._storyblok ? 'draft': 'published'
    })
    .then((response) => {
      res.render('index', {
        story: response.body.story
      });
    })
    .catch((error) => {
      res.send(error);
    });
});

app.use('/public', express.static('public'));

// Define your favorite template engine here

app.set('view engine', '.twig');
app.set('views', 'views')

app.listen(3333, function() {
  console.log('Listening http://localhost:3333');
});
