type Props = {
    title: string;
    value: string;
  };
  
  export default function StatusCard({
    title,
    value,
  }: Props) {
    return (
      <div className="rounded-xl border bg-white p-6 shadow">
        <p className="text-gray-500">
          {title}
        </p>
  
        <h2 className="mt-3 text-2xl font-bold">
          {value}
        </h2>
      </div>
    );
  }