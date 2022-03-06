import { Article } from "@prisma/client";
import { GetStaticPaths, GetStaticProps } from "next";
import React, { FC } from "react";
import { prismaClient } from "../../lib/prismaClient";

type Props = {
  article: Article;
};

const ArticlePage: FC<Props> = ({ article }) => {
  return <div>{article.title}</div>;
};

export default ArticlePage;

export const getStaticPaths: GetStaticPaths = async () => {
  const articles = await prismaClient.article.findMany({
    where: {
      stage: "Published",
    },
  });

  const paths = articles.map((article) => ({
    params: {
      slug: article.slug,
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  let article = await prismaClient.article.findUnique({
    where: {
      slug: typeof params.slug === "string" ? params.slug : params.slug[0],
    },
  });

  article = JSON.parse(JSON.stringify(article));

  return {
    props: {
      article,
    },
  };
};
