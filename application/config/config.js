module.exports = {
  db: {
    str: 'mongodb://127.0.0.1:27017/idtree',
    // str: process.env.idtree_MONGO_URL,
    options: {
      auto_reconnect: true,
      poolSize: 200,
      useNewUrlParser: true,
      readPreference: 'primaryPreferred',
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    },
  },
};
