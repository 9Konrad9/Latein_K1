// Baut nomina-alle.json aus wortschatz-daten.json.
// Grundsatz: streng bleiben. Was nicht zweifelsfrei bestimmbar ist, fliegt raus
// und wird berichtet -- eine falsch erzeugte Form waere schlimmer als ein
// fehlendes Wort. Nur Regex-Literale, keine aus Strings gebauten Ausdruecke.
const fs = require("fs");
const daten = JSON.parse(fs.readFileSync("wortschatz-daten.json", "utf8"));

const WORT   = /^[a-zA-ZāēīōūȳăĕĭŏŭÄÖÜäöü]+$/;
const VOKALE = /[aeiouyāēīōūȳăĕĭŏŭ]+/g;
const ZWEI_KONSONANTEN = /[^aeiouyāēīōūȳăĕĭŏŭ]{2}$/;
const NUR_ENDUNG = /^(ae|ī|ūs|ēī|eī)$/;
// Heteroklitisch: Singular und Plural folgen verschiedenen Deklinationen
// (vās/vāsa/vāsōrum, domus, deus mit Plural dī/deōrum/dīs). Eine Engine, die
// aus einem Stamm ableitet, kann das nicht abbilden -- deshalb draussen.
const HETEROKLITISCH = /^(vās|domus|deus|iūgerum|Iuppiter)$/;
// Klassische Ausnahmen: erfuellen die i-Stamm-Regeln formal, bilden den
// Genitiv Plural aber auf -um (patrum, nicht patrium).
const KEINE_I_STAEMME = /^(pater|māter|mater|frāter|frater|iuvenis|senex|canis|parēns|parens|vātēs|vates)$/;

