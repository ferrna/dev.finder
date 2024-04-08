/*
Before
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema'

const queryClient = postgres(process.env.DATABASE_URL!)
const db = drizzle(queryClient, { schema })
export { db } 
when dealing with a postgreSQL/MySQL database there's usually a limit
of how many open connections you could have,
but in nextjs when you save and restart the server it reopens a brand
new connection, so you could ran into using all connections and getting
an error that basically can be resolved by killing the server and restarting
it but a better approach is to use a global variable to store the connection.
The above error is dev-only and not a problem in production though.
*/

import { drizzle } from 'drizzle-orm/postgres-js'
import * as schema from './schema'
import postgres from 'postgres'
import type { PostgresJsDatabase } from 'drizzle-orm/postgres-js'

declare global {
  var db: PostgresJsDatabase<typeof schema> | undefined
}
let db: PostgresJsDatabase<typeof schema>

if (process.env.NODE_ENV === 'production') {
  db = drizzle(postgres(process.env.DATABASE_URL!), { schema })
} else {
  if (!global.db) {
    global.db = drizzle(postgres(process.env.DATABASE_URL!), { schema })
  }
  db = global.db
}

export { db }
