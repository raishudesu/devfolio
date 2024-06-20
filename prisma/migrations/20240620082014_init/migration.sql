-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "tags" TEXT[] DEFAULT ARRAY[]::TEXT[];
