// Jede Zeile einzeln geprueft. Zwei Gruppen:
//  (1) echte Fehler: fehlende 1. Person, fehlendes Komma, Tippfehler
//  (2) die abgekuerzte Notation der Cicero-Vorlage, ausgeschrieben
module.exports = {
  // --- Grundwortschatz: echte Fehler ---
  "aedificāre":     { gram: "aedificō, aedificāvī, aedificātum" },   // 1. Person fehlte
  "errāre":         { gram: "errō, errāvī, errātum" },               // 1. Person fehlte
  "appellāre":      { gram: "appellō, appellāvī, appellātum" },      // Komma fehlte, appelāvī mit einem l
  "flectere":       { gram: "flectō, flexī, flexum" },               // Supinum fehlte, Komma stand allein

  // --- Cicero: abgekuerzte Notation ausgeschrieben ---
  "abstrahere":     { gram: "abstrahō, abstrāxī, abstractum" },
  "admonēre":       { gram: "admoneō, admonuī, admonitum" },
  "dēsistere":      { gram: "dēsistō, dēstitī, dēstitum" },
  "diffundere":     { gram: "diffundō, diffūdī, diffūsum" },
  "exprimere":      { gram: "exprimō, expressī, expressum" },
  "gignere":        { gram: "gignō, genuī, genitum" },
  "haurīre":        { gram: "hauriō, hausī, haustum" },
  "implēre":        { gram: "impleō, implēvī, implētum" },
  "īnscrībere":     { gram: "īnscrībō, īnscrīpsī, īnscrīptum" },
  "minuere":        { gram: "minuō, minuī, minūtum" },
  "praetermittere": { gram: "praetermittō, praetermīsī, praetermissum" },
  "absterrēre":     { gram: "absterreō, absterruī, absterritum" },
  "dēicere":        { gram: "dēiciō, dēiēcī, dēiectum" },
  "dēspicere":      { gram: "dēspiciō, dēspexī, dēspectum" },
  "prōficere":      { gram: "prōficiō, prōfēcī, prōfectum" },
  "reficere":       { gram: "reficiō, refēcī, refectum" },
  "adipīscī":       { gram: "adipīscor, adeptus sum" },
  "nancīscī":       { gram: "nancīscor, nactus sum" },

  // --- ohne Supinum: bleiben zweiteilig, aber mit vollstaendiger 1. Person ---
  "urgēre":         { gram: "urgeō, ursī" },
  "concidere":      { gram: "concidō, concidī" },

  // --- Konstruktionshinweise standen im gram-Feld; sie gehoeren zur Bedeutung ---
  "cēlāre":  { gram: "cēlō, cēlāvī, cēlātum", bed: "etw. vor jdm. verheimlichen (aliquid aliquem)" },
  "maerēre": { gram: "maereō, maeruī",        bed: "traurig sein über etw. (aliquid)" },
};
