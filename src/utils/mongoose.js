import {connect, connection} from 'mongoose'

const conn = {
  isConnected: false,
}

export default async function dbConnect() {
  if (conn.isConnected) return

  const db = await connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  conn.isConnected = db.connections[0].readyState
  console.log('Is Mongo Connected? -', conn.isConnected)
  console.log('In which database? -', db.connection.db.databaseName)
}

connection.on('connected', () => {
  console.log('mogo db is connected')
})

connection.on('error', (err) => {
  console.log('mogo db error=>', err)
})
