// serie.js
// Tagesserie: an wie vielen Tagen hintereinander wurde ein Tagesziel erreicht?
//
// Warum ueberhaupt: alle sechs Errungenschaften messen Menge -- geuebte
// Woerter, gesicherte Formen. Nichts belohnt Regelmaessigkeit, dabei ist genau
// die das Ziel. Zehn Minuten an fuenf Tagen sind mehr wert als eine Stunde am
// Sonntag.
//
// Ein Tag zaehlt, sobald EINES der drei Tagesziele erreicht ist -- Vocabula,
// Verba oder Nomina. Alle drei zu verlangen waere eine Huerde, an der die
// Serie staendig risse; gar kein Ziel zu verlangen machte sie bedeutungslos.
//
// Einbinden per <script src="serie.js"></script> vor dem eigenen Skript.

const Serie = (() => {
  const KEY = "latein-arena-serie";

  function tagString(versatz){
    const d = new Date();
    if (versatz) d.setDate(d.getDate() + versatz);
    return d.getFullYear() + "-"
         + String(d.getMonth() + 1).padStart(2, "0") + "-"
         + String(d.getDate()).padStart(2, "0");
  }

  function lies(){
    try {
      const roh = localStorage.getItem(KEY);
      const s = roh ? JSON.parse(roh) : null;
      if (s && typeof s.laenge === "number") return s;
    } catch(e) {}
    return { letzter: "", laenge: 0, bester: 0 };
  }
  function schreib(s){
    try { localStorage.setItem(KEY, JSON.stringify(s)); } catch(e) {}
  }

  // Wird aufgerufen, sobald ein Tagesziel erreicht ist. Mehrfach am Tag
  // aufzurufen ist harmlos: gezaehlt wird nur der erste Aufruf.
  function melde(){
    const heute = tagString();
    const s = lies();
    if (s.letzter === heute) return stand();
    s.laenge = (s.letzter === tagString(-1)) ? s.laenge + 1 : 1;
    s.letzter = heute;
    if (s.laenge > s.bester) s.bester = s.laenge;
    schreib(s);
    return stand();
  }

  // Die gerissene Serie wird beim Lesen berechnet, nicht beim Schreiben: wer
  // drei Tage pausiert und die Seite oeffnet, soll 0 sehen -- aber der
  // Bestwert bleibt stehen.
  function stand(){
    const s = lies();
    const heute = tagString(), gestern = tagString(-1);
    const lebendig = (s.letzter === heute || s.letzter === gestern);
    return {
      laenge: lebendig ? s.laenge : 0,
      bester: s.bester || 0,
      heuteGeschafft: s.letzter === heute
    };
  }

  return { melde, stand };
})();

if (typeof module !== "undefined") module.exports = Serie;
