export default function PostTitle({ title, date }) {
  return (
    <>
      <h1 className="mb-0">{title}</h1>
      <div className="border border-slate-100 p-2 mb-8">
        <time>{date}</time>
      </div>
    </>
  );
}
