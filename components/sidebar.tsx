import classes from "./sidebar.module.css";

export function Sidebar() {
  return (
    <div
      className={`bg-slate-900 border-r border-white ${classes.sidebar}`}
      id="sidebar"
    >
      <h2 className={classes.title}>
        <a href="/" className="text-slate-100">
          Keith Bartholomew
        </a>
      </h2>
      <nav>
        <a className={classes.link} href="/resume">
          Resume
        </a>
        <a className={classes.link} href="/blog">
          Blog
        </a>
      </nav>
    </div>
  );
}
