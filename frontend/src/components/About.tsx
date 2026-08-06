type Props = {
    name: string;
    summary: string;
    disclaimer: string;
  };
  
  export default function About({
    name,
    summary,
    disclaimer,
  }: Props) {
    return (
      <section className="rounded-2xl bg-white p-8 shadow-lg">
        <h2 className="text-3xl font-bold">
          About {name}
        </h2>
  
        <p className="mt-5 leading-8 text-gray-700">
          {summary}
        </p>
  
        <div className="mt-6 rounded-lg border-l-4 border-blue-600 bg-blue-50 p-4">
          <strong>Disclaimer</strong>
  
          <p className="mt-2 text-gray-600">
            {disclaimer}
          </p>
        </div>
      </section>
    );
  }