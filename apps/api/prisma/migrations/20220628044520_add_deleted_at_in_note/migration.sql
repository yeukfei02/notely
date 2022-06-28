-- AlterTable
ALTER TABLE "note" ADD COLUMN     "deleted_at" TIMESTAMP(3);

-- CreateIndex
CREATE INDEX "index_note_on_deleted_at" ON "note"("deleted_at");
