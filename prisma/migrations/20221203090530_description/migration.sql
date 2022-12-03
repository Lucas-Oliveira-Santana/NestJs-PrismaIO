/*
  Warnings:

  - You are about to drop the column `descriptons` on the `books` table. All the data in the column will be lost.
  - Added the required column `description` to the `books` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "books" DROP COLUMN "descriptons",
ADD COLUMN     "description" TEXT NOT NULL;
