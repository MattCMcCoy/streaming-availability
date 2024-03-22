/*
  Warnings:

  - You are about to drop the `Like` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Like";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Star" (
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "mid" INTEGER NOT NULL,
    "staredById" TEXT NOT NULL,

    PRIMARY KEY ("staredById", "mid"),
    CONSTRAINT "Star_staredById_fkey" FOREIGN KEY ("staredById") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "Star_staredById_idx" ON "Star"("staredById");
