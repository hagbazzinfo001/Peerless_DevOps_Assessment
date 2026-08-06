type HeroProps = {
    title: string;
    purpose: string;
  };
  
  export default function Hero({ title, purpose }: HeroProps) {
    return (
      <section className="rounded-3xl bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 p-10 text-white shadow-xl">
        <span className="rounded-full bg-white/20 px-4 py-2 text-sm">
          🚀 DevOps Engineering Showcase
        </span>
  
        <h1 className="mt-6 text-5xl font-bold">
          {title}
        </h1>
  
        <p className="mt-6 max-w-3xl text-lg text-blue-100">
          {purpose}
        </p>
  
        <div className="mt-10 flex gap-4 flex-wrap">
          <span className="rounded-lg bg-white/20 px-4 py-2">
            Docker
          </span>
  
          <span className="rounded-lg bg-white/20 px-4 py-2">
            GitHub Actions
          </span>
  
          <span className="rounded-lg bg-white/20 px-4 py-2">
            AWS EC2
          </span>
  
          <span className="rounded-lg bg-white/20 px-4 py-2">
            React
          </span>
  
          <span className="rounded-lg bg-white/20 px-4 py-2">
            Node.js
          </span>
        </div>
  
        <div className="mt-10 border-t border-white/30 pt-6">
          <p className="text-lg">
            Built by <strong>Agbabiaka Hammed Owolabi</strong>
          </p>
  
          <p className="text-sm text-blue-200">
            DevOps Engineer Candidate
          </p>
        </div>
      </section>
    );
  }