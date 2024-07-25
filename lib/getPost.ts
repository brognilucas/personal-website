export async function getAllPosts() {
  const posts = await fetch("https://dev.to/api/articles/?username=lucasbrogni1").then((res) => res.json());
  return posts
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
}


export async function getPostById(id: number): Promise<DevToArticle> { 
  const post = await fetch(`https://dev.to/api/articles/${id}`).then((res) => res.json());
  console.log({ post })
  return post;
}


interface DevToArticle {
  type_of: string;
  id: number;
  title: string;
  description: string;
  readable_publish_date: string;
  slug: string;
  path: string;
  url: string;
  comments_count: number;
  public_reactions_count: number;
  collection_id: number | null;
  published_timestamp: string;
  positive_reactions_count: number;
  cover_image: string | null;
  social_image: string;
  canonical_url: string;
  created_at: string;
  edited_at: string | null;
  crossposted_at: string | null;
  published_at: string;
  last_comment_at: string;
  reading_time_minutes: number;
  tag_list: string;
  tags: string[];
  body_html: string;
  user: {
      name: string;
      username: string;
      twitter_username: string | null;
      github_username: string;
      user_id: number;
      website_url: string | null;
      profile_image: string;
      profile_image_90: string;
  };
}