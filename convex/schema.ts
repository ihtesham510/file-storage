import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

export default defineSchema({
	files: defineTable(
		// your file schmea
		{
			name: v.string(),
			filetype: v.string(),
			created_by: v.string(),
			storageId: v.id('_storage'),
			org_id: v.optional(v.string()),
		},
	)
		.index('by_orgId', ['org_id'])
		.index('by_user', ['created_by']),
})
