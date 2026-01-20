"use client";

import { useState, useCallback } from "react";

interface FormErrors {
    [key: string]: string;
}

interface UseFormReturn<T> {
    values: T;
    errors: FormErrors;
    isSubmitting: boolean;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    handleSubmit: (e: React.FormEvent) => Promise<void>;
    setFieldValue: (field: keyof T, value: T[keyof T]) => void;
    setFieldError: (field: string, error: string) => void;
    resetForm: () => void;
}

/**
 * Custom hook for form handling with validation
 * 
 * @param initialValues - Initial form values
 * @param onSubmit - Submit handler function
 * @param validate - Validation function (optional)
 * 
 * @example
 * ```tsx
 * const form = useForm({
 *   initialValues: { email: '', name: '' },
 *   onSubmit: async (values) => { ... },
 *   validate: (values) => {
 *     const errors: any = {};
 *     if (!values.email) errors.email = 'Required';
 *     return errors;
 *   }
 * });
 * ```
 */
export function useForm<T extends Record<string, unknown>>({
    initialValues,
    onSubmit,
    validate,
}: {
    initialValues: T;
    onSubmit: (values: T) => Promise<void> | void;
    validate?: (values: T) => FormErrors;
}): UseFormReturn<T> {
    const [values, setValues] = useState<T>(initialValues);
    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
            const { name, value, type } = e.target;
            const actualValue = type === "checkbox" ? (e.target as HTMLInputElement).checked : value;

            setValues((prev) => ({
                ...prev,
                [name]: actualValue,
            }));

            // Clear error for this field
            if (errors[name]) {
                setErrors((prev) => {
                    const newErrors = { ...prev };
                    delete newErrors[name];
                    return newErrors;
                });
            }
        },
        [errors]
    );

    const setFieldValue = useCallback((field: keyof T, value: T[keyof T]) => {
        setValues((prev) => ({
            ...prev,
            [field]: value,
        }));
    }, []);

    const setFieldError = useCallback((field: string, error: string) => {
        setErrors((prev) => ({
            ...prev,
            [field]: error,
        }));
    }, []);

    const handleSubmit = useCallback(
        async (e: React.FormEvent) => {
            e.preventDefault();

            // Validate if validator is provided
            if (validate) {
                const validationErrors = validate(values);
                if (Object.keys(validationErrors).length > 0) {
                    setErrors(validationErrors);
                    return;
                }
            }

            setIsSubmitting(true);
            setErrors({});

            try {
                await onSubmit(values);
            } catch (error: unknown) {
                console.error("Form submission error:", error);
                const errorMessage = error instanceof Error ? error.message : "Submission failed";
                setErrors({ submit: errorMessage });
            } finally {
                setIsSubmitting(false);
            }
        },
        [values, validate, onSubmit]
    );

    const resetForm = useCallback(() => {
        setValues(initialValues);
        setErrors({});
        setIsSubmitting(false);
    }, [initialValues]);

    return {
        values,
        errors,
        isSubmitting,
        handleChange,
        handleSubmit,
        setFieldValue,
        setFieldError,
        resetForm,
    };
}
