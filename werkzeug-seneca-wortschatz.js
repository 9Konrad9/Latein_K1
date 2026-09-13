// Seneca-Wortschatz fuer die Latein-Arena K1.
//
// Quelle: Landesbildungsserver Baden-Wuerttemberg, "Senecas Wortschatz",
// erstellt auf der Basis einer Ausarbeitung von Karlheinz Glaser,
// Kopernikus-Gymnasium Wasseralfingen. Lizenz CC BY 4.0 International.
// https://www.schule-bw.de/faecher-und-schularten/sprachen-und-literatur/latein/sprache/materialien-zur-sprache-senecas/senecas-wortschatz.html
//
// Bearbeitung gegenueber der Vorlage:
//  - Laengenzeichen ergaenzt (die Vorlage setzt keine); wo ein Wort schon im
//    Grundwortschatz steht, ist dessen Schreibung uebernommen, damit dasselbe
//    Wort nicht in zwei Modulen verschieden aussieht
//  - drei Tippfehler der Vorlage berichtigt: fortitudiinis -> fortitūdinis,
//    sollicitinis -> sollicitūdinis, fortuítus -> fortuītus
//  - Mehrfacheintraege getrennt (cupiditas/libido, vitare/evitare/devitare)
//  - erlaeuternde Fliesstextpassagen auf Karteikartenlaenge gekuerzt
//
// Das Feld quelle traegt die thematische Gliederung der Vorlage.
const W = "Welt, Schicksal und Geist", T = "Tugenden", L = "Laster und Affekte", V = "Verben und Wendungen";
const e = (id, lemma, gram, bed, waGroup, quelle) => ({
  id: "seneca_" + id, lemma, gram, bed, waGroup,
  typ: "autor_seneca", autorWerk: "Seneca", stage: 0, quelle
});

