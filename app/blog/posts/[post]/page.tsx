import { readFile } from "fs/promises";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc";
import PostTitle from "../../../../components/post-title";

async function getMarkdown(
  slug: string
): Promise<{ content: string; data: { [key: string]: any } }> {
  const file = await readFile(
    `${process.cwd()}/content/blog/posts/${slug}.mdx`
  );

  return matter(file);
}

export default async function Post(props: { params: { post: string } }) {
  const md = await getMarkdown(props.params.post);

  return (
    <>
      <article>
        <PostTitle title={md.data.title} date={md.data.date.toISOString()} />
        <MDXRemote source={md.content} />
      </article>
    </>
  );
}
