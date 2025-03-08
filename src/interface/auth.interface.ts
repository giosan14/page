export interface LoginResponse {
    data: {
      token: string;
    };
  }
  
  export interface RegisterData {
    email: string;
    password: string;
    [key: string]: unknown; 
  }
  
  export interface ProfileResponse {
    id: string;
    email: string;
    name: string;
  }
  