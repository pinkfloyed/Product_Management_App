// lib/authStore.ts
const tokenStore = new Map<string, string>() // token -> email

export function addToken(token: string, email: string) {
  tokenStore.set(token, email)
}

export function getEmailByToken(token: string) {
  return tokenStore.get(token) ?? null
}

export function removeToken(token: string) {
  tokenStore.delete(token)
}
