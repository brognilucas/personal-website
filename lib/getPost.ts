import { DevToArticle } from "../interfaces";

export async function getAllPosts() {
  const devToUsername = 'lucasbrogni1'; 
  const posts = await fetch(`https://dev.to/api/articles?username=${devToUsername}`).then((res) => res.json());
  return posts
    .sort((post1, post2) => (post1.created_at > post2.created_at ? -1 : 1));
}


export async function getPostById(id: number): Promise<DevToArticle> { 
  const post = await fetch(`https://dev.to/api/articles/${id}`).then((res) => res.json());
  return post;
}

