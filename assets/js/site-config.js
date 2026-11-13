/**
 * ATIF RECOMMENDS — V2 CONFIGURATION & BOOK REPOSITORY
 * 
 * Brand: Atif Recommends
 * Curator: Atif Khan
 * Portfolio URL: https://atif-web-mu.vercel.app/
 */

const ATIF_CONFIG = {
  brand: "Atif Recommends",
  curator: "Atif Khan",
  handle: "@atifrecommends",
  headline: "The Personal Curation",
  subline: "Exploring the intersections of cinematic structure, human psychology, and the art of storytelling.",
  
  // Exact Portfolio URL specified by Atif Khan
  portfolioUrl: "https://atif-web-mu.vercel.app/",
  
  instagramUrl: "https://instagram.com/atifrecommends",
  githubUrl: "https://github.com/ATIFIXATION",
  email: "atif64896@gmail.com",

  // 9 Curated Works from Existing Repository
  books: [
    {
      id: "the-art-of-storytelling",
      title: "The Art of Storytelling",
      author: "Atif Khan",
      category: "Cinema & Craft",
      url: "storytelling-notes.html",
      spineClass: "spine-storytelling",
      accent: "#2D4C3A",
      bgCover: "#234233",
      note: "Foreshadowing, conflict, premise, character, plot, and environment — the foundational grammar of stories.",
      quote: "Conflict is the heartbeat of narrative. Without resistance, character remains an unverified hypothesis.",
      tags: ["Narrative", "Character", "Conflict"],
      featuredArtwork: "assets/art-storytelling.svg"
    },
    {
      id: "crime-and-punishment",
      title: "Crime and Punishment",
      author: "Fyodor Dostoevsky",
      category: "Classics",
      url: "crime_and_punishment.html",
      spineClass: "spine-crime",
      accent: "#B32626",
      bgCover: "#1E1A1A",
      note: "A deep dive into guilt, redemption, and the fracturing human psyche in 19th-century Saint Petersburg.",
      quote: "Pain and suffering are always inevitable for a large intelligence and a deep heart.",
      tags: ["Psychology", "Russian Noir", "Redemption"],
      featuredArtwork: "assets/art-dostoevsky.svg"
    },
    {
      id: "the-alchemist",
      title: "The Alchemist",
      author: "Paulo Coelho",
      category: "Philosophy",
      url: "the_alchemist.html",
      spineClass: "spine-alchemist",
      accent: "#E0A436",
      bgCover: "#422810",
      note: "Tracking the journey from shepherd to destiny across Andalusia and the Sahara. Maktub — it is written.",
      quote: "When you want something, all the universe conspires in helping you to achieve it.",
      tags: ["Philosophy", "Destiny", "Sahara"],
      featuredArtwork: "assets/art-alchemist.svg"
    },
    {
      id: "animal-farm",
      title: "Animal Farm",
      author: "George Orwell",
      category: "Classics",
      url: "animal_farm/animal_farm.html",
      spineClass: "spine-animalfarm",
      accent: "#C82D30",
      bgCover: "#2B3339",
      note: "A blistering political fable exposing how revolutionary ideals curdle into tyrannical dogma.",
      quote: "All animals are equal, but some animals are more equal than others.",
      tags: ["Allegory", "Political Satire", "Orwell"],
      featuredArtwork: "animal_farm/animal-farm.jpg"
    },
    {
      id: "never-split-the-difference",
      title: "Never Split the Difference",
      author: "Chris Voss",
      category: "Psychology",
      url: "never-split.html",
      spineClass: "spine-neversplit",
      accent: "#E8572A",
      bgCover: "#191614",
      note: "High-stakes FBI hostage negotiation principles distilled for real-world communication and emotional intelligence.",
      quote: "Negotiation is not an act of battle; it's a process of discovery.",
      tags: ["Tactical Empathy", "Negotiation", "Behavior"],
      featuredArtwork: "assets/art-neversplit.svg"
    },
    {
      id: "the-canterville-ghost",
      title: "The Canterville Ghost",
      author: "Oscar Wilde",
      category: "Classics",
      url: "canterville-ghost.html",
      spineClass: "spine-canterville",
      accent: "#DE9DA6",
      bgCover: "#381E26",
      note: "When modern pragmatism meets an ancient ancestral haunt — Oscar Wilde's masterclass in wit and pathos.",
      quote: "Death must be so beautiful. To lie in the soft brown earth, with the grasses waving above one's head...",
      tags: ["Gothic Comedy", "Victorian Satire", "Oscar Wilde"],
      featuredArtwork: "assets/art-wilde.svg"
    },
    {
      id: "many-lives-many-masters",
      title: "Many Lives, Many Masters",
      author: "Dr. Brian L. Weiss",
      category: "Philosophy",
      url: "souls_never_die.html",
      spineClass: "spine-souls",
      accent: "#25467A",
      bgCover: "#171D2B",
      note: "A traditional psychiatrist's clinical breakthrough into past-life regression therapy and soul memory.",
      quote: "We are not human beings having a spiritual experience. We are spiritual beings having a human experience.",
      tags: ["Consciousness", "Soul Journey", "Spiritual"],
      featuredArtwork: "assets/art-souls.svg"
    },
    {
      id: "ohh-yes-i-am-single",
      title: "Ohh Yes I Am Single",
      author: "Durjoy Datta & Neeti Rustagi",
      category: "Contemporary",
      url: "single.html",
      spineClass: "spine-single",
      accent: "#D32F2F",
      bgCover: "#FAF8F5",
      note: "A story that hurts a little and jokes about it anyway. You don't miss them; you miss who you were with them.",
      quote: "Not every story ends. Some just... stop. And maybe that's where yours begins.",
      tags: ["Modern Romance", "Monologue", "Youth"],
      featuredArtwork: "assets/art-single.svg"
    },
    {
      id: "cinematic-notes",
      title: "Cinematic Notes",
      author: "Atif Khan",
      category: "Cinema & Craft",
      url: "screenplay-notes.html",
      spineClass: "spine-cinematic",
      accent: "#171513",
      bgCover: "#EBE7DF",
      note: "Deconstructing setup & payoff, Chekhov's gun, dramatic irony, and the engineering of unforgettable scenes.",
      quote: "Start late. Leave early. The scene exists only to advance conflict or reveal character.",
      tags: ["Screenwriting", "Structure", "Cinema"],
      featuredArtwork: "assets/art-cinema.svg"
    }
  ]
};

if (typeof window !== "undefined") {
  window.ATIF_CONFIG = ATIF_CONFIG;
}
