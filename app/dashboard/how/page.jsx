import Link from "next/link";

export default function HowItWorksPage() {
  const steps = [
    {
      title: "Create an interview",
      desc: "Pick a role, experience level, and topics to generate tailored questions.",
    },
    {
      title: "Record answers",
      desc: "Use your webcam and mic or type answers; keep responses concise and clear.",
    },
    {
      title: "Get AI feedback",
      desc: "Receive a rating and specific suggestions to improve your responses.",
    },
    {
      title: "Review & iterate",
      desc: "Revisit weaker answers, practice again, and track progress over time.",
    },
  ];

  return (
    <div className="p-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">How it Works</h1>
        <Link href="/dashboard" className="text-indigo-700 hover:underline">
          Back to Dashboard
        </Link>
      </div>

      <p className="text-gray-600 mb-8">
        Follow these steps to prepare efficiently and get actionable feedback.
      </p>

      <ol className="space-y-4">
        {steps.map((s, i) => (
          <li
            key={s.title}
            className="border rounded-xl shadow-sm p-6 bg-white"
          >
            <div className="flex items-start gap-4">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-400 text-white font-bold">
                {i + 1}
              </span>
              <div>
                <h2 className="text-lg font-semibold">{s.title}</h2>
                <p className="text-sm text-gray-700 mt-1">{s.desc}</p>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
