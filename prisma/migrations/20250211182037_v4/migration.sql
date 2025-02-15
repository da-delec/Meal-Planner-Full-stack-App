-- CreateTable
CREATE TABLE "MealWeek" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "MealWeek_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "MealDay" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "dayOfWeek" TEXT NOT NULL,
    "breakfast" TEXT,
    "lunch" TEXT,
    "dinner" TEXT,
    "mealWeekId" TEXT NOT NULL,
    CONSTRAINT "MealDay_mealWeekId_fkey" FOREIGN KEY ("mealWeekId") REFERENCES "MealWeek" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
