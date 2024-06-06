const axios = require('axios');
const { PrismaClient } = require('@prisma/client');
const cron = require('node-cron');

const prisma = new PrismaClient();

// Configuration: List of API URLs
const API_URLS = [
  {
    url: 'https://services6.arcgis.com/jiszdsDupTUO3fSM/arcgis/rest/services/Jugendberufshilfen_FL_1/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json',
    schema: 'Jugendberufshilfe',
  },
  {
    url: 'https://services6.arcgis.com/jiszdsDupTUO3fSM/arcgis/rest/services/Schulen_OpenData/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json',
    schema: 'Schule',
  },
  {
    url: 'https://services6.arcgis.com/jiszdsDupTUO3fSM/arcgis/rest/services/Kindertageseinrichtungen_Sicht/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json',
    schema: 'Kindertageseinrichtungen',
  },
  {
    url: 'https://services6.arcgis.com/jiszdsDupTUO3fSM/arcgis/rest/services/Schulsozialarbeit_FL_1/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json',
    schema: 'Schulsozialarbeit',
  },
];

// Function to fetch data from a single API
async function fetchFromApi(apiConfig) {
  try {
    const response = await axios.get(apiConfig.url);
    return { data: response.data.features, schema: apiConfig.schema }; // Access the features array
  } catch (error) {
    console.error(`Error fetching data from ${apiConfig.url}:`, error);
    throw error;
  }
}

// Function to fetch data from all APIs
async function fetchData() {
  try {
    const allData = await Promise.all(API_URLS.map(fetchFromApi));
    // console.log(allData);
    return allData; // Return data along with schema info
  } catch (error) {
    console.error('Error fetching data from APIs:', error);
    throw error;
  }
}

