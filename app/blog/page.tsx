import Link from "next/link";
import { listPosts } from "./posts";
import { MDXRemote } from "next-mdx-remote/rsc";

export const metadata = {
  title: "Blog",
};

export default async function Page() {
  const posts = await listPosts();
  return (
    <>
      <h1 className="mt-0">Blog</h1>
      {posts.map((p) => (
        <article key={p.data.slug} className="border mb-8">
          <div className="flex justify-between border-b border-slate-100 p-4">
            <div>
              <Link href={`/blog/posts/${p.data.slug}`}>
                <h3 className=" border-0 p-0 mb-0">{p.data.title}</h3>
              </Link>
            </div>
            <div>
              <time
                className="whitespace-nowrap"
                dateTime={p.data.date?.toISOString()}
              >
                {p.data.date?.toISOString()}
              </time>
            </div>
          </div>
          <div className="p-4">
            {p.data.excerpt ? (
              <MDXRemote source={p.data.excerpt} />
            ) : (
              <p>
                <em>No excerpt</em>
              </p>
            )}
            <Link
              className="inline-block py-2 px-4 bg-blue-600 text-slate-100"
              href={`/blog/posts/${p.data.slug}`}
            >
              Read
            </Link>
          </div>
        </article>
      ))}
    </>
  );
}
