'use server'

import { CookieKey } from '@/constant/app'
import { cookies } from 'next/headers'

export async function hasCookie(key: CookieKey) {
  try {
    return cookies().has(key)
  } catch (error) {
    console.error(error)
    return false
  }
}

export async function getCookie<T>(key: CookieKey): Promise<T | null> {
  try {
    const data = cookies().get(key)?.value || null
    return data ? JSON.parse(data) : null
  } catch (error) {
    console.error(error)
    return null
  }
}

export async function setCookie(key: CookieKey, value: any) {
  try {
    cookies().set(key, JSON.stringify(value), {
      maxAge: 60 * 60 * 24 * 365
    })
    return true
  } catch (error) {
    console.error(error)
    return false
  }
}

export async function deleteCookie(key: CookieKey | CookieKey[]) {
  try {
    if (typeof key === 'string') {
      cookies().delete(key)
    } else {
      key.forEach((k) => {
        cookies().delete(k)
      })
    }
    return true
  } catch (error) {
    console.error(error)
    return false
  }
}

export async function getAllCookies() {
  try {
    return cookies().getAll()
  } catch (error) {
    console.error(error)
    return null
  }
}
