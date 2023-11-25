import Link from "next/link";
import React from "react";

export default function PostLayout(props: { children: React.ReactNode }) {
  return (
    <>
      {props.children}
      <Link
        className="inline-block py-2 px-4 mt-8 bg-blue-600 text-slate-100"
        href="/blog"
      >
        &larr; All Posts
      </Link>
    </>
  );
}
