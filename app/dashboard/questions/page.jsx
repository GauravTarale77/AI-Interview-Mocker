import Link from "next/link";

export default function QuestionsPage() {
  const categories = [
    { name: "Frontend", desc: "React, Next.js, CSS, performance" },
    { name: "Backend", desc: "Node.js, APIs, databases, auth" },
    { name: "Data Structures", desc: "Arrays, trees, graphs, DP" },
    { name: "System Design", desc: "Scalability, caching, queues" },
  ];

  return (
    <div className="p-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Questions</h1>
        <Link href="/dashboard" className="text-indigo-700 hover:underline">
          Back to Dashboard
        </Link>
      </div>

      <p className="text-gray-600 mb-6">
        Browse common categories and prepare question sets for mock interviews.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((c) => (
          <div
            key={c.name}
            className="border rounded-xl shadow-sm p-6 bg-white"
          >
            <h2 className="text-lg font-semibold">{c.name}</h2>
            <p className="text-sm text-gray-600 mt-1">{c.desc}</p>
            <div className="mt-4 flex gap-3"></div>
          </div>
        ))}
      </div>

      <div className="mt-8 border rounded-xl p-6 bg-white">
        <h3 className="text-lg font-semibold">Tips</h3>
        <ul className="mt-3 list-disc pl-5 text-sm text-gray-700 space-y-1">
          <li>Focus on clarity, structure, and trade-offs in answers.</li>
          <li>Practice aloud and time responses to 60–120 seconds.</li>
          <li>Review feedback and iterate on weak areas regularly.</li>
        </ul>
      </div>
    </div>
  );
}
