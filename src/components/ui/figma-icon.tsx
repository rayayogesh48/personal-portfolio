const icons = {
  headerHome: ["223ce.svg", 16],
  external: ["b8298.svg", 20],
  download: ["e699b.svg", 20],
  previous: ["51e2f.svg", 10],
  next: ["9a9b7.svg", 10],
  project: ["00fc9.svg", 14],
  caseStudyLink: ["3906a.svg", 14],
  chevron: ["b1be6.svg", 16],
  location: ["50ce6.svg", 14],
  email: ["139f8.svg", 16],
  linkedin: ["f260c.svg", 16],
  home: ["296fd.svg", 18],
  work: ["72087.svg", 18],
  about: ["9bf09.svg", 18],
  craft: ["aa9f1.svg", 18],
  contact: ["14c97.svg", 18],
  settings: ["6a19f.svg", 18],
} as const;

// The exported SVGs retain their original root dimensions and remain external assets.
export function FigmaIcon({
  name,
  className = "",
}: {
  name: keyof typeof icons;
  className?: string;
}) {
  const [file, size] = icons[name];
  return (
    <img
      src={`/images/figma/${file}`}
      alt=""
      aria-hidden="true"
      width={size}
      height={size}
      className={`figma-icon ${className}`}
      data-figma-icon={name}
    />
  );
}
