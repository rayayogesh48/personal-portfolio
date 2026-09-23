export interface AboutData {
  name: string;
  role: string;
  headline: string;
  intro: string;
  approach: string;
  email: string;
  socials: {
    github?: string;
    twitter?: string;
    linkedin?: string;
  };
}

export const aboutData: AboutData = {
  name: "Yogesh Raya",
  role: "Product Designer",
  headline: "Product designer focused on making complex tasks feel simple.",
  intro:
    "I’m Yogesh, a product designer based in Nepal. I turn user problems into clear flows and thoughtful interfaces for digital products.",
  approach:
    "I care about the decisions behind the screen: what people need to do, where they get stuck, and how a design can help them move forward. My work focuses on understanding the problem, exploring practical solutions, and making the next step clear.",
  email: "yogesh@example.com",
  socials: {
    linkedin: "https://www.linkedin.com/in/yogeshraya01/",
    github: "https://github.com",
    twitter: "https://x.com",
  },
};
