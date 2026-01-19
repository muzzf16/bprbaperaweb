import { NextResponse } from "next/server";

export type ApiResponse<T = null> = {
    success: boolean;
    message: string;
    data?: T;
    errors?: Record<string, string[]>;
    timestamp: string;
};

/**
 * Helper to create a standardized JSON response
 */
export function createResponse<T>(
    data: T | null,
    message: string = "Success",
    status: number = 200,
    errors?: Record<string, string[]>
): NextResponse<ApiResponse<T>> {
    const body: ApiResponse<T> = {
        success: status >= 200 && status < 300,
        message,
        timestamp: new Date().toISOString(),
    };

    if (data) body.data = data;
    if (errors) body.errors = errors;

    return NextResponse.json(body, { status });
}

/**
 * Helper to create an error response
 */
export function createErrorResponse(
    message: string,
    status: number = 400,
    errors?: Record<string, string[]>
): NextResponse<ApiResponse<null>> {
    return createResponse(null, message, status, errors);
}
