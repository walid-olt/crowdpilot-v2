import type { ZodIssue } from "zod";
import axios, { AxiosError } from "axios";

const ERROR_CODES = {
  INTERNAL_ERROR: "INTERNAL_ERROR",
  NOT_FOUND: "NOT_FOUND",
  BAD_REQUEST: "BAD_REQUEST",
  VALIDATION_ERROR: "VALIDATION_ERROR",
  UNAUTHORIZED: "UNAUTHORIZED",
  FORBIDDEN: "FORBIDDEN",
  CONFLICT: "CONFLICT",
} as const;

interface IAppError {
  statusCode: number;
  status: "error";
  code: (typeof ERROR_CODES)[keyof typeof ERROR_CODES];
  message: string;
  errors?: unknown[] | ZodIssue[];
}

class AppError extends Error implements IAppError {
  public statusCode: number;
  public status: "error";
  public code: (typeof ERROR_CODES)[keyof typeof ERROR_CODES];
  public message: string;
  public errors?: unknown[] | ZodIssue[];

  constructor(
    statusCode: number,
    code: (typeof ERROR_CODES)[keyof typeof ERROR_CODES],
    message: string,
    errors?: unknown[] | ZodIssue[],
  ) {
    super(message);
    this.statusCode = statusCode;
    this.status = "error";
    this.code = code;
    this.message = message;
    if (errors !== undefined) {
      this.errors = errors;
    }
  }
}

class NotFoundError extends AppError {
  constructor(message: string = "Resource not found") {
    super(404, ERROR_CODES.NOT_FOUND, message);
  }
}

class BadRequestError extends AppError {
  constructor(
    message: string = "Bad request",
    errors?: unknown[] | ZodIssue[],
  ) {
    super(400, ERROR_CODES.BAD_REQUEST, message, errors);
  }
}

class ValidationError extends AppError {
  declare public errors?: Record<string, string>[];
  constructor(
    message: string = "Validation error",
    zodIssues?: ZodIssue[] | unknown[],
  ) {
    super(422, ERROR_CODES.VALIDATION_ERROR, message, zodIssues);
    if (zodIssues !== undefined) {
      this.errors = zodIssues.map((issue) => ({
        [`${issue.path.join(".")}`]: issue.message,
      }));
    }
  }
}

class UnauthorizedError extends AppError {
  constructor(message: string = "Unauthorized") {
    super(401, ERROR_CODES.UNAUTHORIZED, message);
  }
}

class ForbiddenError extends AppError {
  constructor(message: string = "Forbidden") {
    super(403, ERROR_CODES.FORBIDDEN, message);
  }
}

class ConflictError extends AppError {
  constructor(message: string = "Conflict") {
    super(409, ERROR_CODES.CONFLICT, message);
  }
}

export {
  AppError,
  NotFoundError,
  BadRequestError,
  ValidationError,
  UnauthorizedError,
  ForbiddenError,
  ConflictError,
};

export function mapAxiosError(error: unknown): AppError {
  // 1. Check if it's an error thrown by Axios
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<IAppError>;

    // Case A: The server responded with an error status code (4xx, 5xx)
    if (axiosError.response && axiosError.response.data) {
      const { statusCode, message, errors } = axiosError.response.data;

      switch (statusCode) {
        case 400:
          return new BadRequestError(message, errors);
        case 401:
          return new UnauthorizedError(message);
        case 403:
          return new ForbiddenError(message);
        case 404:
          return new NotFoundError(message);
        case 409:
          return new ConflictError(message);
        case 422:
          // The backend ValidationError class handles mapping Zod issues inside its constructor
          return new ValidationError(message, errors);
        default:
          // Fallback for unhandled server statuses (like 500 Internal Server Errors)
          return new AppError(
            statusCode || 500,
            "INTERNAL_ERROR",
            message || "An unexpected server error occurred.",
          );
      }
    }

    // Case B: Request was made but no response was received (Network / Timeout error)
    if (axiosError.request) {
      return new AppError(
        503,
        "INTERNAL_ERROR",
        "No response from server. Please check your internet connection.",
      );
    }
  }

  // 2. Fallback for native JS errors or completely unknown runtime anomalies
  if (error instanceof Error) {
    return new AppError(500, "INTERNAL_ERROR", error.message);
  }

  return new AppError(
    500,
    "INTERNAL_ERROR",
    "An unknown runtime error occurred.",
  );
}
