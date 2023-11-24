import Link from "next/link";
import classes from "./sidebar.module.css";

export function Sidebar() {
  return (
    <div className={`bg-slate-900 ${classes.sidebar}`} id="sidebar">
      <h2 className={`${classes.title} border-0 border-b`}>
        <Link href="/" className="text-slate-100">
          Keith Bartholomew
        </Link>
      </h2>
      <nav>
        <Link href="/resume" className={classes.link}>
          Resume
        </Link>
        <Link href="/blog" className={classes.link}>
          Blog
        </Link>
      </nav>
    </div>
  );
}
