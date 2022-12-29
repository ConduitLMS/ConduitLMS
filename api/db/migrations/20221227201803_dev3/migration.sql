-- CreateTable
CREATE TABLE "ModuleDocumentAgreement" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "attachments" TEXT[],
    "confirm" BOOLEAN NOT NULL,

    CONSTRAINT "ModuleDocumentAgreement_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ModuleDocumentAgreement_name_key" ON "ModuleDocumentAgreement"("name");
