const config = require('./config')

var types = require('pg').types
// To get the PostgreSQL Object identifiers run the following query
// SELECT typname, oid, typarray FROM pg_type
const OID_NUMERIC = 1700;
types.setTypeParser(OID_NUMERIC, 'text', parseFloat)

module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: config.PGHOST,
      port: config.PGPORT,
      user: config.PGUSER,
      password: config.PGPASSWORD,
      database: config.PGDATABASE,
      ssl: config.PGSSL
    },
    pool: {
      max: config.PGMAXPOOLSIZE
    }
  },
  migrations: {
    client: 'pg',
    connection: {
      host: config.PGHOST,
      port: config.PGPORT,
      user: config.PGKNEXUSER,
      password: config.PGKNEXPASSWORD,
      database: config.PGDATABASE,
      ssl: config.PGSSL
    }
  }
}
