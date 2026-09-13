// fortschritt.js
// Lebenslanger Zaehler der gespielten Karten, je Werkzeug eine Zahl.
//
// Warum eine eigene Datei: die vorhandenen Zaehler taugen dafuer nicht. Der
// Tageszaehler wird jede Nacht zurueckgesetzt, der Wochenzaehler jeden Montag,
// und der Fortschrittsspeicher haelt je Wort nur die Leitner-Stufe fest -- das
// ergibt die Zahl VERSCHIEDENER geuebter Woerter, nicht die Zahl der
// Durchgaenge. Beides wird gebraucht und ist nicht dasselbe.
//
// Einbinden per <script src="fortschritt.js"></script> vor dem eigenen Skript.

const Gesamtzaehler = (() => {

  function lies(schluessel){
    try { const roh = localStorage.getItem(schluessel); return roh ? JSON.parse(roh) : null; }
    catch(e){ return null; }
  }
  function schreib(schluessel, wert){
    try { localStorage.setItem(schluessel, JSON.stringify(wert)); } catch(e) {}
  }

  // Beim allerersten Aufruf mit der Zahl der bereits geuebten Eintraege
  // vorbelegen: jedes davon wurde mindestens einmal gespielt. Der Startwert ist
  // damit eine Untergrenze, nicht der wahre Wert -- wer ein Wort zwanzigmal
  // wiederholt hat, zaehlt hier als eins. Deshalb die Markierung, damit die
  // Anzeige das ehrlich als "mindestens" ausweisen kann.
  function start(schluessel, bisherGeuebt){
    let z = lies(schluessel);
    if (!z){
      const n = bisherGeuebt || 0;
      z = { karten: n, geschaetzt: n > 0 };
      schreib(schluessel, z);
    }
    return z;
  }

  function zaehl(schluessel){
    const z = lies(schluessel) || { karten: 0, geschaetzt: false };
    z.karten++;
    schreib(schluessel, z);
    return z;
  }

  function stand(schluessel){ return lies(schluessel) || { karten: 0, geschaetzt: false }; }

  return { start, zaehl, stand };
})();

if (typeof module !== "undefined") module.exports = Gesamtzaehler;
