export type Category = {
  id: string;
  name: string;
  gradientFrom: string;
  gradientTo: string;
  pptPath: string;
};

export const categories: Category[] = [
  { 
    id: "bollywood-actors", 
    name: "Bollywood Actors", 
    gradientFrom: "from-rose-500", 
    gradientTo: "to-orange-500",
    pptPath: "/presentations/Flags.pdf"
  },
  { 
    id: "crickters", 
    name: "Crickters", 
    gradientFrom: "from-emerald-500", 
    gradientTo: "to-teal-600",
    pptPath: "https://drive.google.com/file/d/YOUR_FILE_ID_HERE/preview"
  },
  { 
    id: "marvel", 
    name: "Marvel", 
    gradientFrom: "from-indigo-500", 
    gradientTo: "to-purple-600",
    pptPath: "/presentations/marvel.pptx"
  },
  { 
    id: "political-leaders", 
    name: "Political Leaders", 
    gradientFrom: "from-cyan-500", 
    gradientTo: "to-sky-600",
    pptPath: "/presentations/political-leaders.pptx"
  },
  { 
    id: "singers", 
    name: "Singers", 
    gradientFrom: "from-fuchsia-500", 
    gradientTo: "to-pink-600",
    pptPath: "/presentations/singers.pptx"
  },
  { 
    id: "hollywood-actors", 
    name: "Hollywood Actors", 
    gradientFrom: "from-violet-500", 
    gradientTo: "to-indigo-700",
    pptPath: "/presentations/hollywood-actors.pptx"
  },
  { 
    id: "hollywood-movies", 
    name: "Hollywood Movies", 
    gradientFrom: "from-red-500", 
    gradientTo: "to-rose-700",
    pptPath: "/presentations/hollywood-movies.pptx"
  },
  { 
    id: "bollywood-movies-1", 
    name: "Bollywood Movies 1", 
    gradientFrom: "from-orange-500", 
    gradientTo: "to-amber-600",
    pptPath: "/presentations/bollywood-movies-1.pptx"
  },
  { 
    id: "bollywood-movies-2", 
    name: "Bollywood Movies 2", 
    gradientFrom: "from-orange-500", 
    gradientTo: "to-amber-600",
    pptPath: "/presentations/bollywood-movies-2.pptx"
  },
  { 
    id: "cartoon-characters", 
    name: "Cartoon Characters", 
    gradientFrom: "from-pink-500", 
    gradientTo: "to-rose-600",
    pptPath: "/presentations/cartoon-characters.pptx"
  },
  { 
    id: "driving-sign-boards", 
    name: "Driving sign Boards", 
    gradientFrom: "from-amber-500", 
    gradientTo: "to-orange-600",
    pptPath: "/presentations/driving-sign-boards.pptx"
  },
  { 
    id: "clothing-brands", 
    name: "Clothing Brands", 
    gradientFrom: "from-zinc-600", 
    gradientTo: "to-slate-800",
    pptPath: "/presentations/clothing-brands.pptx"
  },
  { 
    id: "olympic-games", 
    name: "Olympic Games", 
    gradientFrom: "from-lime-500", 
    gradientTo: "to-green-600",
    pptPath: "/presentations/olympic-games.pptx"
  },
  { 
    id: "flags", 
    name: "Flags", 
    gradientFrom: "from-sky-500", 
    gradientTo: "to-blue-600",
    pptPath: "/presentations/flags.pptx"
  },
  { 
    id: "freedom-fighters", 
    name: "Freedom Fighters", 
    gradientFrom: "from-stone-500", 
    gradientTo: "to-zinc-700",
    pptPath: "/presentations/freedom-fighters.pptx"
  },
  { 
    id: "indian-monuments", 
    name: "Indian Monuments", 
    gradientFrom: "from-teal-600", 
    gradientTo: "to-cyan-700",
    pptPath: "/presentations/indian-monuments.pptx"
  },
  { 
    id: "dc", 
    name: "DC", 
    gradientFrom: "from-purple-600", 
    gradientTo: "to-fuchsia-700",
    pptPath: "/presentations/dc.pptx"
  },
  { 
    id: "football-teams", 
    name: "Football Teams", 
    gradientFrom: "from-green-600", 
    gradientTo: "to-emerald-700",
    pptPath: "/presentations/football-teams.pptx"
  },
  { 
    id: "animals-birds", 
    name: "Animals Birds", 
    gradientFrom: "from-emerald-600", 
    gradientTo: "to-teal-700",
    pptPath: "/presentations/animals-birds.pptx"
  },
  { 
    id: "flowers", 
    name: "Flowers", 
    gradientFrom: "from-fuchsia-600", 
    gradientTo: "to-purple-700",
    pptPath: "/presentations/flowers.pptx"
  },
  { 
    id: "apps", 
    name: "Apps", 
    gradientFrom: "from-cyan-600", 
    gradientTo: "to-teal-700",
    pptPath: "/presentations/apps.pptx"
  },
  { 
    id: "f1-driver", 
    name: "F1", 
    gradientFrom: "from-red-600", 
    gradientTo: "to-orange-600",
    pptPath: "/presentations/f1-driver.pptx"
  },
  { 
    id: "company-logos", 
    name: "Company (Logos)", 
    gradientFrom: "from-zinc-600", 
    gradientTo: "to-gray-900",
    pptPath: "/presentations/company-logos.pptx"
  },
  { 
    id: "cars", 
    name: "Cars", 
    gradientFrom: "from-slate-700", 
    gradientTo: "to-gray-900",
    pptPath: "/presentations/cars.pptx"
  },
];

export const getCategoryById = (id: string) => categories.find((c) => c.id === id);
