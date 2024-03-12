import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

export default defineSchema({
	files: defineTable(
		// your file schema
		{ name: v.string(), org_id: v.optional(v.string()), filetype: v.string(), created_by: v.string() },
	)
		.index('by_orgId', ['org_id'])
		.index('by_user', ['created_by']),
})
