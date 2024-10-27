export interface PasswordValidationResult {
    minLength: boolean;
    maxLength: boolean;
    hasLowerCase: boolean;
    hasUpperCase: boolean;
    hasNumber: boolean;
    hasSymbol: boolean;
  }
  
  export const validatePassword = (password: string): PasswordValidationResult => {
    console.log(password.length);
    
    return {
      minLength: password.length >= 8,
      maxLength: password.length <= 16,
      hasLowerCase: /[a-z]/.test(password),
      hasUpperCase: /[A-Z]/.test(password),
      hasNumber: /\d/.test(password),
      hasSymbol: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };
  };
  