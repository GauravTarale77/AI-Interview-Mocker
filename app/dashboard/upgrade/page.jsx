import Link from "next/link";

export default function UpgradePage() {
  const tiers = [
    {
      name: "Free",
      price: "₹0",
      features: ["Normal AI", "Basic feedback", "Email support"],
      cta: { label: "Current Plan", href: "/dashboard" },
    },
    {
      name: "Pro",
      price: "₹499/mo",
      features: [
        "Professional/Well trained AI",
        "Detailed AI feedback",
        "Priority support",
      ],
      cta: { label: "Upgrade to Pro", href: "/dashboard/contact" },
    },
    {
      name: "Team",
      price: "₹1,999/mo",
      features: ["Team workspaces", "Shared question bank", "SLA support"],
      cta: { label: "Contact Sales", href: "/dashboard/contact" },
    },
  ];

  return (
    <div className="p-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Upgrade</h1>
        <Link href="/dashboard" className="text-indigo-700 hover:underline">
          Back to Dashboard
        </Link>
      </div>

      <p className="text-gray-600 mb-8">
        Choose a plan to unlock more interviews and richer AI feedback.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {tiers.map((t) => (
          <div
            key={t.name}
            className="border rounded-xl shadow-sm p-6 bg-white"
          >
            <h2 className="text-xl font-bold">{t.name}</h2>
            <p className="text-3xl font-extrabold mt-2">{t.price}</p>
            <ul className="mt-4 space-y-2 text-sm text-gray-700">
              {t.features.map((f) => (
                <li key={f} className="flex items-center gap-2">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-gray-400" />
                  {f}
                </li>
              ))}
            </ul>
            <Link
              href={t.cta.href}
              className="mt-6 inline-block w-full text-center rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
            >
              {t.cta.label}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
