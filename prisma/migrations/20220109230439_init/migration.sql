/*
  Warnings:

  - Added the required column `type` to the `Player` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN "countryCode" TEXT;

-- CreateTable
CREATE TABLE "TransferPlayer" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "price" INTEGER NOT NULL,
    "publishedOn" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "trenasferedOn" DATETIME,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "playerId" INTEGER NOT NULL,
    CONSTRAINT "TransferPlayer_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Player" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "countryCode" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "value" INTEGER NOT NULL,
    "teamId" INTEGER NOT NULL,
    CONSTRAINT "Player_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Player" ("age", "countryCode", "firstName", "id", "lastName", "teamId", "value") SELECT "age", "countryCode", "firstName", "id", "lastName", "teamId", "value" FROM "Player";
DROP TABLE "Player";
ALTER TABLE "new_Player" RENAME TO "Player";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
