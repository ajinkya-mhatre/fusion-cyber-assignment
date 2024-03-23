export function resolveDotPath(path: string, obj: object, separator = ".") {
  const properties = Array.isArray(path) ? path : path.split(separator);
  return properties.reduce((prev, curr) => prev?.[curr], obj);
}
