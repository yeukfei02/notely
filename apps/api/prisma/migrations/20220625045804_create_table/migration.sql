-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "folder" (
    "id" UUID NOT NULL,
    "name" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "users_id" UUID,

    CONSTRAINT "folder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "note" (
    "id" UUID NOT NULL,
    "content" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "users_id" UUID,
    "folder_id" UUID,

    CONSTRAINT "note_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "index_users_on_email" ON "users"("email");

-- CreateIndex
CREATE INDEX "index_users_on_password" ON "users"("password");

-- CreateIndex
CREATE INDEX "index_users_on_created_at" ON "users"("created_at");

-- CreateIndex
CREATE INDEX "index_users_on_updated_at" ON "users"("updated_at");

-- CreateIndex
CREATE UNIQUE INDEX "folder_name_key" ON "folder"("name");

-- CreateIndex
CREATE INDEX "index_folder_on_name" ON "folder"("name");

-- CreateIndex
CREATE INDEX "index_folder_on_users_id" ON "folder"("users_id");

-- CreateIndex
CREATE INDEX "index_folder_on_created_at" ON "folder"("created_at");

-- CreateIndex
CREATE INDEX "index_folder_on_updated_at" ON "folder"("updated_at");

-- CreateIndex
CREATE INDEX "index_note_on_content" ON "note"("content");

-- CreateIndex
CREATE INDEX "index_note_on_users_id" ON "note"("users_id");

-- CreateIndex
CREATE INDEX "index_note_on_folder_id" ON "note"("folder_id");

-- CreateIndex
CREATE INDEX "index_note_on_created_at" ON "note"("created_at");

-- CreateIndex
CREATE INDEX "index_note_on_updated_at" ON "note"("updated_at");

-- AddForeignKey
ALTER TABLE "folder" ADD CONSTRAINT "folder_users_id_fkey" FOREIGN KEY ("users_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "note" ADD CONSTRAINT "note_users_id_fkey" FOREIGN KEY ("users_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "note" ADD CONSTRAINT "note_folder_id_fkey" FOREIGN KEY ("folder_id") REFERENCES "folder"("id") ON DELETE SET NULL ON UPDATE CASCADE;
