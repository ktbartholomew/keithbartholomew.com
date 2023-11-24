import Link from "next/link";

export default function PostLayout(props) {
  return (
    <>
      <Link
        className="inline-block py-2 px-4 mb-8 bg-blue-600 text-slate-100"
        href="/blog"
      >
        &larr; All Posts
      </Link>
      <article>{props.children}</article>
    </>
  );
}
