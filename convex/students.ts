import { queryGeneric as query, mutationGeneric as mutation } from "convex/server";
import { v } from "convex/values";

export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("students").collect();
  },
});

export const add = mutation({
  args: {
    name: v.string(),
    image: v.string(),
    github: v.optional(v.string()),
    linkedin: v.optional(v.string()),
    twitter: v.optional(v.string()),
    techStack: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("students", {
      name: args.name,
      image: args.image,
      github: args.github,
      linkedin: args.linkedin,
      twitter: args.twitter,
      techStack: args.techStack,
    });
  },
});
