/*
  Warnings:

  - You are about to drop the column `functionName` on the `Problem` table. All the data in the column will be lost.
  - You are about to drop the column `errorInfo` on the `Submission` table. All the data in the column will be lost.
  - You are about to drop the column `passed` on the `Submission` table. All the data in the column will be lost.
  - You are about to drop the column `total` on the `Submission` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[slug]` on the table `LearnTopic` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "LearnCategory" DROP CONSTRAINT "LearnCategory_domainId_fkey";

-- DropForeignKey
ALTER TABLE "LearnTopic" DROP CONSTRAINT "LearnTopic_categoryId_fkey";

-- DropIndex
DROP INDEX "LearnTopic_categoryId_slug_key";

-- AlterTable
ALTER TABLE "LearnCategory" ALTER COLUMN "order" DROP DEFAULT;

-- AlterTable
ALTER TABLE "LearnDomain" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "LearnTopic" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "order" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Problem" DROP COLUMN "functionName";

-- AlterTable
ALTER TABLE "Submission" DROP COLUMN "errorInfo",
DROP COLUMN "passed",
DROP COLUMN "total";

-- CreateIndex
CREATE INDEX "LearnCategory_domainId_idx" ON "LearnCategory"("domainId");

-- CreateIndex
CREATE UNIQUE INDEX "LearnTopic_slug_key" ON "LearnTopic"("slug");

-- CreateIndex
CREATE INDEX "LearnTopic_categoryId_idx" ON "LearnTopic"("categoryId");

-- AddForeignKey
ALTER TABLE "LearnCategory" ADD CONSTRAINT "LearnCategory_domainId_fkey" FOREIGN KEY ("domainId") REFERENCES "LearnDomain"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LearnTopic" ADD CONSTRAINT "LearnTopic_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "LearnCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;
