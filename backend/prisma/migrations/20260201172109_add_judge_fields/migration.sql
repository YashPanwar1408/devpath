/*
  Warnings:

  - You are about to drop the column `solution` on the `Problem` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Problem" DROP COLUMN "solution",
ADD COLUMN     "functionName" TEXT;

-- AlterTable
ALTER TABLE "UserProgress" ADD COLUMN     "starred" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "Submission" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "problemId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "runtime" INTEGER,
    "memory" INTEGER,
    "passed" INTEGER,
    "total" INTEGER,
    "errorInfo" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Submission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LearnDomain" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "LearnDomain_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LearnCategory" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "domainId" TEXT NOT NULL,

    CONSTRAINT "LearnCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LearnTopic" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "categoryId" TEXT NOT NULL,

    CONSTRAINT "LearnTopic_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Submission_userId_idx" ON "Submission"("userId");

-- CreateIndex
CREATE INDEX "Submission_problemId_idx" ON "Submission"("problemId");

-- CreateIndex
CREATE UNIQUE INDEX "LearnDomain_slug_key" ON "LearnDomain"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "LearnTopic_categoryId_slug_key" ON "LearnTopic"("categoryId", "slug");

-- AddForeignKey
ALTER TABLE "Submission" ADD CONSTRAINT "Submission_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Submission" ADD CONSTRAINT "Submission_problemId_fkey" FOREIGN KEY ("problemId") REFERENCES "Problem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LearnCategory" ADD CONSTRAINT "LearnCategory_domainId_fkey" FOREIGN KEY ("domainId") REFERENCES "LearnDomain"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LearnTopic" ADD CONSTRAINT "LearnTopic_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "LearnCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
