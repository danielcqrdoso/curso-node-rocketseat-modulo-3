-- DropForeignKey
ALTER TABLE "pets" DROP CONSTRAINT "pets_userId_fkey";

-- AlterTable
ALTER TABLE "pets" ALTER COLUMN "userId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
