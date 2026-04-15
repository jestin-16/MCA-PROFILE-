import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("memories").order("desc").collect();
  },
});

export const add = mutation({
  args: {
    url: v.string(),
    caption: v.string(),
    type: v.union(v.literal("image"), v.literal("video")),
  },
  handler: async (ctx, args) => {
    // In a real app, we'd verify the user is an admin here using ctx.auth
    // For this simple example, we'll rely on the client-side UI check
    await ctx.db.insert("memories", {
      url: args.url,
      caption: args.caption,
      type: args.type,
    });
  },
});
