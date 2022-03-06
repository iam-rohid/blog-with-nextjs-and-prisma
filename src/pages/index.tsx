import { GetStaticProps } from "next";
import { FC } from "react";
import ArticleCard from "../components/ArticleCard";
import Container from "../components/Container";
import { Feed } from "../types/Feed";

type Props = {
  feed: Feed;
};

const HomePage: FC<Props> = ({ feed: { sections } }) => {
  return (
    <main>
      <Container className="py-8 flex gap-8 flex-col">
        <div className="flex flex-row gap-8">
          <div className="flex-1 flex flex-col gap-8">
            {sections.map((section) => (
              <section key={section.id} id={section.id}>
                {section.title && (
                  <h4 className="text-2xl font-medium mb-4">{section.title}</h4>
                )}
                <div className="flex flex-col gap-4">
                  {section.articles.map((article) => (
                    <ArticleCard
                      title={article.title}
                      slug={article.slug}
                      publishedAt={article.createdAt}
                      excerpt={article.excerpt}
                      key={article.id}
                    />
                  ))}
                </div>
              </section>
            ))}
          </div>
          <div className="w-80 hidden lg:block">
            <div className="bg-white dark:bg-gray-800 p-4">sidebar</div>
          </div>
        </div>
      </Container>
    </main>
  );
};

export default HomePage;

export const getStaticProps: GetStaticProps<Props> = async () => {
  const feed = await (await fetch("http://localhost:3000/api/feeds")).json();

  return {
    props: {
      feed,
    },
  };
};
