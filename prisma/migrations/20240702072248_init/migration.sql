/*
  Warnings:

  - The primary key for the `ProjectLike` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "ProjectLike" DROP CONSTRAINT "ProjectLike_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "ProjectLike_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "ProjectLike_id_seq";
