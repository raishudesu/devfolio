-- CreateTable
CREATE TABLE "GeminiConversation" (
    "id" TEXT NOT NULL,
    "content" JSONB NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GeminiConversation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "GeminiConversation" ADD CONSTRAINT "GeminiConversation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
