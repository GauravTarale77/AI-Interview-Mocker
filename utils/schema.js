import {
  pgTable,
  serial,
  varchar,
  text,
  jsonb,
  integer,
  timestamp,
  unique,
} from "drizzle-orm/pg-core";

export const MockInterview = pgTable(
  "mockInterview",
  {
    id: serial("id").primaryKey(),
    jsonMockResp: jsonb("jsonMockResp").notNull(),
    jobPosition: varchar("jobPosition", { length: 255 }).notNull(),
    jobDesc: text("jobDesc").notNull(),
    jobExperience: varchar("jobExperience", { length: 100 }).notNull(),
    createdBy: varchar("createdBy", { length: 255 }).notNull(),
    createdAt: timestamp("createdAt", { mode: "string" }).defaultNow(),
    mockId: varchar("mockId", { length: 64 }).notNull(),
  },
  (t) => ({
    mockIdUnique: unique("mockInterview_mockId_uniq").on(t.mockId),
  })
);

export const UserAnswer = pgTable("userAnswer", {
  id: serial("id").primaryKey(),
  mockIdRef: varchar("mockId", { length: 64 })
    .notNull()
    .references(() => MockInterview.mockId, { onDelete: "cascade" }),
  question: varchar("question", { length: 1024 }).notNull(),
  correctAns: text("correctAns"),
  userAns: text("userAns"),
  feedback: text("feedback"),
  rating: integer("rating"),
  userEmail: varchar("userEmail", { length: 255 }),
  createdAt: timestamp("createdAt", { mode: "string" }).defaultNow(),
});
