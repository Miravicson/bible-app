import { defaultBibleBooks, users } from "@/db/schema";

export type User = typeof users.$inferSelect;

export type DefaultBibleBook = typeof defaultBibleBooks.$inferSelect;