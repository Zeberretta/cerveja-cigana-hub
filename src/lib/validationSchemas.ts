import { z } from 'zod';

// Common validation patterns
const cnpjPattern = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;
const cpfPattern = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
const phonePattern = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// CNPJ validation function
const validateCNPJ = (cnpj: string): boolean => {
  const numbers = cnpj.replace(/\D/g, '');
  if (numbers.length !== 14) return false;
  
  // Check for repeated digits
  if (/^(\d)\1+$/.test(numbers)) return false;
  
  // Calculate first verification digit
  let sum = 0;
  let weight = 5;
  for (let i = 0; i < 12; i++) {
    sum += parseInt(numbers[i]) * weight;
    weight = weight === 2 ? 9 : weight - 1;
  }
  const firstDigit = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  
  // Calculate second verification digit
  sum = 0;
  weight = 6;
  for (let i = 0; i < 13; i++) {
    sum += parseInt(numbers[i]) * weight;
    weight = weight === 2 ? 9 : weight - 1;
  }
  const secondDigit = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  
  return parseInt(numbers[12]) === firstDigit && parseInt(numbers[13]) === secondDigit;
};

// CPF validation function
const validateCPF = (cpf: string): boolean => {
  const numbers = cpf.replace(/\D/g, '');
  if (numbers.length !== 11) return false;
  
  // Check for repeated digits
  if (/^(\d)\1+$/.test(numbers)) return false;
  
  // Calculate first verification digit
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(numbers[i]) * (10 - i);
  }
  const firstDigit = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  
  // Calculate second verification digit
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(numbers[i]) * (11 - i);
  }
  const secondDigit = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  
  return parseInt(numbers[9]) === firstDigit && parseInt(numbers[10]) === secondDigit;
};

// Common fields schema
const baseSchema = z.object({
  nome_razao_social: z.string()
    .min(2, 'Nome/Razão Social deve ter pelo menos 2 caracteres')
    .max(255, 'Nome/Razão Social deve ter no máximo 255 caracteres'),
  
  email: z.string()
    .email('Email deve ser válido')
    .regex(emailPattern, 'Formato de email inválido'),
  
  telefone_whatsapp: z.string()
    .regex(phonePattern, 'Telefone deve estar no formato (11) 99999-9999'),
  
  endereco_completo: z.string()
    .min(10, 'Endereço deve ter pelo menos 10 caracteres')
    .max(500, 'Endereço deve ter no máximo 500 caracteres'),
  
  tempo_atuacao: z.string()
    .min(1, 'Tempo de atuação é obrigatório'),
  
  link_instagram: z.string()
    .url('Link do Instagram deve ser uma URL válida')
    .optional()
    .or(z.literal('')),
});

// Cigano registration schema
export const ciganoRegistrationSchema = baseSchema.extend({
  cnpj_cpf: z.string()
    .refine((value) => {
      const numbers = value.replace(/\D/g, '');
      if (numbers.length === 11) {
        return validateCPF(value);
      } else if (numbers.length === 14) {
        return validateCNPJ(value);
      }
      return false;
    }, 'CNPJ/CPF inválido'),
  
  inscricao_estadual: z.string()
    .optional()
    .or(z.literal('')),
  
  estimativa_producao_mensal: z.string()
    .min(1, 'Estimativa de produção mensal é obrigatória'),
  
  link_untappd: z.string()
    .url('Link do Untappd deve ser uma URL válida')
    .optional()
    .or(z.literal('')),
});

// Fabrica registration schema
export const fabricaRegistrationSchema = baseSchema.extend({
  cnpj: z.string()
    .regex(cnpjPattern, 'CNPJ deve estar no formato 00.000.000/0000-00')
    .refine(validateCNPJ, 'CNPJ inválido'),
  
  inscricao_estadual: z.string()
    .optional()
    .or(z.literal('')),
  
  capacidade_producao_mensal: z.string()
    .min(1, 'Capacidade de produção mensal é obrigatória'),
  
  registro_mapa: z.string()
    .min(1, 'Registro MAPA é obrigatório'),
});

// Fornecedor registration schema
export const fornecedorRegistrationSchema = baseSchema.extend({
  cnpj: z.string()
    .regex(cnpjPattern, 'CNPJ deve estar no formato 00.000.000/0000-00')
    .refine(validateCNPJ, 'CNPJ inválido'),
  
  capacidade_producao_mensal: z.string()
    .min(1, 'Capacidade de produção mensal é obrigatória'),
  
  registro_mapa: z.string()
    .min(1, 'Registro MAPA é obrigatório'),
});

// Bar registration schema
export const barRegistrationSchema = baseSchema.extend({
  cnpj: z.string()
    .regex(cnpjPattern, 'CNPJ deve estar no formato 00.000.000/0000-00')
    .refine(validateCNPJ, 'CNPJ inválido'),
  
  demanda_media_mensal: z.string()
    .min(1, 'Demanda média mensal é obrigatória'),
});

export type CiganoRegistrationData = z.infer<typeof ciganoRegistrationSchema>;
export type FabricaRegistrationData = z.infer<typeof fabricaRegistrationSchema>;
export type FornecedorRegistrationData = z.infer<typeof fornecedorRegistrationSchema>;
export type BarRegistrationData = z.infer<typeof barRegistrationSchema>;