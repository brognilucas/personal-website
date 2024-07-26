import type { GetStaticPaths, InferGetStaticPropsType } from "next";
import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Container from "../../components/container";
import distanceToNow from "../../lib/dateRelative";
import { getAllPosts, getPostById } from "../../lib/getPost";
import Head from "next/head";

export default function PostPage({
  post,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();

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
                {distanceToNow(new Date(post.created_at))}
              </time>
            </header>

            <div
              className="prose mt-10"
              dangerouslySetInnerHTML={{ __html: post.content }}
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
  const content = post.body_html;

  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  };
}
 
export async function getStaticPaths() {
  const posts = await getAllPosts();

  return {
    paths: posts.map(({ id }) => {
      return {
        params: {
          id: id.toString(),
        },
      };
    }),
    fallback: false,
  };
}
