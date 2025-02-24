/*
  Warnings:

  - The values [TAKEWAY] on the enum `consumptionMethod` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "consumptionMethod_new" AS ENUM ('TAKEAWAY', 'DINE_IN');
ALTER TABLE "Order" ALTER COLUMN "consumptionMethod" TYPE "consumptionMethod_new" USING ("consumptionMethod"::text::"consumptionMethod_new");
ALTER TYPE "consumptionMethod" RENAME TO "consumptionMethod_old";
ALTER TYPE "consumptionMethod_new" RENAME TO "consumptionMethod";
DROP TYPE "consumptionMethod_old";
COMMIT;
