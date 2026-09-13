// Von Hand kuratierte Nachzuegler: Woerter, deren gram-Feld nicht maschinell
// lesbar ist, sowie unregelmaessige und mehrteilige Ausdruecke.
// Jeder Eintrag ist einzeln geprueft, nichts davon ist abgeleitet.
module.exports = {
  // --- gram-Feld ohne Genus oder unvollstaendig notiert -------------------
  regulaer: [
    { lemma:"modus",    gen:"modī",         stamm:"mod",       klasse:"o",    genus:"m", bedeutung:"das Maß, der Maßstab, die Grenze, die Mäßigung" },
    { lemma:"ūsus",     gen:"ūsūs",         stamm:"ūs",        klasse:"u",    genus:"m", bedeutung:"der Nutzen" },
    { lemma:"speciēs",  gen:"speciēī",      stamm:"speci",     klasse:"e",    genus:"f", bedeutung:"das Äußere, die Gestalt; der Anschein" },
    { lemma:"sacerdōs", gen:"sacerdōtis",   stamm:"sacerdōt",  klasse:"kons", genus:"m", bedeutung:"der Priester, die Priesterin" },
    { lemma:"honor",    gen:"honōris",      stamm:"honōr",     klasse:"kons", genus:"m", bedeutung:"das Ehrenamt, die Ehre" },
    { lemma:"requiēs",  gen:"requiētis",    stamm:"requiēt",   klasse:"kons", genus:"f", bedeutung:"die Ruhe, die Zeit zur Erholung" },
    { lemma:"stirps",   gen:"stirpis",      stamm:"stirp",     klasse:"i",    genus:"f", bedeutung:"der Stamm, die Familie" },
    // Doppellemmata im Wortschatz -- hier als getrennte Woerter gefuehrt
    { lemma:"amīcus",   gen:"amīcī",        stamm:"amīc",      klasse:"o",    genus:"m", bedeutung:"der Freund" },
    { lemma:"amīca",    gen:"amīcae",       stamm:"amīc",      klasse:"a",    genus:"f", bedeutung:"die Freundin" },
    { lemma:"dominus",  gen:"dominī",       stamm:"domin",     klasse:"o",    genus:"m", bedeutung:"der Herr" },
    { lemma:"domina",   gen:"dominae",      stamm:"domin",     klasse:"a",    genus:"f", bedeutung:"die Herrin" },
    { lemma:"nātus",    gen:"nātī",         stamm:"nāt",       klasse:"o",    genus:"m", bedeutung:"der Sohn" },
    { lemma:"nāta",     gen:"nātae",        stamm:"nāt",       klasse:"a",    genus:"f", bedeutung:"die Tochter" },
  ],

  // --- Unregelmaessige und mehrteilige: vollstaendige Tabellen ------------
  fest: [
    { lemma:"vīs", gen:"—", genus:"f", bedeutung:"die Macht, die Kraft, die Gewalt",
      hinweis:"Genitiv und Dativ Singular sind klassisch nicht gebräuchlich",
      paradigma:{ sg:{ nom:"vīs", gen:null, dat:null, akk:"vim", abl:"vī" },
                  pl:{ nom:"vīrēs", gen:"vīrium", dat:"vīribus", akk:"vīrēs", abl:"vīribus" } } },
    { lemma:"domus", gen:"domūs", genus:"f", bedeutung:"das Haus",
      hinweis:"mischt u- und o-Deklination",
      paradigma:{ sg:{ nom:"domus", gen:"domūs", dat:"domuī", akk:"domum", abl:"domō" },
                  pl:{ nom:"domūs", gen:"domōrum", dat:"domibus", akk:"domōs", abl:"domibus" } } },
    { lemma:"deus", gen:"deī", genus:"m", bedeutung:"der Gott",
      hinweis:"unregelmäßiger Plural (dī, deōrum/deum, dīs)",
      paradigma:{ sg:{ nom:"deus", gen:"deī", dat:"deō", akk:"deum", abl:"deō" },
                  pl:{ nom:"dī", gen:"deōrum", dat:"dīs", akk:"deōs", abl:"dīs" } } },
    { lemma:"vās", gen:"vāsis", genus:"n", bedeutung:"das Gefäß",
      hinweis:"Singular 3., Plural o-Deklination",
      paradigma:{ sg:{ nom:"vās", gen:"vāsis", dat:"vāsī", akk:"vās", abl:"vāse" },
                  pl:{ nom:"vāsa", gen:"vāsōrum", dat:"vāsīs", akk:"vāsa", abl:"vāsīs" } } },
    { lemma:"rēs pūblica", gen:"reī pūblicae", genus:"f", bedeutung:"der Staat",
      hinweis:"beide Teile werden dekliniert",
      paradigma:{ sg:{ nom:"rēs pūblica", gen:"reī pūblicae", dat:"reī pūblicae", akk:"rem pūblicam", abl:"rē pūblicā" },
                  pl:{ nom:"rēs pūblicae", gen:"rērum pūblicārum", dat:"rēbus pūblicīs", akk:"rēs pūblicās", abl:"rēbus pūblicīs" } } },
    { lemma:"novae rēs", gen:"novārum rērum", genus:"f", bedeutung:"der Umsturz", nurPlural:true,
      hinweis:"beide Teile werden dekliniert, nur im Plural gebräuchlich",
      paradigma:{ sg:null,
                  pl:{ nom:"novae rēs", gen:"novārum rērum", dat:"novīs rēbus", akk:"novās rēs", abl:"novīs rēbus" } } },
    { lemma:"aes aliēnum", gen:"aeris aliēnī", genus:"n", bedeutung:"die Schulden",
      hinweis:"beide Teile werden dekliniert, nur im Singular gebräuchlich",
      paradigma:{ sg:{ nom:"aes aliēnum", gen:"aeris aliēnī", dat:"aerī aliēnō", akk:"aes aliēnum", abl:"aere aliēnō" },
                  pl:null } },
  ]
};
