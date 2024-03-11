import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

export default defineSchema({
	files: defineTable(
		// your file schema
		{ name: v.string(), age: v.number() },
	),
})
