import Link from "next/link";

export default function ContactPage() {
  const contacts = [
    {
      label: "Email",
      value: "gauravtarale67@gmail.com",
      href: "mailto:gauravtarale67@gmail.com",
    },
    { label: "Address", value: "Akot, Akola, Maharashtra, India" },
    {
      label: "GitHub",
      value: "github.com/GauravTarale77",
      href: "https://github.com/GauravTarale77",
    },
  ];

  return (
    <div className="p-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Contact</h1>
        <Link href="/dashboard" className="text-indigo-700 hover:underline">
          Back to Dashboard
        </Link>
      </div>

      <p className="text-gray-600 mb-6">
        Reach out anytime. Responses usually arrive within 24–48 hours.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border rounded-xl shadow-sm p-6 bg-white">
          <h2 className="text-lg font-semibold mb-4">Contact details</h2>
          <ul className="space-y-3 text-sm">
            {contacts.map((c) => (
              <li key={c.label} className="flex items-start gap-3">
                <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-indigo-600" />
                <div>
                  <div className="text-gray-500">{c.label}</div>
                  {c.href ? (
                    <a
                      href={c.href}
                      target={c.href.startsWith("http") ? "_blank" : undefined}
                      rel={c.href.startsWith("http") ? "noreferrer" : undefined}
                      className="text-gray-900 hover:text-indigo-700 break-all"
                    >
                      {c.value}
                    </a>
                  ) : (
                    <div className="text-gray-900 break-words">{c.value}</div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
