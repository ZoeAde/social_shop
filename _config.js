// var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/todo';

var ids = {
  instagram: {
    clientID: '4b5e5237d7c145e9a463f5624426f2fb',
    clientSecret: 'd32a00948bcb48c08f8c565f062dc6b2',
    callbackURL: "http://127.0.0.1:3000/auth/instagram/callback"
  }
};


// module.exports = connectionString;
module.exports = ids;
