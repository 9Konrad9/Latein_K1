// nomina-engine.js
// Deklinations-Engine fuer Substantive und Adjektive der Latein-Arena K1.
// Erzeugt Formen live aus Stamm + Klasse, es ist keine einzige Form gespeichert.
// Aufbau nach dem Vorbild der Verb-Engine in formentrainer.html.
//
// Substantivklassen: a, o, kons, i, u, e   (i = i-Staemme der 3. Deklination)
// Adjektivklassen:   ao (bonus/bona/bonum), 3-3 (acer/acris/acre),
//                    3-2 (fortis/forte), 3-1 (felix, Gen. felicis)
//
// Grundsatz: Der Genitiv Singular wird nie neu gebildet, sondern aus dem
// Datensatz uebernommen -- er stammt aus dem Woerterbuch und ist die Quelle,
// aus der alles andere abgeleitet wird.

const NominaEngine = (() => {

  const KASUS = ["nom", "gen", "dat", "akk", "abl"];
  const KASUS_LABEL = { nom: "Nominativ", gen: "Genitiv", dat: "Dativ", akk: "Akkusativ", abl: "Ablativ" };
  const NUMERUS_LABEL = { sg: "Singular", pl: "Plural" };
  const GENUS_LABEL = { m: "maskulin", f: "feminin", n: "neutrum" };

  // ---------------------------------------------------------------
  // Substantive
  // ---------------------------------------------------------------
  function deklinierSubstantiv(e){
    const s = e.stamm, nom = e.lemma, gen = e.gen, n = e.genus === "n";

    switch (e.klasse){
      case "a":
        return {
          sg: { nom, gen, dat: gen, akk: s + "am", abl: s + "ā" },
          pl: { nom: s + "ae", gen: s + "ārum", dat: s + "īs", akk: s + "ās", abl: s + "īs" }
        };
      case "o":
        return {
          sg: { nom, gen, dat: s + "ō", akk: n ? nom : s + "um", abl: s + "ō" },
          pl: { nom: n ? s + "a" : s + "ī", gen: s + "ōrum", dat: s + "īs",
                akk: n ? s + "a" : s + "ōs", abl: s + "īs" }
        };
      case "e":
        return {
          sg: { nom, gen, dat: gen, akk: s + "em", abl: s + "ē" },
          pl: { nom: s + "ēs", gen: s + "ērum", dat: s + "ēbus", akk: s + "ēs", abl: s + "ēbus" }
        };
      case "u":
        // Neutra der u-Deklination (cornū) haben im Sg. durchgehend -ū
        return n ? {
          sg: { nom, gen, dat: s + "ū", akk: nom, abl: s + "ū" },
          pl: { nom: s + "ua", gen: s + "uum", dat: s + "ibus", akk: s + "ua", abl: s + "ibus" }
        } : {
          sg: { nom, gen, dat: s + "uī", akk: s + "um", abl: s + "ū" },
          pl: { nom: s + "ūs", gen: s + "uum", dat: s + "ibus", akk: s + "ūs", abl: s + "ibus" }
        };
      case "i":
        // i-Staemme: Genitiv Plural auf -ium. Neutra zusaetzlich mit
        // Ablativ Sg. auf -ī und Nom./Akk. Pl. auf -ia (mare, maria, marium).
        return n ? {
          sg: { nom, gen, dat: s + "ī", akk: nom, abl: s + "ī" },
          pl: { nom: s + "ia", gen: s + "ium", dat: s + "ibus", akk: s + "ia", abl: s + "ibus" }
        } : {
          sg: { nom, gen, dat: s + "ī", akk: s + "em", abl: s + "e" },
          pl: { nom: s + "ēs", gen: s + "ium", dat: s + "ibus", akk: s + "ēs", abl: s + "ibus" }
        };
      default: // konsonantische Deklination
        return n ? {
          sg: { nom, gen, dat: s + "ī", akk: nom, abl: s + "e" },
          pl: { nom: s + "a", gen: s + "um", dat: s + "ibus", akk: s + "a", abl: s + "ibus" }
        } : {
          sg: { nom, gen, dat: s + "ī", akk: s + "em", abl: s + "e" },
          pl: { nom: s + "ēs", gen: s + "um", dat: s + "ibus", akk: s + "ēs", abl: s + "ibus" }
        };
    }
  }

  // ---------------------------------------------------------------
  // Adjektive
  // ---------------------------------------------------------------
  function deklinierAdjektiv(e, genus){
    const s = e.stamm;

    if (e.klasse === "ao"){
      // Maskulinum auf -us oder -er: der Nominativ Sg. steht im Datensatz,
      // alles andere folgt dem Stamm (pulcher, aber pulchrī).
      if (genus === "f") return {
        sg: { nom: s + "a", gen: s + "ae", dat: s + "ae", akk: s + "am", abl: s + "ā" },
        pl: { nom: s + "ae", gen: s + "ārum", dat: s + "īs", akk: s + "ās", abl: s + "īs" }
      };
      if (genus === "n") return {
        sg: { nom: s + "um", gen: s + "ī", dat: s + "ō", akk: s + "um", abl: s + "ō" },
        pl: { nom: s + "a", gen: s + "ōrum", dat: s + "īs", akk: s + "a", abl: s + "īs" }
      };
      return {
        sg: { nom: e.nomMask || s + "us", gen: s + "ī", dat: s + "ō", akk: s + "um", abl: s + "ō" },
        pl: { nom: s + "ī", gen: s + "ōrum", dat: s + "īs", akk: s + "ōs", abl: s + "īs" }
      };
    }

    // Dritte Deklination: durchgehend i-Staemme.
    // Ablativ Sg. auf -ī (attributiver Gebrauch, so auch im Unterricht),
    // Genitiv Pl. auf -ium, Neutrum Pl. auf -ia.
    let nomSg;
    if (e.klasse === "3-3")      nomSg = genus === "m" ? (e.nomMask || s + "er") : genus === "f" ? s + "is" : s + "e";
    else if (e.klasse === "3-2") nomSg = genus === "n" ? s + "e" : s + "is";
    else                          nomSg = e.nomMask || s;   // 3-1: eine Form fuer alle Genera

    if (genus === "n") return {
      sg: { nom: nomSg, gen: s + "is", dat: s + "ī", akk: nomSg, abl: s + "ī" },
      pl: { nom: s + "ia", gen: s + "ium", dat: s + "ibus", akk: s + "ia", abl: s + "ibus" }
    };
    return {
      sg: { nom: nomSg, gen: s + "is", dat: s + "ī", akk: s + "em", abl: s + "ī" },
      pl: { nom: s + "ēs", gen: s + "ium", dat: s + "ibus", akk: s + "ēs", abl: s + "ibus" }
    };
  }

  function tabelle(e, genus){
    return e.genus ? deklinierSubstantiv(e) : deklinierAdjektiv(e, genus || "m");
  }
  function form(e, kasus, numerus, genus){
    const t = tabelle(e, genus);
    return t[numerus] ? t[numerus][kasus] : null;
  }
  function alleFormen(e, genus){
    const t = tabelle(e, genus);
    return [].concat(KASUS.map(k => t.sg[k]), KASUS.map(k => t.pl[k]));
  }

  return { deklinierSubstantiv, deklinierAdjektiv, tabelle, form, alleFormen,
           KASUS, KASUS_LABEL, NUMERUS_LABEL, GENUS_LABEL };
})();

if (typeof module !== "undefined") module.exports = NominaEngine;
