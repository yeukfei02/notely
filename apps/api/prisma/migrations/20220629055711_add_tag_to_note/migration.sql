-- AlterTable
ALTER TABLE "note" ADD COLUMN     "tag" TEXT NOT NULL DEFAULT E'',
ALTER COLUMN "content" SET DEFAULT E'';

-- CreateIndex
CREATE INDEX "index_note_on_tag" ON "note"("tag");
