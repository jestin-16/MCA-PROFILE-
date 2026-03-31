import { mutationGeneric as mutation, queryGeneric as query } from "convex/server";
import { v } from "convex/values";

export const login = mutation({
  args: {
    username: v.string(),
    password: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_username", (q) => q.eq("username", args.username))
      .first();

    if (!user) {
      throw new Error("User not found");
    }

    if (user.password !== args.password) {
      throw new Error("Invalid password");
    }

    return user;
  },
});

export const register = mutation({
  args: {
    username: v.string(),
    password: v.string(),
    role: v.union(v.literal("admin"), v.literal("user")),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("users")
      .withIndex("by_username", (q) => q.eq("username", args.username))
      .first();

    if (existing) {
      throw new Error("Username already taken");
    }

    const userId = await ctx.db.insert("users", {
      username: args.username,
      password: args.password,
      role: args.role,
    });

    return await ctx.db.get(userId);
  },
});

export const getUser = query({
  args: {
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.userId);
  },
});
