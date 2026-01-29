/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `DSALesson` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `DSALesson` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DSALesson" ADD COLUMN     "slug" TEXT NOT NULL,
ALTER COLUMN "codeExamples" DROP NOT NULL,
ALTER COLUMN "difficulty" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "DSALesson_slug_key" ON "DSALesson"("slug");
