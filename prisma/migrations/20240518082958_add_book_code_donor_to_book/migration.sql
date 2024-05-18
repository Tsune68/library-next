/*
  Warnings:

  - Added the required column `bookCode` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `donor` to the `Book` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Book" ADD COLUMN     "bookCode" TEXT NOT NULL,
ADD COLUMN     "donor" TEXT NOT NULL;
