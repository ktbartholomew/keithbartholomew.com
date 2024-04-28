import Link from "next/link";
import { listPosts } from "./blog/posts";
import { MDXRemote } from "next-mdx-remote/rsc";

export const metadata = {
  title: "Keith Bartholomew",
};

export default async function Page() {
  const posts = (await listPosts()).filter((p, idx) => {
    if (idx <= 2) {
      return p;
    }
    return null;
  });

  return (
    <>
      <h1>Keith Bartholomew</h1>
      <img
        src={
          "https://secure.gravatar.com/avatar/b52cebf584041044d87df10ea9afdf7f5aa09c4ff66182d4bcbca25f507414c7?s=512"
        }
        alt="profile picture of Keith Bartholomew"
        width="512"
        height="512"
        className="block align-center w-[256px] h-[256px] mb-8"
      />
      <p>
        Hey there! I’m Keith, a software engineer from Dallas, Texas. I’ve been
        building websites and distributed cloud systems for over 10 years. My
        experience has taken me everywhere from building boutique agency
        websites to massive enterprise systems.
      </p>
      <p>
        Professionally, I’m very interested in developer experience. I’ve seen
        firsthand the difference good tools can make in a developer’s life, so
        building those tools has been a big part of my work.
      </p>
      <p>
        I’m an avid racing cyclist, and I enjoy cycling and cooking whenever I’m
        not at work.
      </p>

      {posts.map((p) => (
        <article key={p.data.slug} className="border mb-8">
          <div className="md:flex justify-between border-b border-slate-100 p-4">
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
