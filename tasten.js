// tasten.js
// Tastatursteuerung fuer alle Uebungsmodi.
//
// Gedacht fuer zwei Lagen: am Laptop geht Antworten damit spuerbar schneller,
// und am Beamer laesst sich die Arena bedienen, ohne zur Maus zu greifen.
//
// Die Belegung ist absichtlich dieselbe ueberall:
//   1-4        Antwortmoeglichkeit waehlen
//   1 / 2 / 3  nochmal / wackelig / sicher, wenn eine Karte bewertet wird
//   Leertaste  Karte umdrehen oder weiter
//
// Dass 1-3 zweierlei bedeuten, ist unproblematisch: Antwortknoepfe und
// Bewertungsknoepfe sind nie gleichzeitig sichtbar. Sind beide da, gewinnen
// die Antwortknoepfe.
//
// Einbinden per <script src="tasten.js"></script>, dann Tasten.start().

const Tasten = (() => {

  function sichtbar(el){
    return !!el && el.offsetParent !== null && !el.disabled;
  }
  function antwortKnoepfe(){
    return Array.prototype.slice.call(document.querySelectorAll('.mc-btn')).filter(sichtbar);
  }
  function bewertungsKnoepfe(){
    return ['again','hard','good']
      .map(k => document.querySelector('button.' + k))
      .filter(sichtbar);
  }
  function weiterKnopf(){
    return Array.prototype.slice.call(document.querySelectorAll('button'))
      .filter(b => sichtbar(b) && /weiter|nächste|starten/i.test(b.textContent))[0];
  }
  function karte(){
    return Array.prototype.slice.call(document.querySelectorAll('.card')).filter(sichtbar)[0];
  }

  function start(){
    document.addEventListener('keydown', e => {
      // Wer in ein Feld tippt oder eine Auswahl bedient, meint nicht uns.
      const z = e.target;
      if (z && (z.tagName === 'INPUT' || z.tagName === 'TEXTAREA'
                || z.tagName === 'SELECT' || z.isContentEditable)) return;
      if (e.ctrlKey || e.altKey || e.metaKey) return;

      const n = parseInt(e.key, 10);
      if (n >= 1 && n <= 9){
        const opt = antwortKnoepfe();
        if (opt.length){
          if (opt[n-1]){ opt[n-1].click(); e.preventDefault(); }
          return;
        }
        const bew = bewertungsKnoepfe();
        if (bew[n-1]){ bew[n-1].click(); e.preventDefault(); }
        return;
      }

      if (e.key === ' ' || e.key === 'Enter'){
        const w = weiterKnopf();
        if (w){ w.click(); e.preventDefault(); return; }
        const k = karte();
        if (k){ k.click(); e.preventDefault(); }
      }
    });
  }

  return { start };
})();

if (typeof module !== "undefined") module.exports = Tasten;
