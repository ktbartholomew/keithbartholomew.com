import { MDXRemote } from "next-mdx-remote/rsc";
import PostTitle from "../../../../components/post-title";
import { getPost, listPosts } from "../../posts";
import { Metadata } from "next";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import rehypePrism from "@mapbox/rehype-prism";

export default async function Post(props: { params: { post: string } }) {
  const post = await getPost(props.params.post);

  return (
    <>
      <article>
        <PostTitle
          title={post.data.title}
          date={post.data.date.toISOString()}
        />
        <MDXRemote source={post.content} options={{mdxOptions: {rehypePlugins: [rehypePrism]}}} />
      </article>
    </>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const post = await getPost(params.post);

  return {
    title: post.data.title,
    description: post.data.excerpt,
  };
}

export async function generateStaticParams(): Promise<{ post: string }[]> {
  const params: { post: string }[] = [];

  const posts = await listPosts();
  posts.forEach((p) => {
    params.push({ post: p.data.slug });
  });

  return params;
}