module.exports = [
  // --- Welt, Schicksal und Geist ---
  e("deus",        "deus",    "deī, m.",       "Gott, Gottheit, göttliches Prinzip", "substantive", W),
  e("fortuna",     "fortūna", "fortunae, f.",  "das Schicksal", "substantive", W),
  e("fortuitus",   "fortuītus, fortuīta, fortuītum", "", "zufällig", "adjektive", W),
  e("fortuita",    "fortuīta", "fortuītōrum, n.", "das Zufällige, die Zufallsgüter (z. B. Reichtum), von denen man sich unabhängig machen soll", "substantive", W),
  e("forte",       "forte",   "Adv.",          "zufällig", "adverbien", W),
  e("casus",       "cāsus",   "casūs, m.",     "der Zufall", "substantive", W),
  e("fatum",       "fātum",   "fātī, n.",      "das Schicksal, die Bestimmung, die Weltordnung — das von den Göttern Bestimmte, mit dem sich der Mensch in Einklang bringen soll", "substantive", W),
  e("mundus",      "mundus",  "mundī, m.",     "die Welt, das Weltall", "substantive", W),
  e("natura",      "nātūra",  "nātūrae, f.",   "die Natur — der Welt insgesamt oder des einzelnen Menschen", "substantive", W),
  e("ratio",       "ratiō",   "ratiōnis, f.",  "die Vernunft: die göttliche Weltvernunft, die alles ordnet, oder die Vernunft des Einzelnen", "substantive", W),
  e("animus",      "animus",  "animī, m.",     "der Geist, die Seele, das Denken", "substantive", W),
  e("mens",        "mēns",    "mentis, f.",    "der Geist, die Seele, die Einstellung; bona/perfecta mēns: die sittlich gute Geisteshaltung", "substantive", W),
  e("aliena",      "aliēna",  "aliēnōrum, n.", "das Fremde — was dem Menschen nicht wirklich gehört und ihm leicht wieder genommen werden kann", "substantive", W),
  e("bonum",       "bonum",   "bonī, n.",      "das Gut; summum bonum: das höchste Gut (nach stoischer Lehre die virtūs)", "substantive", W),
  e("honestum",    "honestum","honestī, n.",   "das sittlich Gute (identisch mit der virtūs)", "substantive", W),
  e("malum",       "malum",   "malī, n.",      "das Übel", "substantive", W),
  e("vana",        "vāna",    "vānōrum, n.",   "das Belanglose, Gleichgültige, Nichtige", "substantive", W),
  e("commoda",     "commoda", "commodōrum, n.","das Angenehme, angenehme Dinge", "substantive", W),
  e("incommoda",   "incommoda","incommodōrum, n.","das Unangenehme, unangenehme Dinge", "substantive", W),
  e("secundum_naturam", "secundum nātūram vīvere", "", "gemäß der Natur leben", "verben", W),
  // --- Tugenden ---
  e("virtus",      "virtūs",  "virtūtis, f.",  "die sittliche Vollkommenheit — nach stoischer Lehre das einzige Gut", "substantive", T),
  e("sapientia",   "sapientia","sapientiae, f.","die Weisheit", "substantive", T),
  e("sapiens",     "sapiēns", "sapientis, m.", "der Weise, der die sittliche Vollkommenheit erreicht hat", "substantive", T),
  e("proficiens",  "prōficiēns","prōficientis, m.","derjenige, der auf dem Weg zum Weisen Fortschritte macht", "substantive", T),
  e("fortitudo",   "fortitūdo","fortitūdinis, f.","die Tapferkeit (Kardinaltugend)", "substantive", T),
  e("iustitia",    "iūstitia","iūstitiae, f.", "die Gerechtigkeit (Kardinaltugend)", "substantive", T),
  e("prudentia",   "prudentia","prudentiae, f.","die Einsicht, die Klugheit (Kardinaltugend)", "substantive", T),
  e("temperantia", "temperantia","temperantiae, f.","die Selbstbeherrschung (Kardinaltugend)", "substantive", T),
  e("aequus_animus","aequus animus","auch: aequitās animī","der Gleichmut, die Gelassenheit", "substantive", T),
  e("securitas",   "sēcūritās","sēcūritātis, f.","die Unerschütterlichkeit, die Ausgeglichenheit, die Seelenruhe", "substantive", T),
  e("tranquillitas","tranquillitās animī","tranquillitātis, f.","die Seelenruhe, die Ausgeglichenheit", "substantive", T),
  e("placidus",    "placidus, placida, placidum","","sanft, ruhig, gelassen", "adjektive", T),
  e("humanitas",   "hūmānitās","hūmānitātis, f.","die Menschlichkeit; die Menschenliebe; die Bildung", "substantive", T),
  e("perseverantia","persevērantia","persevērantiae, f.","die Beharrlichkeit", "substantive", T),
  e("perseverare", "persevērāre","persevērō, persevērāvī, persevērātum","beharrlich weitermachen", "verben", T),

  // --- Laster und Affekte ---
  e("ambitio",     "ambitiō", "ambitiōnis, f.","der Ehrgeiz", "substantive", L),
  e("vitium",      "vitium",  "vitiī, n.",     "das Laster, das sittlich Schlechte", "substantive", L),
  e("avaritia",    "avāritia","avāritiae, f.", "die Habgier", "substantive", L),
  e("cupiditas",   "cupiditās","cupiditātis, f.","die Begierde, das Verlangen", "substantive", L),
  e("libido",      "libīdō",  "libīdinis, f.", "die Begierde, das Verlangen", "substantive", L),
  e("luxuria",     "luxūria", "luxūriae, f.",  "die Genussucht", "substantive", L),
  e("invidia",     "invidia", "invidiae, f.",  "die Missgunst, der Neid", "substantive", L),
  e("ira",         "īra",     "īrae, f.",      "der Zorn", "substantive", L),
  e("voluptas",    "voluptās","voluptātis, f.","das Vergnügen, die Freude — eher oberflächlich", "substantive", L),
  e("gaudium",     "gaudium", "gaudiī, n.",    "die Freude — die wahre, dauerhafte, im Unterschied zu voluptās", "substantive", L),
  e("opinio",      "opīniō",  "opīniōnis, f.", "die Meinung, die Mutmaßung — nicht durch die ratiō geprüft und daher meist negativ", "substantive", L),
  e("stultus",     "stultus", "stultī, m.",    "der Törichte — das Gegenteil zum sapiēns", "substantive", L),
  e("aeger_subst", "aeger",   "aegrī, m.",     "der Kranke", "substantive", L),
  e("aeger_adj",   "aeger, aegra, aegrum","",  "krank", "adjektive", L),
  e("aegritudo",   "aegritūdō","aegritūdinis, f.","die Krankheit", "substantive", L),
  e("cura",        "cūra",    "cūrae, f.",     "die Sorge", "substantive", L),
  e("sollicitudo", "sollicitūdō","sollicitūdinis, f.","die Sorge, die Unruhe", "substantive", L),
  e("sollicitus",  "sollicitus, sollicita, sollicitum","","unruhig, in Sorge", "adjektive", L),
  e("occupatio",   "occupātiō","occupātiōnis, f.","die Beschäftigung, die Geschäftigkeit", "substantive", L),
  e("servitus",    "servitūs","servitūtis, f.","die Knechtschaft, die Unfreiheit", "substantive", L),
  // --- Verben und Wendungen ---
  e("vitare",      "vītāre",  "vītō, vītāvī, vītātum","vermeiden", "verben", V),
  e("evitare",     "ēvītāre", "ēvītō, ēvītāvī, ēvītātum","vermeiden", "verben", V),
  e("devitare",    "dēvītāre","dēvītō, dēvītāvī, dēvītātum","vermeiden", "verben", V),
  e("queri",       "querī",   "queror, questus sum","sich beklagen, klagen", "verben", V),
  e("quaerere",    "quaerere","quaerō, quaesīvī, quaesītum","suchen, fragen", "verben", V),
  e("licet",       "licet",   "Perf. licuit", "es ist möglich, es ist erlaubt", "verben", V),
  e("liquet",      "liquet",  "unpersönlich",  "es ist klar, es ist einleuchtend", "verben", V),
  e("pati",        "patī",    "patior, passus sum","dulden, erleiden; zulassen", "verben", V),
  e("vacare_abl",  "vacāre",  "mit Ablativ",   "frei sein von etwas", "verben", V),
  e("vacare_dat",  "vacāre",  "mit Dativ",     "frei sein für etwas, sich frei machen für etwas", "verben", V),
];
