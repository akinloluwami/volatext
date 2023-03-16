/*
  Warnings:

  - You are about to drop the column `expiry_time` on the `Text` table. All the data in the column will be lost.
  - Added the required column `expiry` to the `Text` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Text" DROP COLUMN "expiry_time",
ADD COLUMN     "expiry" TIMESTAMP(3) NOT NULL;
