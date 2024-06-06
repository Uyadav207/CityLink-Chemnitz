/*
  Warnings:

  - You are about to drop the `FavouriteCategory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "FavouriteCategory" DROP CONSTRAINT "FavouriteCategory_userId_fkey";

-- DropTable
DROP TABLE "FavouriteCategory";

-- CreateTable
CREATE TABLE "FavouriteFacility" (
    "id" SERIAL NOT NULL,
    "objectID" INTEGER NOT NULL,
    "category" "CategoryType" NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "FavouriteFacility_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "FavouriteFacility" ADD CONSTRAINT "FavouriteFacility_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
