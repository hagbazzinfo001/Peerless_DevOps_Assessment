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
  
  // export interface HealthResponse {
  //   status: string;
  //   service: string;
  //   version: string;
  //   environment: string;
  //   uptime: string;
  //   timestamp: string;
  //   nodeVersion: string;
  //   memoryUsage: number;
  //   memoryUsageMB: string;
  // }
  export interface HealthResponse{
  "status": "healthy",
  "service": "Peerless DevOps Showcase",
  "version": "1b3f24a",
  "environment": "production",
  "uptime": 452,
  "timestamp": "2026-08-07T10:22:40.235Z",
  "nodeVersion": "v22.23.2",
  "memoryUsage": 7439128,
  "memoryUsageMB": "7.10"
}
  export interface VersionResponse {
    app: string;
    version: string;
    environment: string;
    buildDate: string;
    commit: string;
  }