// import StatusCard from "./StatusCards";
// import { useSystemStatus } from "../hooks/useSystemStatus";

// export default function SystemStatus() {
//   const { health, version } = useSystemStatus();

//   if (!health || !version) return null;

//   return (
//     <section className="card">
//       <h2>📊 Live System Status</h2>

//       <div className="status-grid">
//         <StatusCard
//           title="API Health"
//           value={health.status}
//         />

//         <StatusCard
//           title="Environment"
//           value={health.environment}
//         />

//         <StatusCard
//           title="Version"
//           value={health.version}
//         />

//         <StatusCard
//           title="Uptime"
//           value={`${Math.floor(parseInt(health.uptime) / 60)} min`}
//         />

//         <StatusCard
//           title="Last Updated"
//           value={new Date(health.timestamp).toLocaleString()}
//         />
//         <StatusCard
//   title="Memory Usage"
//   value={`${health.memoryUsageMB} MB`}
// />
//        <StatusCard
//   title="Build Date"
//   value={
//     version.buildDate
//       ? new Date(version.buildDate).toLocaleString()
//       : "N/A"
//   }
// />

//       </div>
//     </section>
//   );
// }





import StatusCard from "./StatusCards";
import { useSystemStatus } from "../hooks/useSystemStatus";

export default function SystemStatus() {
  const { health, version } = useSystemStatus();

  if (!health || !version) return null;

  let uptimeDisplay = "";

  if (health.uptime < 60) {
    uptimeDisplay = `${health.uptime} sec`;
  } else if (health.uptime < 3600) {
    uptimeDisplay = `${Math.floor(
      health.uptime / 60
    )} min`;
  } else {
    uptimeDisplay = `${Math.floor(
      health.uptime / 3600
    )} hr`;
  }

  return (
    <section className="rounded-2xl bg-white p-8 shadow-lg">
      <h2 className="mb-8 text-3xl font-bold">
        📊 Live System Status
      </h2>

      <div className="status-grid">

        <StatusCard
          title="API Health"
          value={health.status}
        />

        <StatusCard
          title="Environment"
          value={health.environment}
        />

        <StatusCard
          title="Version"
          value={health.version}
        />

        <StatusCard
          title="Uptime"
          value={uptimeDisplay}
        />

        <StatusCard
          title="Memory Usage"
          value={`${health.memoryUsageMB} MB`}
        />

        <StatusCard
          title="Last Updated"
          value={new Date(
            health.timestamp
          ).toLocaleString()}
        />

        <StatusCard
          title="Build Date"
          value={
            version.buildDate !== "Unknown"
              ? new Date(
                  version.buildDate
                ).toLocaleString()
              : "Unknown"
          }
        />
      </div>
    </section>
  );
}