function parseSubstantiv(w){
  let roh = (w.gram || "").trim();
  if (!roh) return { fehler: "kein gram-Feld" };
  if (/undeklinierbar|kein Gen/i.test(roh)) return { fehler: "undeklinierbar oder defektiv" };
  if (/Adj\./.test(roh))            return { fehler: "substantiviertes Adjektiv" };
  if (/[a-zā-ū]ō,\s/.test(roh))     return { fehler: "Verbstammformen im gram-Feld" };
  if (/Pl\.|Pluralwort/i.test(roh)) return { fehler: "Pluraletantum" };
  if (/\s/.test(w.lemma))           return { fehler: "mehrteiliges Lemma" };
  if (HETEROKLITISCH.test(w.lemma)) return { fehler: "heteroklitisch (Sg. und Pl. verschiedene Deklination)" };
  if (/\//.test(w.lemma) || /\//.test(roh)) return { fehler: "Doppellemma oder Nebenform" };

  roh = roh.replace(/\([^)]*\)/g, "").trim();          // Klammerzusaetze weg
  roh = roh.replace(/\s*und\s*(m|f|n)\.\s*$/, "");     // "m. und f." -> "m."

  let gen = null, genus = null;
  const mitKomma  = roh.match(/^([^,]+),\s*(m|f|n)\.?$/);
  const ohneKomma = roh.match(/^(\S+)\s+(m|f|n)\.?$/);
  if (mitKomma)       { gen = mitKomma[1].trim();  genus = mitKomma[2]; }
  else if (ohneKomma) { gen = ohneKomma[1].trim(); genus = ohneKomma[2]; }
  else return { fehler: "gram-Feld nicht lesbar: " + roh };

  gen = gen.replace(/^-/, "");                          // "-ae" wie "ae" behandeln
  if (!WORT.test(gen)) return { fehler: "Genitiv nicht wortfoermig: " + gen };

  // Bloss die Endung angegeben -> vollen Genitiv aus dem Nominativ bilden.
  // Bei Lemmata auf -er bleibt offen, ob der Stamm das e behaelt (puer/puerī)
  // oder nicht (ager/agrī) -- solche Faelle werden abgelehnt statt geraten.
  // Regulaere Kurzformen der 3. Deklination: nur die Genitivendung ist notiert,
  // der Stamm steckt im Nominativ (dēfēnsor + ōris -> dēfēnsōris).
  if (/^ōris$/.test(gen) && /or$/.test(w.lemma))        gen = w.lemma.slice(0, -2) + "ōris";
  else if (/^ōnis$/.test(gen) && /ō$/.test(w.lemma))    gen = w.lemma.slice(0, -1) + "ōnis";
  else if (/^ātis$/.test(gen) && /ās$/.test(w.lemma))   gen = w.lemma.slice(0, -2) + "ātis";
  else if (/^ūtis$/.test(gen) && /ūs$/.test(w.lemma))   gen = w.lemma.slice(0, -2) + "ūtis";
  else if (/^inis$/.test(gen) && /(ō|en)$/.test(w.lemma)) gen = w.lemma.replace(/(ō|en)$/, "in") + "is";

  if (NUR_ENDUNG.test(gen)) {
    const l = w.lemma;
    if (gen === "ae" && /a$/.test(l))            gen = l.slice(0, -1) + "ae";
    else if (gen === "ī" && /(us|um)$/.test(l))  gen = l.slice(0, -2) + "ī";
    else if (gen === "ī" && /er$/.test(l))       return { fehler: "Kurzgenitiv bei -er mehrdeutig" };
    else if (gen === "ūs" && /us$/.test(l))      gen = l.slice(0, -2) + "ūs";
    else if (/^[eē]ī$/.test(gen) && /ēs$/.test(l)) gen = l.slice(0, -2) + "ēī";
    else return { fehler: "Kurzgenitiv nicht aufloesbar: " + gen + " zu " + l };
  }

  let klasse, stamm;
  if (/ae$/.test(gen))         { klasse = "a";    stamm = gen.slice(0, -2); }
  else if (/[eē]ī$/.test(gen) && /ēs$/.test(w.lemma)) { klasse = "e";    stamm = gen.slice(0, -2); }
  else if (/ūs$/.test(gen))    { klasse = "u";    stamm = gen.slice(0, -2); }
  else if (/ī$/.test(gen))     { klasse = "o";    stamm = gen.slice(0, -1); }
  else if (/is$/.test(gen))    { klasse = "kons"; stamm = gen.slice(0, -2); }
  else return { fehler: "Genitivendung unbekannt: " + gen };
  if (!stamm || !gen.startsWith(stamm)) return { fehler: "Stamm nicht plausibel" };
  // Der Genitiv muss mit dem Nominativ einen Wortanfang teilen. Sonst steht im
  // gram-Feld nur ein Endungsfragment (requiēs mit "ētis") und der Stamm waere
  // frei erfunden.
  // Laengenzeichen bleiben dabei ausser Betracht: gēns/gentis und māter/matris
  // sind dasselbe Wort, unterscheiden sich in der Schreibung aber im ersten Vokal.
  const ohneLaenge = s => s.toLowerCase()
    .replace(/[āăa]/g,"a").replace(/[ēĕe]/g,"e").replace(/[īĭi]/g,"i")
    .replace(/[ōŏo]/g,"o").replace(/[ūŭu]/g,"u").replace(/[ȳy]/g,"y");
  const gleich = (() => { let i = 0; const a = ohneLaenge(w.lemma), b = ohneLaenge(gen);
    while (i < a.length && i < b.length && a[i] === b[i]) i++; return i; })();
  const genug = w.lemma.length <= 3 ? 1 : 2;
  if (gleich < genug)
    return { fehler: "Genitiv passt nicht zum Nominativ: " + w.lemma + " / " + gen };

  // i-Staemme nach Schulregel: Neutra auf -e/-al/-ar, Parisyllaba auf -is/-ēs,
  // zwei Konsonanten vor der Genitivendung.
  if (klasse === "kons") {
    const silben = s => (s.match(VOKALE) || []).length;
    if (!KEINE_I_STAEMME.test(w.lemma) &&
        ((genus === "n" && /(e|al|ar)$/.test(w.lemma))
     || (/(is|ēs)$/.test(w.lemma) && silben(w.lemma) === silben(gen))
     || ZWEI_KONSONANTEN.test(stamm))) klasse = "i";
  }
  return { lemma: w.lemma, gen, stamm, klasse, genus, bedeutung: w.bed };
}

