import { v } from 'convex/values'
import { mutation, query } from './_generated/server'

export const createFile = mutation({
	args: {
		name: v.string(),
		org_id: v.optional(v.string()),
		filetype: v.string(),
		created_by: v.string(),
		storageId: v.id('_storage'),
	},
	async handler(ctx, args) {
		await ctx.db.insert('files', {
			name: args.name,
			org_id: args.org_id,
			filetype: args.filetype,
			created_by: args.created_by,
			storageId: args.storageId,
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
		stroageId: v.id('_storage'),
	},
	async handler(ctx, args) {
		await ctx.db.delete(args.id)
		await ctx.storage.delete(args.stroageId)
	},
})

export const getFiles = query({
	args: {
		org_id: v.string(),
	},
	async handler(ctx, args) {
		return await ctx.db
			.query('files')
			.withIndex('by_orgId', p => p.eq('org_id', args.org_id))
			.collect()
	},
})

export const generateUploadUrl = mutation(async ctx => {
	return await ctx.storage.generateUploadUrl()
})
