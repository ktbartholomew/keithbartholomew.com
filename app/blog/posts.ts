import { readFile, readdir } from "fs/promises";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import { resolve } from "path";

export async function listPosts() {
  const files = await readdir("content/blog/posts", { recursive: true });
  const markdowns = files
    .filter((f) => f.endsWith(".md") || f.endsWith(".mdx"))
    .sort((a, b) => b.localeCompare(a));

  const posts: { content: string; data: { [key: string]: any } }[] = [];

  for (let m of markdowns) {
    let p = matter(await readFile(resolve("content/blog/posts", m)));
    p.data.filename = m;
    p.data.slug = m.replace(/\.mdx?$/, "");
    posts.push(p);
  }

  return posts;
}

export async function getPost(slug: string) {
  const files = await readdir("content/blog/posts", { recursive: true });
  const file = files.find(
    (f) => f.endsWith(`${slug}.md`) || f.endsWith(`${slug}.mdx`)
  );

  if (!file) {
    return notFound();
  }

  let p = matter(await readFile(resolve("content/blog/posts", file)));
  p.data.filename = file;
  p.data.slug = file.replace(/\.mdx?$/, "");

  return p;
}
