/*
  Warnings:

  - You are about to drop the column `websiteLink` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "websiteLink",
ADD COLUMN     "links" TEXT[];
