export interface CompanyResponse {
    company: {
      name: string;
      disclaimer: string;
      summary: string;
      services: string[];
    };
  
    showcase: {
      title: string;
      purpose: string;
      technologies: string[];
    };
  
    builder: {
      name: string;
      role: string;
    };
  }
  
  export interface HealthResponse {
    status: string;
    service: string;
    version: string;
    environment: string;
    uptime: string;
    timestamp: string;
    nodeVersion: string;
    memoryUsage: number;
    memoryUsageMB: string;
  }
  
  export interface VersionResponse {
    app: string;
    version: string;
    environment: string;
    buildDate: string;
    commit: string;
  }