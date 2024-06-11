/*
  Warnings:

  - Added the required column `cep` to the `pets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `pets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `neighborhood` to the `pets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `pets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `street` to the `pets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pets" ADD COLUMN     "cep" TEXT NOT NULL,
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "neighborhood" TEXT NOT NULL,
ADD COLUMN     "state" TEXT NOT NULL,
ADD COLUMN     "street" TEXT NOT NULL;
