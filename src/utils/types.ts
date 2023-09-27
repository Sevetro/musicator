export type Values<T extends Record<PropertyKey, unknown>> = T[keyof T];
