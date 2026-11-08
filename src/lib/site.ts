export const site = {
  name: "life_by_marek",
  person: "Marek Širůček",
  title: "Zdravá dlouhověkost a prevence | life_by_marek",
  description:
    "Prevence, síla a zdraví na roky dopředu. Marek Širůček ukazuje, jak jíst, hýbat se a regenerovat bez diet. Měření složení těla na Tanitě. Bez zázraků.",
  defaultDescription:
    "Zdravá dlouhověkost, prevence a síla. Jednoduché kroky místo diet. Nech mi na sebe kontakt a jdeme na to spolu.",
  instagram: "https://www.instagram.com/life_by_marek/",
  locale: "cs_CZ",
  lang: "cs",
  themeColor: "#7AC143",
  ogImage: "/og.jpg",
  ogImageAlt: "Marek Širůček dříve a dnes — srovnání před proměnou a po ní",
} as const;

export const navigation = [
  { label: "Co řeším", href: "/#vyhody" },
  { label: "Tanita", href: "/#tanita" },
  { label: "Příběh", href: "/#pribeh" },
  { label: "Články", href: "/clanky/" },
] as const;
