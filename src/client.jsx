// Client entry: hydrates the server-rendered page so stock Astryx
// interactivity works — AppShell's mobile navigation drawer below the md
// breakpoint, focus trapping, and return focus. No custom behavior and no
// custom styling here; it re-renders the exact tree the server produced,
// using the page data embedded in the document.
import { hydrateRoot } from "react-dom/client";
import { PageBody } from "./_includes/layouts/base.11ty.jsx";

const el = document.getElementById("page-data");
if (el) {
  const data = JSON.parse(el.textContent);
  hydrateRoot(document.body, <PageBody {...data} />);
}
