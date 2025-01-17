export type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

export type Values<T extends Record<PropertyKey, unknown>> = T[keyof T];

export function isSimpleObject(val: unknown): val is Record<string, unknown> {
  return val != null && typeof val === "object" && !Array.isArray(val);
}

export function isNativeError(val: unknown): val is Error {
  return Object.getPrototypeOf(val) === Error.prototype;
}
