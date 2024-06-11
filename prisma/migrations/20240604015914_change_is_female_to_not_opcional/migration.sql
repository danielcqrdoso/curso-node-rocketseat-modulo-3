/*
  Warnings:

  - Made the column `isFemale` on table `pets` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "pets" ALTER COLUMN "isFemale" SET NOT NULL;
