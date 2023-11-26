export default function PostTitle({
  title,
  date,
}: {
  title: string;
  date: string;
}) {
  return (
    <>
      <h1 className="mb-0">{title}</h1>
      <div className="border border-slate-100 p-2 mb-8">
        <time dateTime={date}>{date}</time>
      </div>
    </>
  );
}
