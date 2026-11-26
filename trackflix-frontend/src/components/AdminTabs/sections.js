import {
  Film,
  Clapperboard,
  Trophy,
  Heart,
  Tv,
  MonitorPlay,
  Star,
  CalendarCheck,
  Sparkles,
  Users,

  ChartColumn,
} from "lucide-react";

// Sidebar structure for the admin dashboard.
// `key` values are the same tab keys AdminPage already switches on.
// `countKey` points at the list that useAdminData already returns.
export const ADMIN_GROUPS = [
  {
    title: "Movies",
    items: [
      { key: "fullmovies", label: "Full movies", icon: Film, countKey: "fullMovies" },
      { key: "fullmoviedetails", label: "Movie details", icon: Clapperboard, countKey: "fullMovieDetails" },
      { key: "toptenmovies", label: "Top ten", icon: Trophy, countKey: "topTenMovies" },
      { key: "fanfavourites", label: "Fan favourites", icon: Heart, countKey: "fanFavourites" },
    ],
  },
  {
    title: "TV shows",
    items: [
      { key: "livetvshows", label: "TV shows", icon: Tv, countKey: "liveTVShows" },
      { key: "livetvdetails", label: "TV show details", icon: MonitorPlay, countKey: "liveTVDetails" },
    ],
  },
  {
    title: "Home page",
    items: [
      { key: "featureditems", label: "Featured items", icon: Star, countKey: "featuredItems" },
      { key: "ftrecommendations", label: "Featured today", icon: CalendarCheck, countKey: "ftRecommendations" },
      { key: "interests", label: "Interests", icon: Sparkles, countKey: "interests" },
    ],
  },
  {
    title: "People",
    items: [
      { key: "celebrities", label: "Celebrities", icon: Star, countKey: "celebrities" },
      { key: "morecelebrity", label: "Celebrity picks", icon: Sparkles, countKey: "moreCelebrities" },
      { key: "users", label: "Users", icon: Users, countKey: "users" },
      { key: "loginstats", label: "Login stats", icon: ChartColumn },
    ],
  },
];

export const ADMIN_ITEMS = ADMIN_GROUPS.flatMap((g) => g.items);

export const SECTION_HINTS = {
  celebrities: "Celebrity profiles shown across the site.",
  fanfavourites: "Titles fans rate highest.",
  fullmoviedetails: "Cast, runtime, ratings and everything on a movie page.",
  fullmovies: "The movie catalogue.",
  livetvdetails: "Seasons, episodes and networks for each TV show.",
  livetvshows: "The TV show catalogue.",
  featureditems: "Items pinned to the home page.",
  ftrecommendations: "The “Featured today” row.",
  interests: "Popular interest cards.",
  toptenmovies: "The Top 10 ranking.",
  morecelebrity: "Celebrities in the recommendations page.",
  users: "Everyone who has signed up.",
  loginstats: "Sign-in activity.",
};

