import type { GetStaticPaths, InferGetStaticPropsType } from "next";
import { useRouter } from "next/router";
import Link from "next/link";
import ErrorPage from "next/error";
import useSWR from "swr";
import Container from "../../components/container";
import distanceToNow from "../../lib/dateRelative";
import { getAllPosts, getPostById } from "../../lib/getPost";
import Head from "next/head";
import { ArrowLeft } from "lucide-react";

const fetcher = (id: string) => getPostById(Number(id));
const REFRESH_TIME = 60000;

export default function PostPage({
  post: initialPost,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();
  const { id } = router.query;

  const { data: post = initialPost } = useSWR(
    id ? `post-${id}` : null,
    () => fetcher(String(id)),
    {
      refreshInterval: REFRESH_TIME,
      fallbackData: initialPost,
    }
  );

  if (!router.isFallback && !post?.id) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <div className="pt-28 pb-20">
      <Container>
        <Head>
          <title>{post.title} | Lucas Brogni</title>
        </Head>

        {router.isFallback ? (
          <div>Loading...</div>
        ) : (
          <article>
            <Link
              href="/posts"
              className="inline-flex items-center text-sm text-gray-400 hover:text-gray-900 transition-colors mb-8"
            >
              <ArrowLeft size={14} className="mr-1" />
              Back to all posts
            </Link>

            <header className="mb-10">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-3">
                {post.title}
              </h1>
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <time>{distanceToNow(new Date(post.published_at))}</time>
                {post.reading_time_minutes && (
                  <span>{post.reading_time_minutes} min read</span>
                )}
              </div>
            </header>

            <div
              className="prose prose-gray max-w-none"
              dangerouslySetInnerHTML={{ __html: post.body_html }}
            />
          </article>
        )}
      </Container>
    </div>
  );
}

PostPage.displayName = 'Post';

type Params = {
  params: {
    id: number;
  };
};

export async function getStaticProps({ params }: Params) {
  const post = await getPostById(params.id);

  return {
    props: {
      post,
    },
    revalidate: 60
  };
}

export async function getStaticPaths() {
  const posts = await getAllPosts();
  const paths = posts.map((post) => ({
    params: { id: String(post.id) },
  }))

  return {
    paths: paths,
    fallback: 'blocking',
  };
}
