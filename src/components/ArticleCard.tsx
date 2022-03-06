import Image from "next/image";
import React, { FC, useMemo } from "react";
import moment from "moment";
import Link from "next/link";

const ArticleCard: FC<{
  title: string;
  excerpt: string;
  publishedAt: Date;
  slug: string;
}> = ({ title, excerpt, publishedAt, slug }) => {
  const blogLink = useMemo(() => `/articles/${slug}`, [slug]);

  return (
    <article className="bg-white dark:bg-gray-800 flex flex-col md:flex-row group relative overflow-hidden">
      <div className="flex-[2]">
        <div className="relative aspect-video md:aspect-auto w-full h-full overflow-hidden block">
          <Image
            src={`https://images.unsplash.com/photo-1640622307877-1e40352b9a48?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80`}
            layout="fill"
            objectFit="cover"
            className="group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>
      <div className="py-4 px-6 flex-[5]">
        <p className="text-sm">
          Published on <b>{moment(publishedAt).format("DD MMM YYYY")}</b>
        </p>
        <h3 className="text-2xl font-medium mb-2 line-clamp-2">{title}</h3>
        <p className="line-clamp-2 mb-2">{excerpt}</p>
        <div className="flex flex-wrap gap-2">
          <Link href={`/tags/react`}>
            <a className="px-4 py-1 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-sm z-10">
              React
            </a>
          </Link>
          <Link href={`/tags/next-js`}>
            <a className="px-4 py-1 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-sm z-10">
              Next.js
            </a>
          </Link>
        </div>
      </div>
      <Link href={blogLink}>
        <a className="absolute inset-0 w-full h-full"></a>
      </Link>
    </article>
  );
};

export default ArticleCard;
