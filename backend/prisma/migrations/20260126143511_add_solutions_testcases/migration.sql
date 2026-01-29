/*
  Warnings:

  - You are about to drop the column `sheet` on the `Problem` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "DSATopic" ADD COLUMN     "category" TEXT,
ADD COLUMN     "targetCount" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Problem" DROP COLUMN "sheet",
ADD COLUMN     "sheets" TEXT[],
ADD COLUMN     "solutions" JSONB,
ADD COLUMN     "testCases" JSONB;
