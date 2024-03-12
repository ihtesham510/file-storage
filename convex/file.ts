import { v } from 'convex/values'
import { mutation, query } from './_generated/server'

export const createFile = mutation({
	args: {
		name: v.string(),
		org_id: v.string(),
		filetype: v.string(),
		created_by: v.string(),
	},
	async handler(ctx, args) {
		await ctx.db.insert('files', {
			name: args.name,
			org_id: args.org_id,
			filetype: args.filetype,
			created_by: args.created_by,
		})
	},
})

export const renameFile = mutation({
	args: {
		user_id: v.id('files'),
		name: v.string(),
	},
	async handler(ctx, args) {
		await ctx.db.patch(args.user_id, {
			name: args.name,
		})
	},
})

export const deleteFile = mutation({
	args: {
		id: v.id('files'),
	},
	async handler(ctx, args) {
		await ctx.db.delete(args.id)
	},
})

export const getFiles = query({
	args: {
		org_id: v.string(),
	},
	async handler(ctx, args) {
		return ctx.db
			.query('files')
			.withIndex('by_orgId', p => p.eq('org_id', args.org_id))
			.collect()
	},
})
