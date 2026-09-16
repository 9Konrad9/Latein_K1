// formangaben.js
// Erzeugt Multiple-Choice-Fragen nach der Woerterbuchangabe eines Wortes:
// Genitiv und Genus bei Substantiven, die drei Stammformen bei Verben.
//
// Grundsatz bei den falschen Antworten: sie stammen aus DEMSELBEN Wort, nicht
// aus fremden. Fremde Woerter waeren am Wortstamm sofort zu erkennen, die Frage
// damit trivial. So dagegen wird wirklich geprueft, was geprueft werden soll --
// bei Nomen die Deklination und das Genus, bei Verben die Perfekt- und
// Supinbildung, samt der klassischen Falle der durchgaengig regelmaessigen Form.
//
// Was sich nicht zweifelsfrei zerlegen laesst oder zu wenige brauchbare
// Alternativen ergibt, faellt heraus. Eine unsinnige Antwortmoeglichkeit ist
// schlimmer als ein fehlendes Wort.

const Formangaben = (() => {

  const GEN_ENDUNGEN = ["ae", "ī", "is", "ūs", "ēī"];

  function mischen(a){
    const k = a.slice();
    for (let i = k.length - 1; i > 0; i--){
      const j = Math.floor(Math.random() * (i + 1));
      [k[i], k[j]] = [k[j], k[i]];
    }
    return k;
  }

  // "accūsātōris, m." -> Genitiv und Genus
  function substantiv(gram){
    const m = gram.trim().match(/^([^,]+),\s*(m|f|n)\.?$/);
    if (!m) return null;
    const gen = m[1].trim(), genus = m[2];
    const endung = GEN_ENDUNGEN.find(e => gen.endsWith(e));
    if (!endung) return null;
    const stamm = gen.slice(0, -endung.length);
    if (!stamm) return null;
    // Eine Genus-Variante und zwei Endungs-Varianten: so steht beides zur Wahl,
    // die Deklination wie das Geschlecht.
    const anderesGenus = mischen(["m", "f", "n"].filter(g => g !== genus))[0];
    const andereEndungen = mischen(GEN_ENDUNGEN.filter(e => e !== endung))
      .slice(0, 2).map(e => stamm + e + ", " + genus + ".");
    return {
      richtig: gen + ", " + genus + ".",
      frage: "Wie lautet der Genitiv, und welches Genus?",
      kandidaten: [gen + ", " + anderesGenus + ".", ...andereEndungen]
    };
  }

  // "mittō, mīsī, missum" -> die drei Stammformen
  function verb(gram){
    const teile = gram.trim().split(",").map(t => t.trim()).filter(Boolean);
    if (teile.length !== 3) return null;
    const [p1, p2, p3] = teile;
    if (!/(ō|or)$/.test(p1)) return null;    // ohne erkennbare 1. Person nicht zerlegbar
    if (/[()]/.test(gram)) return null;      // Klammerzusaetze bleiben aussen vor
    const stamm = p1.replace(/(iō|eō|ō)$/, "");
    if (!stamm) return null;
    const bau = (perf, sup) => [p1, perf, sup].join(", ");
    return {
      richtig: teile.join(", "),
      frage: "Wie lauten die Stammformen?",
      kandidaten: [
        bau(stamm + "āvī", stamm + "ātum"),   // durchgaengig a-Konjugation
        bau(stamm + "uī",  stamm + "itum"),   // e-Konjugations-Muster
        bau(p2,            stamm + "ātum"),   // Perfekt richtig, Supinum falsch
        bau(stamm + "āvī", p3),               // Perfekt falsch, Supinum richtig
        bau(stamm + "uī",  p3),
        bau(p2,            stamm + "itum"),
        bau(stamm + "īvī", stamm + "ītum"),   // i-Konjugations-Muster
      ]
    };
  }

  function analyse(w){
    if (!(w.gram || "").trim()) return null;
    if (w.waGroup === "substantive") return substantiv(w.gram);
    if (w.waGroup === "verben")      return verb(w.gram);
    return null;
  }

  // Liefert eine fertige Frage oder null, wenn das Wort nicht taugt.
  function fuer(w){
    const r = analyse(w);
    if (!r) return null;
    const falsche = [...new Set(r.kandidaten)].filter(x => x !== r.richtig).slice(0, 3);
    if (falsche.length < 3) return null;
    return { richtig: r.richtig, frage: r.frage, falsche };
  }

  // Guenstige Vorpruefung fuer den Aufbau des Pools.
  function taugt(w){ return fuer(w) !== null; }

  return { fuer, taugt };
})();

if (typeof module !== "undefined") module.exports = Formangaben;
