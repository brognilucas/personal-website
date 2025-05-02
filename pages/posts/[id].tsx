import type { GetStaticPaths, InferGetStaticPropsType } from "next";
import { useRouter } from "next/router";
import ErrorPage from "next/error";
import useSWR from "swr";
import Container from "../../components/container";
import distanceToNow from "../../lib/dateRelative";
import { getAllPosts, getPostById } from "../../lib/getPost";
import Head from "next/head";

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
    <Container>
      <Head>
        <title>{post.title} | Lucas Brogni</title>
      </Head>

      {router.isFallback ? (
        <div>Loading…</div>
      ) : (
        <div>
          <article>
            <header>
              <h1 className="text-4xl font-bold">{post.title}</h1>
              <time className="flex mt-2 text-gray-400">
                {distanceToNow(new Date(post.published_at))}
              </time>
            </header>

            <div
              className="prose mt-10"
              dangerouslySetInnerHTML={{ __html: post.body_html }}
            />
          </article>
        </div>
      )}
    </Container>
  );
}

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
