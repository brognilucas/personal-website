import type { InferGetStaticPropsType } from "next";
import Link from "next/link";
import useSWR from "swr";
import Container from "../../components/container";
import distanceToNow from "../../lib/dateRelative";
import { getAllPosts } from "../../lib/getPost";
import { ArrowUpRight } from "lucide-react";

const fetcher = () => getAllPosts();

const REFRESH_TIME = 60000

export default function AllPostsBlog({
  allPosts: initialPosts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { data: allPosts = initialPosts } = useSWR('posts', fetcher, {
    refreshInterval: REFRESH_TIME,
    fallbackData: initialPosts,
  });

  return (
    <div className="pt-28 pb-20">
      <Container>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">All Posts</h1>
        <p className="text-gray-500 mb-10">Thoughts on engineering, leadership, and building software.</p>

        {allPosts.length ? (
          <div className="space-y-4">
            {allPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/posts/${post.id}`}
                className="group block p-5 rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h2 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-1">
                      {post.title}
                    </h2>
                    <p className="text-sm text-gray-500 line-clamp-2 mb-2">{post.description}</p>
                    <div className="flex items-center gap-3 text-xs text-gray-400">
                      <time>{distanceToNow(new Date(post.published_at))}</time>
                      {post.reading_time_minutes && (
                        <span>{post.reading_time_minutes} min read</span>
                      )}
                    </div>
                  </div>
                  <ArrowUpRight
                    size={18}
                    className="text-gray-300 group-hover:text-blue-600 transition-colors mt-1 flex-shrink-0"
                  />
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No blog posted yet :/</p>
        )}
      </Container>
    </div>
  );
}

AllPostsBlog.displayName = 'Blog'

export async function getStaticProps() {
  const allPosts = await getAllPosts();

  return {
    props: { allPosts },
    revalidate: 60
  };
}
