-- DropForeignKey
ALTER TABLE "ProjectLike" DROP CONSTRAINT "ProjectLike_projectId_fkey";

-- DropForeignKey
ALTER TABLE "ProjectLike" DROP CONSTRAINT "ProjectLike_userId_fkey";

-- AddForeignKey
ALTER TABLE "ProjectLike" ADD CONSTRAINT "ProjectLike_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectLike" ADD CONSTRAINT "ProjectLike_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
