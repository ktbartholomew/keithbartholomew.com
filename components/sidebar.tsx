import Link from "next/link";
import classes from "./sidebar.module.css";

export function Sidebar() {
  return (
    <div className={`bg-slate-900 ${classes.sidebar}`} id="sidebar">
      <h2 className={`${classes.title} border-0 border-b`}>
        <Link href="/" className="text-slate-100">
          <img
            src={
              "https://secure.gravatar.com/avatar/b52cebf584041044d87df10ea9afdf7f5aa09c4ff66182d4bcbca25f507414c7?s=64"
            }
            alt="profile picture of Keith Bartholomew"
            width="32"
            height="32"
            className="inline-block w-[32px] h-[32px] align-middle mr-2 rounded-full"
          />
          Keith Bartholomew
        </Link>
      </h2>
      <nav>
        <Link href="/blog" className={classes.link}>
          Blog
        </Link>
        <Link href="/resume" className={classes.link}>
          Resume
        </Link>
        <Link target="_blank" rel="noopener noreferrer" href="https://github.com/ktbartholomew/keithbartholomew.com" className={classes.link}>
          GitHub
        </Link>
      </nav>
    </div>
  );
}
