// var pg = require('pg');
// var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/todo';

// var client = new pg.Client(connectionString);
// client.connect();
// var query = client.query('CREATE TABLE items(id SERIAL PRIMARY KEY, text VARCHAR(40) not null, complete BOOLEAN)');
// query.on('end', function() { client.end(); });

var bookshelf = require('bookshelf')(knex);

var User = bookshelf.Model.extend({
  tableName: 'users',
  messages: function() {
    return this.hasMany(Posts);
  }
});

var Posts = bookshelf.Model.extend({
  tableName: 'messages',
  tags: function() {
    return this.belongsToMany(Tag);
  }
});

var Tag = bookshelf.Model.extend({
  tableName: 'tags'
});

User.where('id', 1).fetch({withRelated: ['posts.tags']}).then(function(user) {

  console.log(user.related('posts').toJSON());

}).catch(function(err) {

  console.error(err);

});
