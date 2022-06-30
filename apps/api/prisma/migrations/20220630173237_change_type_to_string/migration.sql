/*
  Warnings:

  - The `type` column on the `note` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "note" DROP COLUMN "type",
ADD COLUMN     "type" TEXT NOT NULL DEFAULT 'NORMAL_TEXT';

-- DropEnum
DROP TYPE "Type";

-- CreateIndex
CREATE INDEX "index_note_on_type" ON "note"("type");
