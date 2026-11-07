export const vyvoleni = {
  // Přístupový kód, který posíláš vyvoleným. Změň ho a pošli nový.
  passphrase: "marek2026",

  video: {
    // TODO: sem vlož ID svého YouTube videa (to za "v=" v adrese).
    youtubeId: "YE7VzlLtp-4",
    title: "Motivační video",
    description:
      "Osobní video o tom, co se dá změnit, když přestaneš řešit diety a začneš řešit sebe.",
    uploadDate: "2026-01-01T00:00:00Z",
  },

  // TODO: sem dej odkaz, kam má vést tlačítko (Instagram, e-mail, platební brána…).
  ctaUrl: "https://www.instagram.com/life_by_marek/",
  ctaLabel: "Napsat na Instagram",

  offer: {
    kicker: "Další krok",
    title: "Chceš to probrat?",
    text: "Napiš mi na Instagramu. Odpovídám osobně, bez tlaku a bez prodejní omáčky.",
    note: "Cena, termíny a všechny detaily ti řeknu osobně. Tohle není pro všechny.",
  },

  benefits: [
    {
      title: "Plán, který sedne tvému dni",
      text: "Ne obecné rady. Kroky, které zapadnou do tvé práce, rodiny a chuti.",
    },
    {
      title: "Jídlo bez zákazů",
      text: "Naučíš se jíst to, co máš rád. Jen jinak poskládané, aby to tělu dávalo smysl.",
    },
    {
      title: "Pohyb jako doplněk",
      text: "Žádné trestání v posilovně. Pohyb, který tě baví a vydrží i ve špatném týdnu.",
    },
    {
      title: "Hlavu v klidu",
      text: "Bez výčitek a bez pocitu, že jsi selhal. Cesta, ke které se dá kdykoliv vrátit.",
    },
  ],

  forWhom: [
    "Pro lidi, kteří už zkusili diety a nechtějí další.",
    "Pro ty, kdo chtějí změnu, která vydrží i v běžném týdnu.",
    "Pro ty, kdo chtějí mít jasno v tom, co jíst a jak se hýbat.",
  ],

  notForWhom: [
    "Pro ty, kdo hledají zázrak přes noc.",
    "Pro ty, kdo teď na změnu nemají prostor.",
    "Pro ty, kdo chtějí jen další tabulku a počítání kalorií.",
  ],

  steps: [
    {
      number: "01",
      title: "Podíváš se na video",
      text: "Celé. Bez přeskakování. Je to nejdůležitější část.",
    },
    {
      number: "02",
      title: "Napíšeš mi",
      text: "Krátká zpráva stačí. Řekni mi, kde jsi a co chceš změnit.",
    },
    {
      number: "03",
      title: "Probereme to spolu",
      text: "V klidu zjistíme, jestli to má smysl. Pro tebe i pro mě.",
    },
  ],

  faq: [
    {
      q: "Musím držet dietu?",
      a: "Ne. Drastické diety neřeším a nejdou mi. Jím, co mám rád – jen tak, aby to tělu dávalo smysl a vydrželo.",
    },
    {
      q: "Kolik mám cvičit?",
      a: "Míň, než si myslíš. Pohyb je doplněk, ne hlavní cíl. Stačí to, co tě baví a co se ti vejde do dne.",
    },
    {
      q: "Jak dlouho to trvá?",
      a: "Nejde o jednorázovou kúru. Jde o návyky, které si necháš. Proto to musí být cesta, ne trest.",
    },
    {
      q: "Co když mi to nepůjde?",
      a: "Ozveš se mi a najdeme cestu. Nikdo tě nebude soudit. Cílem není dokonalost.",
    },
    {
      q: "Proč je stránka schovaná?",
      a: "Protože ji nechci pouštět všem. Je pro lidi, kterým to řeknu osobně.",
    },
  ],
} as const;
