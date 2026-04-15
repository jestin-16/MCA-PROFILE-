import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  students: defineTable({
    name: v.string(),
    image: v.string(),
    github: v.optional(v.string()),
    linkedin: v.optional(v.string()),
    twitter: v.optional(v.string()),
    techStack: v.array(v.string()),
  }),
  users: defineTable({
    username: v.string(),
    password: v.string(),
    role: v.union(v.literal("admin"), v.literal("user")),
  }).index("by_username", ["username"]),
  memories: defineTable({
    url: v.string(),
    caption: v.string(),
    type: v.union(v.literal("image"), v.literal("video")),
  }),
});
