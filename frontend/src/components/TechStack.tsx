type Props = {
    technologies: string[];
  };
  
  export default function TechStack({
    technologies,
  }: Props) {
    return (
      <section className="rounded-2xl bg-white p-8 shadow-lg">
        <h2 className="mb-8 text-3xl font-bold">
          Technology Stack
        </h2>
  
        <div className="flex flex-wrap gap-4">
          {technologies.map((tech) => (
            <span
              key={tech}
              className="rounded-full bg-blue-100 px-5 py-3 font-medium text-blue-800"
            >
              {tech}
            </span>
          ))}
        </div>
      </section>
    );
  }