import type { InferGetStaticPropsType } from "next";
import Link from "next/link";
import Container from "../../components/container";
import distanceToNow from "../../lib/dateRelative";
import { getAllPosts } from "../../lib/getPost";

export default function NotePage({
  allPosts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Container>
      {allPosts.length ? (
        allPosts.map((post) => (
          <article key={post.slug} className="mb-10">
            <Link
              as={`/posts/${post.id}`}
              href="/posts/[id]"
              className="text-lg leading-6 font-bold"
            >
              {post.title}
            </Link>
            <p>{post.description}</p>
            <div className="text-gray-400">
              <time>{distanceToNow(new Date())}</time>
            </div>
          </article>
        ))
      ) : (
        <p>No blog posted yet :/</p>
      )}
    </Container>
  );
}

export async function getStaticProps() {
  const allPosts = await getAllPosts();

  return {
    props: { allPosts },
  };
}
