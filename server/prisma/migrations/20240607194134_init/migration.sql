-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('REGULAR', 'SUPER');

-- CreateEnum
CREATE TYPE "CategoryType" AS ENUM ('SCHULE', 'JUGENDBERUFSHILFE', 'KINDERTAGESEINRICHTUNGEN', 'SCHULSOZIALARBEIT');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNo" TEXT NOT NULL,
    "userType" "UserType" NOT NULL DEFAULT 'REGULAR',
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Address" (
    "id" SERIAL NOT NULL,
    "street" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "zipCode" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FavouriteFacility" (
    "id" SERIAL NOT NULL,
    "objectID" INTEGER NOT NULL,
    "category" "CategoryType" NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "FavouriteFacility_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Jugendberufshilfe" (
    "OBJECTID" SERIAL NOT NULL,
    "Jugendberufshilfe_ID" INTEGER NOT NULL,
    "TRAEGER" TEXT NOT NULL,
    "LEISTUNGEN" TEXT NOT NULL,
    "BEZEICHNUNG" TEXT,
    "KURZBEZEICHNUNG" TEXT,
    "STRASSE" TEXT NOT NULL,
    "PLZ" TEXT NOT NULL,
    "ORT" TEXT NOT NULL,
    "TELEFON" TEXT NOT NULL,
    "EMAIL" TEXT,
    "FAX" TEXT,
    "x" DOUBLE PRECISION NOT NULL,
    "y" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Jugendberufshilfe_pkey" PRIMARY KEY ("OBJECTID")
);

-- CreateTable
CREATE TABLE "Schule" (
    "OBJECTID" SERIAL NOT NULL,
    "Schule_ID" INTEGER NOT NULL,
    "TYP" INTEGER NOT NULL,
    "ART" TEXT NOT NULL,
    "STANDORTTYP" TEXT,
    "BEZEICHNUNG" TEXT NOT NULL,
    "BEZEICHNUNGZUSATZ" TEXT,
    "KURZBEZEICHNUNG" TEXT NOT NULL,
    "STRASSE" TEXT NOT NULL,
    "PLZ" TEXT NOT NULL,
    "ORT" TEXT NOT NULL,
    "TELEFON" TEXT NOT NULL,
    "FAX" TEXT,
    "EMAIL" TEXT,
    "PROFILE" TEXT,
    "SPRACHEN" TEXT,
    "WWW" TEXT,
    "TRAEGER" TEXT NOT NULL,
    "TRAEGERTYP" INTEGER NOT NULL,
    "BEZUGNR" TEXT,
    "GEBIETSARTNUMMER" INTEGER NOT NULL,
    "SNUMMER" INTEGER NOT NULL,
    "NUMMER" INTEGER NOT NULL,
    "GlobalID" TEXT NOT NULL,
    "Creator" TEXT NOT NULL,
    "Editor" TEXT NOT NULL,
    "x" DOUBLE PRECISION NOT NULL,
    "y" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Schule_pkey" PRIMARY KEY ("OBJECTID")
);

-- CreateTable
CREATE TABLE "Kindertageseinrichtungen" (
    "OBJECTID" SERIAL NOT NULL,
    "Kindertageseinrichtungen_ID" INTEGER NOT NULL,
    "TRAEGER" TEXT NOT NULL,
    "BEZEICHNUNG" TEXT NOT NULL,
    "KURZBEZEICHNUNG" TEXT NOT NULL,
    "STRASSE" TEXT NOT NULL,
    "STRSCHL" TEXT NOT NULL,
    "HAUSBEZ" TEXT NOT NULL,
    "PLZ" TEXT NOT NULL,
    "ORT" TEXT NOT NULL,
    "HORT" INTEGER NOT NULL,
    "KITA" INTEGER NOT NULL,
    "URL" TEXT,
    "TELEFON" TEXT NOT NULL,
    "FAX" TEXT,
    "EMAIL" TEXT,
    "BARRIEREFREI" INTEGER NOT NULL,
    "INTEGRATIV" INTEGER NOT NULL,
    "x" DOUBLE PRECISION NOT NULL,
    "y" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Kindertageseinrichtungen_pkey" PRIMARY KEY ("OBJECTID")
);

-- CreateTable
CREATE TABLE "Schulsozialarbeit" (
    "OBJECTID" SERIAL NOT NULL,
    "Schulsozialarbeit_ID" INTEGER NOT NULL,
    "TRAEGER" TEXT NOT NULL,
    "LEISTUNGEN" TEXT,
    "BEZEICHNUNG" TEXT,
    "KURZBEZEICHNUNG" TEXT,
    "STRASSE" TEXT NOT NULL,
    "PLZ" TEXT NOT NULL,
    "ORT" TEXT NOT NULL,
    "TELEFON" TEXT,
    "EMAIL" TEXT,
    "FAX" TEXT,
    "x" DOUBLE PRECISION NOT NULL,
    "y" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Schulsozialarbeit_pkey" PRIMARY KEY ("OBJECTID")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_phoneNo_key" ON "User"("phoneNo");

-- CreateIndex
CREATE UNIQUE INDEX "Jugendberufshilfe_Jugendberufshilfe_ID_key" ON "Jugendberufshilfe"("Jugendberufshilfe_ID");

-- CreateIndex
CREATE UNIQUE INDEX "Jugendberufshilfe_ID" ON "Jugendberufshilfe"("Jugendberufshilfe_ID");

-- CreateIndex
CREATE UNIQUE INDEX "Schule_Schule_ID_key" ON "Schule"("Schule_ID");

-- CreateIndex
CREATE UNIQUE INDEX "Schule_ID" ON "Schule"("Schule_ID");

-- CreateIndex
CREATE UNIQUE INDEX "Kindertageseinrichtungen_Kindertageseinrichtungen_ID_key" ON "Kindertageseinrichtungen"("Kindertageseinrichtungen_ID");

-- CreateIndex
CREATE UNIQUE INDEX "Kindertageseinrichtungen_ID" ON "Kindertageseinrichtungen"("Kindertageseinrichtungen_ID");

-- CreateIndex
CREATE UNIQUE INDEX "Schulsozialarbeit_Schulsozialarbeit_ID_key" ON "Schulsozialarbeit"("Schulsozialarbeit_ID");

-- CreateIndex
CREATE UNIQUE INDEX "Schulsozialarbeit_ID" ON "Schulsozialarbeit"("Schulsozialarbeit_ID");

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavouriteFacility" ADD CONSTRAINT "FavouriteFacility_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
