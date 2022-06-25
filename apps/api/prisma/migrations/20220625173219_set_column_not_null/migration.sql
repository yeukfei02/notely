/*
  Warnings:

  - Made the column `name` on table `folder` required. This step will fail if there are existing NULL values in that column.
  - Made the column `content` on table `note` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "folder" ALTER COLUMN "name" SET NOT NULL;

-- AlterTable
ALTER TABLE "note" ALTER COLUMN "content" SET NOT NULL;
