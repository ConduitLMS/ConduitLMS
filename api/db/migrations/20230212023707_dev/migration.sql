-- AlterTable
ALTER TABLE "Assignment" ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "progress" SET DEFAULT 0,
ALTER COLUMN "userAnswers" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Module" ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "questionJson" DROP NOT NULL,
ALTER COLUMN "answerKey" DROP NOT NULL;
