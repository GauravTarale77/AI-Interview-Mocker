import Link from "next/link";
import {
  Bot,
  HelpCircle,
  MessageSquareMore,
  TrendingUp,
  Crown,
  Mail,
  ArrowRight,
} from "lucide-react";

export default function FeatureGrid() {
  const features = [
    {
      title: "AI Mock Interviews",
      desc: "Generate role‑specific questions and practice with realistic interview flow.",
      href: "/dashboard/interview/new",
      cta: "Start now",
      Icon: Bot,
    },
    {
      title: "Questions Library",
      desc: "Browse categories like Frontend, Backend, DSA, and System Design.",
      href: "/dashboard/questions",
      cta: "Explore",
      Icon: HelpCircle,
    },
    {
      title: "AI Feedback",
      desc: "Receive ratings and actionable suggestions after each answer.",
      href: "/dashboard",
      cta: "View feedback",
      Icon: MessageSquareMore,
    },
    {
      title: "Progress Tracking",
      desc: "Review previous interviews and track improvements over time.",
      href: "/dashboard",
      cta: "See history",
      Icon: TrendingUp,
    },
    {
      title: "Upgrade Plans",
      desc: "Unlock unlimited interviews and richer insights with Pro.",
      href: "/dashboard/upgrade",
      cta: "View plans",
      Icon: Crown,
    },
    {
      title: "Contact Support",
      desc: "Questions or issues? Reach out to get help quickly.",
      href: "/dashboard/contact",
      cta: "Contact",
      Icon: Mail,
    },
  ];

  return (
    <section className="px-6 py-12 md:px-10 lg:px-16">
      <div className="mx-auto max-w-5xl text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
          Ace interviews with AI practice and feedback
        </h1>
        <p className="mt-3 text-gray-600">
          Create tailored mock interviews, get instant feedback, and improve
          faster.
        </p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <Link
            href="/dashboard/interview/new"
            className="inline-flex items-center gap-2 rounded-md bg-indigo-600 px-5 py-2.5 text-white hover:bg-indigo-700"
            aria-label="Start a new interview"
          >
            Get Started
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 rounded-md border px-5 py-2.5 hover:bg-gray-50"
            aria-label="Go to dashboard"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>

      <div className="mx-auto mt-10 grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.map(({ title, desc, href, cta, Icon }) => (
          <div
            key={title}
            className="group rounded-xl border bg-white p-6 shadow-sm transition hover:shadow-md"
          >
            <div className="flex items-start gap-4">
              <div className="rounded-md bg-indigo-50 p-2">
                <Icon className="h-6 w-6 text-indigo-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">{title}</h3>
                <p className="mt-1 text-sm text-gray-600">{desc}</p>
              </div>
            </div>

            <div className="mt-5">
              <Link
                href={href}
                className="inline-flex items-center gap-2 text-indigo-700 hover:underline"
                aria-label={`${cta} - ${title}`}
              >
                {cta}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
