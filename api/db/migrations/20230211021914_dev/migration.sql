/*
  Warnings:

  - You are about to drop the `ModuleDocumentAgreement` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ModuleType` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userAnswers` to the `Assignment` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ModuleTypes" AS ENUM ('DOCUMENTAPPROVAL', 'QUIZ');

-- AlterTable
ALTER TABLE "Assignment" ADD COLUMN     "userAnswers" JSONB NOT NULL,
ALTER COLUMN "progress" DROP DEFAULT;

-- DropTable
DROP TABLE "ModuleDocumentAgreement";

-- DropTable
DROP TABLE "ModuleType";

-- CreateTable
CREATE TABLE "Module" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "moduleType" "ModuleTypes" NOT NULL,
    "questionJson" JSONB NOT NULL,
    "answerKey" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Module_pkey" PRIMARY KEY ("id")
);
