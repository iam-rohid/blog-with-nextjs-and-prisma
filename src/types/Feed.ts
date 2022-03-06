export type Feed = {
  sections: Section[];
};

export type Section = ListSection;

export type ListSection = {
  id: string;
  type: "list";
  title: string;
  articles: Article[];
};

export type Article = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  updatedAt: Date;
  createdAt: Date;
};