// Function to update the database with new or changed data
async function updateDatabase(data, schema) {
  const upserts = data.map((item) => {
    const attributes = item.attributes;
    const geometry = item.geometry;
    if (schema === 'Jugendberufshilfe') {
      return prisma[schema].upsert({
        where: { Jugendberufshilfe_ID: attributes.ID },
        update: {
          TRAEGER: attributes.TRAEGER,
          LEISTUNGEN: attributes.LEISTUNGEN,
          BEZEICHNUNG: attributes.BEZEICHNUNG,
          KURZBEZEICHNUNG: attributes.KURZBEZEICHNUNG,
          STRASSE: attributes.STRASSE,
          PLZ: attributes.PLZ,
          ORT: attributes.ORT,
          TELEFON: attributes.TELEFON,
          EMAIL: attributes.EMAIL,
          FAX: attributes.FAX,
          x: geometry.x,
          y: geometry.y,
        },
        create: {
          Jugendberufshilfe_ID: attributes.ID,
          TRAEGER: attributes.TRAEGER,
          LEISTUNGEN: attributes.LEISTUNGEN,
          BEZEICHNUNG: attributes.BEZEICHNUNG,
          KURZBEZEICHNUNG: attributes.KURZBEZEICHNUNG,
          STRASSE: attributes.STRASSE,
          PLZ: attributes.PLZ,
          ORT: attributes.ORT,
          TELEFON: attributes.TELEFON,
          EMAIL: attributes.EMAIL,
          FAX: attributes.FAX,
          x: geometry.x,
          y: geometry.y,
        },
      });
    } else if (schema === 'Schule') {
      return prisma[schema].upsert({
        where: { Schule_ID: attributes.ID },
        update: {
          TYP: attributes.TYP,
          ART: attributes.ART,
          STANDORTTYP: attributes.STANDORTTYP,
          BEZEICHNUNG: attributes.BEZEICHNUNG,
          BEZEICHNUNGZUSATZ: attributes.BEZEICHNUNGZUSATZ,
          KURZBEZEICHNUNG: attributes.KURZBEZEICHNUNG,
          STRASSE: attributes.STRASSE,
          PLZ: attributes.PLZ,
          ORT: attributes.ORT,
          TELEFON: attributes.TELEFON,
          FAX: attributes.FAX,
          EMAIL: attributes.EMAIL,
          PROFILE: attributes.PROFILE,
          SPRACHEN: attributes.SPRACHEN,
          WWW: attributes.WWW,
          TRAEGER: attributes.TRAEGER,
          TRAEGERTYP: attributes.TRAEGERTYP,
          BEZUGNR: attributes.BEZUGNR,
          GEBIETSARTNUMMER: attributes.GEBIETSARTNUMMER,
          SNUMMER: attributes.SNUMMER,
          NUMMER: attributes.NUMMER,
          GlobalID: attributes.GlobalID,
          Creator: attributes.Creator,
          Editor: attributes.Editor,
          x: geometry.x,
          y: geometry.y,
        },
        create: {
          Schule_ID: attributes.ID,
          TYP: attributes.TYP,
          ART: attributes.ART,
          STANDORTTYP: attributes.STANDORTTYP,
          BEZEICHNUNG: attributes.BEZEICHNUNG,
          BEZEICHNUNGZUSATZ: attributes.BEZEICHNUNGZUSATZ,
          KURZBEZEICHNUNG: attributes.KURZBEZEICHNUNG,
          STRASSE: attributes.STRASSE,
          PLZ: attributes.PLZ,
          ORT: attributes.ORT,
          TELEFON: attributes.TELEFON,
          FAX: attributes.FAX,
          EMAIL: attributes.EMAIL,
          PROFILE: attributes.PROFILE,
          SPRACHEN: attributes.SPRACHEN,
          WWW: attributes.WWW,
          TRAEGER: attributes.TRAEGER,
          TRAEGERTYP: attributes.TRAEGERTYP,
          BEZUGNR: attributes.BEZUGNR,
          GEBIETSARTNUMMER: attributes.GEBIETSARTNUMMER,
          SNUMMER: attributes.SNUMMER,
          NUMMER: attributes.NUMMER,
          GlobalID: attributes.GlobalID,
          Creator: attributes.Creator,
          Editor: attributes.Editor,
          x: geometry.x,
          y: geometry.y,
        },
      });
    } else if (schema === 'Kindertageseinrichtungen') {
      return prisma[schema].upsert({
        where: { Kindertageseinrichtungen_ID: attributes.ID },
        update: {
          TRAEGER: attributes.TRAEGER,
          BEZEICHNUNG: attributes.BEZEICHNUNG,
          KURZBEZEICHNUNG: attributes.KURZBEZEICHNUNG,
          STRASSE: attributes.STRASSE,
          STRSCHL: attributes.STRSCHL,
          HAUSBEZ: attributes.HAUSBEZ,
          PLZ: attributes.PLZ,
          ORT: attributes.ORT,
          HORT: attributes.HORT,
          KITA: attributes.KITA,
          URL: attributes.URL,
          TELEFON: attributes.TELEFON,
          FAX: attributes.FAX,
          EMAIL: attributes.EMAIL,
          BARRIEREFREI: attributes.BARRIEREFREI,
          INTEGRATIV: attributes.INTEGRATIV,
          x: geometry.x,
          y: geometry.y,
        },
        create: {
          Kindertageseinrichtungen_ID: attributes.ID,
          TRAEGER: attributes.TRAEGER,
          BEZEICHNUNG: attributes.BEZEICHNUNG,
          KURZBEZEICHNUNG: attributes.KURZBEZEICHNUNG,
          STRASSE: attributes.STRASSE,
          STRSCHL: attributes.STRSCHL,
          HAUSBEZ: attributes.HAUSBEZ,
          PLZ: attributes.PLZ,
          ORT: attributes.ORT,
          HORT: attributes.HORT,
          KITA: attributes.KITA,
          URL: attributes.URL,
          TELEFON: attributes.TELEFON,
          FAX: attributes.FAX,
          EMAIL: attributes.EMAIL,
          BARRIEREFREI: attributes.BARRIEREFREI,
          INTEGRATIV: attributes.INTEGRATIV,
          x: geometry.x,
          y: geometry.y,
        },
      });
    } else if (schema === 'Schulsozialarbeit') {
      return prisma[schema].upsert({
        where: { Schulsozialarbeit_ID: attributes.ID },
        update: {
          TRAEGER: attributes.TRAEGER,
          LEISTUNGEN: attributes.LEISTUNGEN,
          BEZEICHNUNG: attributes.BEZEICHNUNG,
          KURZBEZEICHNUNG: attributes.KURZBEZEICHNUNG,
          STRASSE: attributes.STRASSE,
          PLZ: attributes.PLZ,
          ORT: attributes.ORT,
          TELEFON: attributes.TELEFON,
          EMAIL: attributes.EMAIL,
          FAX: attributes.FAX,
          x: geometry.x,
          y: geometry.y,
        },
        create: {
          Schulsozialarbeit_ID: attributes.ID,
          TRAEGER: attributes.TRAEGER,
          LEISTUNGEN: attributes.LEISTUNGEN,
          BEZEICHNUNG: attributes.BEZEICHNUNG,
          KURZBEZEICHNUNG: attributes.KURZBEZEICHNUNG,
          STRASSE: attributes.STRASSE,
          PLZ: attributes.PLZ,
          ORT: attributes.ORT,
          TELEFON: attributes.TELEFON,
          EMAIL: attributes.EMAIL,
          FAX: attributes.FAX,
          x: geometry.x,
          y: geometry.y,
        },
      });
    }
  });

  await Promise.all(upserts);
}

// Main function to fetch and update data
async function main() {
  try {
    const allData = await fetchData();
    for (const { data, schema } of allData) {
      await updateDatabase(data, schema);
    }
  } catch (error) {
    console.error('Error in main function:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Schedule this script to run every minute using node-cron
cron.schedule('* * * * *', () => {
  console.log('Running the scheduled task...');
  main();
});

// Run the script immediately (optional)
main();
