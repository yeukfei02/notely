-- CreateEnum
CREATE TYPE "Type" AS ENUM ('NORMAL_TEXT', 'MARKDOWN');

-- AlterTable
ALTER TABLE "note" ADD COLUMN     "type" "Type" NOT NULL DEFAULT 'NORMAL_TEXT';

-- CreateIndex
CREATE INDEX "index_note_on_type" ON "note"("type");
