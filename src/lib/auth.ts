
"use client";
const KEY = "kaypee_token";
export function setToken(token: string){ if (typeof window !== "undefined") localStorage.setItem(KEY, token); }
export function getToken(){ return typeof window === "undefined" ? "" : (localStorage.getItem(KEY) || ""); }
export function clearToken(){ if (typeof window !== "undefined") localStorage.removeItem(KEY); }
