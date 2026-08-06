import StatusCard from "./StatusCards";
import { useSystemStatus } from "../hooks/useSystemStatus";

export default function SystemStatus() {
  const { health, version } = useSystemStatus();

  if (!health || !version) return null;

  return (
    <section className="card">
      <h2>📊 Live System Status</h2>

      <div className="status-grid">
        <StatusCard
          title="API Health"
          value={health.status}
        />

        <StatusCard
          title="Environment"
          value={version.environment}
        />

        <StatusCard
          title="Version"
          value={version.version}
        />

        <StatusCard
          title="Uptime"
          value={`${Math.floor(health.uptime)} sec`}
        />
      </div>
    </section>
  );
}