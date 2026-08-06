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
    uptime: string;
    timestamp: string;
    version: string;
    environment: string;

  }
  
  export interface VersionResponse {
    app: string;
    version: string;
    environment: string;
    buildDate: string;
    commit: string;
  }