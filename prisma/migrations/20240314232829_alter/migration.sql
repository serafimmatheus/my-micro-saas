/*
  Warnings:

  - You are about to drop the column `slug` on the `todos` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "todos_slug_key";

-- AlterTable
ALTER TABLE "todos" DROP COLUMN "slug";
