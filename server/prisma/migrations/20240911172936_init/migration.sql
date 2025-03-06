/*
  Warnings:

  - You are about to drop the column `timeStamp` on the `Expenses` table. All the data in the column will be lost.
  - You are about to drop the column `timeStamp` on the `Purchases` table. All the data in the column will be lost.
  - You are about to drop the column `timeStamp` on the `Sales` table. All the data in the column will be lost.
  - Added the required column `timestamp` to the `Expenses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timestamp` to the `Purchases` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timestamp` to the `Sales` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Expenses" DROP COLUMN "timeStamp",
ADD COLUMN     "timestamp" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Purchases" DROP COLUMN "timeStamp",
ADD COLUMN     "timestamp" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Sales" DROP COLUMN "timeStamp",
ADD COLUMN     "timestamp" TIMESTAMP(3) NOT NULL;
