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

  // Beim ersten Zaehlen wird der Eintrag angelegt; ein eigener Startaufruf ist
  // nicht noetig.
  function zaehl(schluessel){
    const z = lies(schluessel) || { karten: 0 };
    z.karten++;
    schreib(schluessel, z);
    return z;
  }

  function stand(schluessel){ return lies(schluessel) || { karten: 0 }; }

  return { zaehl, stand };
})();

if (typeof module !== "undefined") module.exports = Gesamtzaehler;