function parseAdjektiv(w){
  const lemma = (w.lemma || "").trim();
  const roh   = (w.gram || "").trim();
  if (/[a-zā-ū]ō,\s|---/.test(lemma + " " + roh)) return { fehler: "Verbstammformen" };
  if (/^(ecce|necesse|nōndum)/.test(lemma))       return { fehler: "kein Adjektiv" };
  const kern = lemma.split("/")[0].trim();
  const teile = kern.split(",").map(s => s.trim()).filter(Boolean);
  const gramKern = roh.split("/")[0].trim();
  if (/(ior|ius)$/.test(teile[0]) && /ius$/.test(teile[1] || gramKern || ""))
    return { fehler: "Komparativ" };

  if (teile.length === 3 && /um$/.test(teile[2]) && /a$/.test(teile[1])) {
    const stamm = /us$/.test(teile[0]) ? teile[0].slice(0, -2) : teile[1].slice(0, -1);
    if (!stamm) return { fehler: "Stamm leer" };
    return { lemma: kern, stamm, klasse: "ao", nomMask: teile[0], bedeutung: w.bed };
  }
  if (teile.length === 3 && /re$/.test(teile[2]) && /ris$/.test(teile[1]))
    return { lemma: kern, stamm: teile[1].slice(0, -2), klasse: "3-3", nomMask: teile[0], bedeutung: w.bed };
  if (teile.length >= 2 && /e$/.test(teile[teile.length-1]) && /is$/.test(teile[0]))
    return { lemma: teile[0] + ", " + teile[teile.length-1], stamm: teile[0].slice(0, -2), klasse: "3-2", bedeutung: w.bed };
  if (teile.length === 1 && /is$/.test(teile[0]) && /^[^,\s]*e$/.test(gramKern))
    return { lemma: teile[0] + ", " + gramKern, stamm: teile[0].slice(0, -2), klasse: "3-2", bedeutung: w.bed };
  const gen1 = (teile.length === 2 && /is$/.test(teile[1])) ? teile[1]
             : (/^[^,\s]+is$/.test(gramKern) ? gramKern : null);
  if (gen1) return { lemma: teile[0] + ", " + gen1, stamm: gen1.slice(0, -2), klasse: "3-1", nomMask: teile[0], bedeutung: w.bed };
  return { fehler: "Adjektivtyp nicht erkannt" };
}

const substRoh = daten.filter(w => w.waGroup === "substantive");
const adjRoh   = daten.filter(w => w.waGroup === "adjektive");
const substantive = [], adjektive = [], nein = { s: {}, a: {} };
for (const w of substRoh){ const r = parseSubstantiv(w);
  if (r.fehler) (nein.s[r.fehler.split(":")[0]] ??= []).push(w.lemma); else substantive.push(r); }
for (const w of adjRoh){ const r = parseAdjektiv(w);
  if (r.fehler) (nein.a[r.fehler.split(":")[0]] ??= []).push(w.lemma); else adjektive.push(r); }

fs.writeFileSync("nomina-alle.json", JSON.stringify({ substantive, adjektive }));
console.log("Substantive: " + substantive.length + " von " + substRoh.length);
console.log("Adjektive:   " + adjektive.length + " von " + adjRoh.length);
const kl = a => { const o = {}; a.forEach(x => o[x.klasse] = (o[x.klasse]||0)+1); return o; };
console.log("\nSubstantiv-Klassen:", JSON.stringify(kl(substantive)));
console.log("Adjektiv-Klassen:  ", JSON.stringify(kl(adjektive)));
console.log("\nAbgelehnt (Substantive):");
Object.entries(nein.s).sort((x,y)=>y[1].length-x[1].length).forEach(([g,l])=>console.log("  "+String(l.length).padStart(3)+"x "+g+"  ->  "+l.slice(0,5).join(", ")));
console.log("Abgelehnt (Adjektive):");
Object.entries(nein.a).sort((x,y)=>y[1].length-x[1].length).forEach(([g,l])=>console.log("  "+String(l.length).padStart(3)+"x "+g+"  ->  "+l.slice(0,5).join(", ")));
