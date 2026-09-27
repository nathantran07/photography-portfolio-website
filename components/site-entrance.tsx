import type { JSX } from "react";

export function SiteEntrance(): JSX.Element {
  return <div className="site-entrance" aria-hidden="true">
    <div className="site-entrance-mark">
      <span className="site-entrance-name">Nathan Tran<span>.</span></span>
      <span className="site-entrance-line" />
      <span className="site-entrance-caption">Photography &amp; film</span>
    </div>
  </div>;
}
