/*
  Warnings:

  - Made the column `place` on table `Book` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Book" ALTER COLUMN "place" SET NOT NULL,
ALTER COLUMN "place" SET DEFAULT '自宅';
