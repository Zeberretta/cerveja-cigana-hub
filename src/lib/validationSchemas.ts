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

// Contact form schema
export const contactFormSchema = z.object({
  name: z.string()
    .min(2, 'Nome deve ter pelo menos 2 caracteres')
    .max(100, 'Nome deve ter no máximo 100 caracteres'),
  
  email: z.string()
    .email('Email deve ser válido')
    .regex(emailPattern, 'Formato de email inválido'),
  
  phone: z.string()
    .regex(phonePattern, 'Telefone deve estar no formato (11) 99999-9999')
    .optional()
    .or(z.literal('')),
  
  company: z.string()
    .max(100, 'Nome da empresa deve ter no máximo 100 caracteres')
    .optional()
    .or(z.literal('')),
  
  userType: z.enum(['cigano', 'fabrica', 'fornecedor', 'bar', 'outro'], {
    message: 'Tipo de usuário é obrigatório',
  }),
  
  subject: z.enum(['demo', 'duvidas', 'precos', 'parceria', 'suporte', 'outro'], {
    message: 'Assunto é obrigatório',
  }),
  
  message: z.string()
    .min(10, 'Mensagem deve ter pelo menos 10 caracteres')
    .max(1000, 'Mensagem deve ter no máximo 1000 caracteres'),
});

// Beer registration schema
export const beerRegistrationSchema = z.object({
  name: z.string()
    .min(2, 'Nome da cerveja deve ter pelo menos 2 caracteres')
    .max(100, 'Nome da cerveja deve ter no máximo 100 caracteres'),
  
  style: z.string()
    .min(2, 'Estilo deve ter pelo menos 2 caracteres')
    .max(50, 'Estilo deve ter no máximo 50 caracteres'),
  
  abv: z.number()
    .min(0.1, 'ABV deve ser maior que 0.1%')
    .max(20, 'ABV deve ser menor que 20%'),
  
  ibu: z.number()
    .min(0, 'IBU deve ser positivo')
    .max(150, 'IBU deve ser menor que 150'),
  
  price: z.number()
    .positive('Preço deve ser positivo'),
  
  description: z.string()
    .max(500, 'Descrição deve ter no máximo 500 caracteres')
    .optional()
    .or(z.literal('')),
});

// Bar branch schema
export const barBranchSchema = z.object({
  name: z.string()
    .min(2, 'Nome da filial deve ter pelo menos 2 caracteres')
    .max(100, 'Nome da filial deve ter no máximo 100 caracteres'),
  
  address: z.string()
    .min(10, 'Endereço deve ter pelo menos 10 caracteres')
    .max(200, 'Endereço deve ter no máximo 200 caracteres'),
  
  manager: z.string()
    .min(2, 'Nome do gerente deve ter pelo menos 2 caracteres')
    .max(100, 'Nome do gerente deve ter no máximo 100 caracteres')
    .optional()
    .or(z.literal('')),
  
  taps: z.number()
    .min(1, 'Deve ter pelo menos 1 torneira')
    .max(50, 'Número de torneiras deve ser realista'),
});

// Production schedule schema
export const productionScheduleSchema = z.object({
  gypsy_name: z.string()
    .min(2, 'Nome da cervejaria cigana deve ter pelo menos 2 caracteres')
    .max(100, 'Nome da cervejaria cigana deve ter no máximo 100 caracteres'),
  
  recipe_name: z.string()
    .min(2, 'Nome da receita deve ter pelo menos 2 caracteres')
    .max(100, 'Nome da receita deve ter no máximo 100 caracteres'),
  
  production_date: z.string()
    .refine((date) => {
      const today = new Date();
      const selectedDate = new Date(date);
      return selectedDate >= today;
    }, 'Data de produção deve ser futura'),
  
  volume: z.number()
    .min(50, 'Volume mínimo é 50 litros')
    .max(10000, 'Volume máximo é 10.000 litros'),
});

// Recipe schema
export const recipeSchema = z.object({
  name: z.string()
    .min(2, 'Nome da receita deve ter pelo menos 2 caracteres')
    .max(100, 'Nome da receita deve ter no máximo 100 caracteres'),
  
  style: z.string()
    .min(2, 'Estilo deve ter pelo menos 2 caracteres')
    .max(50, 'Estilo deve ter no máximo 50 caracteres'),
  
  abv: z.number()
    .min(0.1, 'ABV deve ser maior que 0.1%')
    .max(20, 'ABV deve ser menor que 20%'),
  
  ibu: z.number()
    .min(0, 'IBU deve ser positivo')
    .max(150, 'IBU deve ser menor que 150'),
  
  price: z.number()
    .positive('Preço deve ser positivo'),
});

// Product schema
export const productSchema = z.object({
  name: z.string()
    .min(2, 'Nome do produto deve ter pelo menos 2 caracteres')
    .max(100, 'Nome do produto deve ter no máximo 100 caracteres'),
  
  category: z.string()
    .min(2, 'Categoria deve ser selecionada'),
  
  unit: z.string()
    .min(1, 'Unidade deve ser selecionada'),
  
  price: z.number()
    .positive('Preço deve ser positivo'),
  
  stock: z.number()
    .min(0, 'Estoque deve ser positivo ou zero'),
});

// Equipment schema
export const equipmentSchema = z.object({
  name: z.string()
    .min(2, 'Nome do equipamento deve ter pelo menos 2 caracteres')
    .max(100, 'Nome do equipamento deve ter no máximo 100 caracteres'),
  
  type: z.string()
    .min(2, 'Tipo deve ser selecionado'),
  
  capacity: z.number()
    .min(1, 'Capacidade deve ser maior que zero'),
});

export type CiganoRegistrationData = z.infer<typeof ciganoRegistrationSchema>;
export type FabricaRegistrationData = z.infer<typeof fabricaRegistrationSchema>;
export type FornecedorRegistrationData = z.infer<typeof fornecedorRegistrationSchema>;
export type BarRegistrationData = z.infer<typeof barRegistrationSchema>;
export type ContactFormData = z.infer<typeof contactFormSchema>;
export type BeerRegistrationData = z.infer<typeof beerRegistrationSchema>;
export type BarBranchData = z.infer<typeof barBranchSchema>;
export type ProductionScheduleData = z.infer<typeof productionScheduleSchema>;
export type RecipeData = z.infer<typeof recipeSchema>;
export type ProductData = z.infer<typeof productSchema>;
export type EquipmentData = z.infer<typeof equipmentSchema>;