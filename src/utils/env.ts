export function getViteEnv(key: string): string {
  const env = import.meta.env[key]
  if (!env) throw new TypeError(`Env key ${key} not set`)
  return env
}
