
import { integer, pgTable, text, uuid, varchar } from "drizzle-orm/pg-core";


export const users = pgTable("users", {
    id : uuid("id").notNull().primaryKey().defaultRandom().unique(),
    name : varchar("name", {length : 255}).notNull(),
    email : text("email").notNull().unique(),
    picture : text("picture").notNull(),
    credits :  integer("credits").notNull().default(100),
})