import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const CreateWorkplace = mutation({
  args: {
    messages: v.any(),
    user: v.id("users"),
  },
  handler: async (ctx, args) => {
    const workplaceId = await ctx.db.insert("workplace", {
      messages: args.messages,
      user: args.user,
    });
    return workplaceId;
  },
});

export const GetWorkplace = query({
  args: {
    workplaceId: v.id("workplace"),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db.get(args.workplaceId);
    return result;
  },
});

export const UpdateMessages = mutation({
  args: {
    workplaceId: v.id("workplace"),
    messages: v.any(),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db.patch(args.workplaceId, {
      messages: args.messages,
    });
    return result;
  },
});

export const UpdateFiles = mutation({
  args: {
    workplaceId: v.id("workplace"),
    files: v.any(),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db.patch(args.workplaceId, {
      fileData: args.files,
    });
    return result;
  },
});

export const GetAllWorkplace = query({
  args: {
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db
      .query("workplace")
      .filter((q) => q.eq(q.field("user"), args.userId))
      .collect();
    return result;
  },
});
