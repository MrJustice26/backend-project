export default () => ({
  // TODO: Use it in app module later
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 5432,
  password: process.env.DB_PASSWORD,
  username: process.env.DB_USERNAME,
  database: process.env.DB_DATABASE,
});
