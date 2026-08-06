type Props = {
  services: string[];
};

export default function Services({
  services,
}: Props) {
  return (
    <section className="rounded-2xl bg-white p-8 shadow-lg">
      <h2 className="mb-8 text-3xl font-bold">
        Products & Services
      </h2>

      <div className="grid gap-5 md:grid-cols-2">
        {services.map((service) => (
          <div
            key={service}
            className="rounded-xl border bg-gray-50 p-5 transition hover:shadow-lg"
          >
            <h3 className="font-semibold">
              ✅ {service}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
}