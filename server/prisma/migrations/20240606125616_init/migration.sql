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
    "CreationDate" BIGINT NOT NULL,
    "Creator" TEXT NOT NULL,
    "EditDate" BIGINT NOT NULL,
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
