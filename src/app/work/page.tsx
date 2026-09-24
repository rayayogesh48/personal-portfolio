import { listPublishedWork } from "@/content/server";
import { WorkCollection } from "@/features/work/work-collection";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Product & Website Design Work",
  "Selected client projects and website designs, with a focus on clarity, usability, and visual craft.",
  "/work",
);
export default function Page() {
  return <WorkCollection publishedStudies={listPublishedWork()} />;
}
