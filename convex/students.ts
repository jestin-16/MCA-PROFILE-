import { queryGeneric as query, mutationGeneric as mutation } from "convex/server";
import { v } from "convex/values";

export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});

export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("students").collect();
  },
});

export const add = mutation({
  args: {
    name: v.string(),
    image: v.optional(v.string()),
    storageId: v.optional(v.id("_storage")),
    github: v.optional(v.string()),
    linkedin: v.optional(v.string()),
    twitter: v.optional(v.string()),
    techStack: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    let imageUrl = args.image || "";
    if (args.storageId) {
      imageUrl = (await ctx.storage.getUrl(args.storageId)) ?? imageUrl;
    }
    return await ctx.db.insert("students", {
      name: args.name,
      image: imageUrl,
      github: args.github,
      linkedin: args.linkedin,
      twitter: args.twitter,
      techStack: args.techStack,
    });
  },
});

export const edit = mutation({
  args: {
    id: v.id("students"),
    name: v.string(),
    image: v.optional(v.string()),
    storageId: v.optional(v.id("_storage")),
    github: v.optional(v.string()),
    linkedin: v.optional(v.string()),
    twitter: v.optional(v.string()),
    techStack: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    const updates: any = {
      name: args.name,
      github: args.github,
      linkedin: args.linkedin,
      twitter: args.twitter,
      techStack: args.techStack,
    };
    if (args.storageId) {
      updates.image = (await ctx.storage.getUrl(args.storageId)) ?? args.image;
    } else if (args.image !== undefined) {
      updates.image = args.image;
    }
    await ctx.db.patch(args.id, updates);
  },
});

export const updateImage = mutation({
  args: {
    id: v.id("students"),
    storageId: v.id("_storage"),
  },
  handler: async (ctx, args) => {
    const imageUrl = await ctx.storage.getUrl(args.storageId);
    if (imageUrl) {
      await ctx.db.patch(args.id, { image: imageUrl });
    }
  },
});
