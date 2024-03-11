import { v } from 'convex/values'
import { mutation, query } from './_generated/server'
export const createFile = mutation({
	args: {
		name: v.string(),
		age: v.number(),
	},
	async handler(ctx, args) {
		await ctx.db.insert('files', {
			name: args.name,
			age: args.age,
		})
	},
})
export const updateFile = mutation({
	args: {
		name: v.string(),
		age: v.number(),
	},
	async handler(ctx, args) {
		await ctx.db.insert('files', {
			name: args.name,
			age: args.age,
		})
	},
})

export const getFiles = query({
	args: {},
	async handler(ctx, args) {
		return ctx.db.query('files').collect()
	},
})
