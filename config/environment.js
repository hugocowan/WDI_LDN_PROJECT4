const port = process.env.PORT || 4000;
const env = process.env.NODE_ENV || 'dev';
const dbURI = process.env.MONGODBURI || `mongodb://localhost/pcs-${env}`;
const secret = process.env.SECRET || 'vhfebzcv';

module.exports = {
  port,
  dbURI,
  secret,
  env
};
