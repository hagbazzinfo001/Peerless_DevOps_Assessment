export default function Deployment() {
    const items = [
      "Docker",
      "Docker Compose",
      "GitHub Actions",
      "GitHub Container Registry",
      "AWS EC2",
      "Linux",
    ];
  
    return (
      <section className="rounded-2xl bg-white p-8 shadow-lg">
        <h2 className="mb-8 text-3xl font-bold">
          Deployment Pipeline
        </h2>
  
        <div className="grid gap-4 md:grid-cols-3">
          {items.map((item) => (
            <div
              key={item}
              className="rounded-lg border p-4 text-center"
            >
              {item}
            </div>
          ))}
        </div>
      </section>
    );
  }