export type ObjectId = string;

export type Role = "OWNER" | "INVESTOR";
export type ProjectStatus = "OPEN" | "CLOSED";
export type BalanceOperation = "add" | "deduct";

export type SuccessEnvelope<Data = unknown> = {
  status: "success";
  message?: string;
  results?: number;
  data?: Data;
};

export type ErrorResponse = {
  status: "error";
  message: string;
  code?: string;
  errors?: string[];
  stack?: string;
};

export type HealthResponse = {
  status: "success";
  message: string;
};

export type SafeUser = {
  id: ObjectId;
  name: string;
  email: string;
  role: Role;
  balance?: number;
};

export type RegisterRequestBody = {
  name: string;
  email: string;
  password: string;
  role: Role;
  balance?: number;
};

export type LoginRequestBody = {
  email: string;
  password: string;
};

export type AuthResponseData = {
  token: string;
  user: SafeUser;
};

export type AuthResponse = SuccessEnvelope<AuthResponseData>;

export type UpdateBalanceRequestBody = {
  operation: BalanceOperation;
  amount: number;
};

export type Project = {
  _id: ObjectId;
  title: string;
  description: string;
  currentCapital: number;
  targetCapital: number;
  ownerId: ObjectId;
  status: ProjectStatus;
  maxInvestmentPercentage: number;
  ownerInvestment: number;
  percentageFunded?: number;
};

export type CreateProjectRequestBody = {
  title: string;
  description: string;
  targetCapital: number;
  ownerInvestment?: number;
  maxInvestmentPercentage?: number;
};

export type UpdateProjectRequestBody = {
  title?: string;
  description?: string;
  currentCapital?: number;
  targetCapital?: number;
  maxInvestmentPercentage?: number;
};

export type InvestRequestBody = {
  amount: number;
};

export type Investment = {
  _id: ObjectId;
  projectId: ObjectId;
  investorId: ObjectId;
  amount: number;
  percentageOwned?: number;
};

export type InvestResponseData = {
  investment: Investment;
  project: Project;
};

export type CapTableRow = {
  investorId: ObjectId;
  amount: number;
  name: string;
  email: string;
  role: Role;
  ownershipPercentage: number;
};

export type CapTableProjectSummary = {
  id: ObjectId;
  title: string;
  targetCapital: number;
  currentCapital: number;
  status: ProjectStatus;
  maxInvestmentPercentage: number;
};

export type CapTableResponseData = {
  project: CapTableProjectSummary;
  capTable: CapTableRow[];
};

export type InvestorPortfolioItem = {
  projectId: ObjectId;
  amount: number;
  projectTitle: string;
  projectStatus: ProjectStatus;
  targetCapital: number;
  ownershipPercentage: number;
};

export type InvestorPortfolioResponseData = {
  investor: {
    id: ObjectId;
    name: string;
    email: string;
  };
  totalInvested: number;
  portfolio: InvestorPortfolioItem[];
};

export type OwnerProjectItem = {
  id: ObjectId;
  title: string;
  status: ProjectStatus;
  targetCapital: number;
  currentCapital: number;
  percentageFunded: number;
};

export type OwnerPortfolioResponseData = {
  owner: {
    id: ObjectId;
    name: string;
    email: string;
  };
  totalRaised: number;
  projects: OwnerProjectItem[];
};

export type UserSummary = {
  name: string;
  email: string;
  role: Role;
  balance?: number;
  totalInvested?: number;
  projectsOwned?: Record<string, unknown>[];
  investmentsMade?: Record<string, unknown>[];
};

export type AuthMeResponse = SuccessEnvelope<{ user: SafeUser }>;
export type UserListResponse = SuccessEnvelope<SafeUser[]>;
export type UserSummaryResponse = SuccessEnvelope<UserSummary>;
export type UpdateBalanceResponse = SuccessEnvelope<SafeUser>;
export type ProjectsResponse = SuccessEnvelope<Project[]>;
export type ProjectResponse = SuccessEnvelope<Project>;
export type ProjectActionResponse = SuccessEnvelope<Project>;
export type InvestResponse = SuccessEnvelope<InvestResponseData>;
export type CapTableResponse = SuccessEnvelope<CapTableResponseData>;
export type InvestorPortfolioResponse =
  SuccessEnvelope<InvestorPortfolioResponseData>;
export type OwnerPortfolioResponse =
  SuccessEnvelope<OwnerPortfolioResponseData>;
export type PortfolioMeResponse = SuccessEnvelope<
  InvestorPortfolioResponseData | OwnerPortfolioResponseData
>;

export const registerSuccess: AuthResponse = {
  status: "success",
  message: "string",
  results: 0,
  data: {
    token: "string",
    user: {
      id: "661e50d6d2d6cbf70f88ec11",
      name: "string",
      email: "user@example.com",
      role: "OWNER",
      balance: 0,
    },
  },
};

export const registerError: ErrorResponse = {
  status: "error",
  message: "string",
  code: "string",
  errors: ["string"],
  stack: "string",
};

export type RegisterSuccessResponse = typeof registerSuccess;
export type RegisterErrorResponse = typeof registerError;
