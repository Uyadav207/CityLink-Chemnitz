const Jugendberufshilfe =
  'https://services6.arcgis.com/jiszdsDupTUO3fSM/arcgis/rest/services/Jugendberufshilfen_FL_1/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json';
const schule =
  'https://services6.arcgis.com/jiszdsDupTUO3fSM/arcgis/rest/services/Schulen_OpenData/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json';

const Kindertageseinrichtungen =
  'https://services6.arcgis.com/jiszdsDupTUO3fSM/arcgis/rest/services/Kindertageseinrichtungen_Sicht/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json';

const Schulsozialarbeit =
  'https://services6.arcgis.com/jiszdsDupTUO3fSM/arcgis/rest/services/Schulsozialarbeit_FL_1/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json';

module.exports = {
  Jugendberufshilfe,
  schule,
  Kindertageseinrichtungen,
  Schulsozialarbeit,
};
