/*
  Warnings:

  - Changed the type of `objectID` on the `FavouriteCategory` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `category` on the `FavouriteCategory` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "CategoryType" AS ENUM ('SCHULE', 'JUGENDBERUFSHILFE', 'KINDERTAGESEINRICHTUNGEN', 'SCHULSOZIALARBEIT');

-- AlterTable
ALTER TABLE "FavouriteCategory" DROP COLUMN "objectID",
ADD COLUMN     "objectID" INTEGER NOT NULL,
DROP COLUMN "category",
ADD COLUMN     "category" "CategoryType" NOT NULL;
