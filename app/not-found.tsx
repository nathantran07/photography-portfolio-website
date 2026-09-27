import type { JSX } from "react";
import Link from "next/link";
import { ArrowIcon } from "@/components/icons";

export default function NotFound(): JSX.Element {
  return <main id="main" className="shell not-found"><span className="eyebrow">404 / Outside the frame</span><h1 className="display">Nothing here.<br /><em>More to see.</em></h1><p>This page may have moved, or the link may be incomplete.</p><Link className="text-link" href="/#work">Back to work <ArrowIcon /></Link></main>;
}
