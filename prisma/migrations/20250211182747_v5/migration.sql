/*
  Warnings:

  - Added the required column `name` to the `MealWeek` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_MealWeek" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "MealWeek_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_MealWeek" ("endDate", "id", "startDate", "userId") SELECT "endDate", "id", "startDate", "userId" FROM "MealWeek";
DROP TABLE "MealWeek";
ALTER TABLE "new_MealWeek" RENAME TO "MealWeek";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
