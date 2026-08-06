import Hero from "./components/Hero";
import { useCompany } from "./hooks/useCompany";
import About from "./components/About";
import Services from "./components/Services";
import TechStack from "./components/TechStack";
import SystemStatus from "./components/SystemStatus";
import Deployment from "./components/Deployments";
function App() {
  const { data, loading } = useCompany();

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (!data) {
    return <h2>Unable to load application data.</h2>;
  }

  return (
    <main className="max-w-6xl mx-auto px-6 py-10 space-y-8">
      <Hero
        title={data.showcase.title}
        purpose={data.showcase.purpose}
      />
  
      <About
        name={data.company.name}
        summary={data.company.summary}
        disclaimer={data.company.disclaimer}
      />
  
      <Services services={data.company.services} />
  
      <TechStack
        technologies={data.showcase.technologies}
      />
  
      <SystemStatus />
      <Deployment />
    </main>
  );
}

export default App;