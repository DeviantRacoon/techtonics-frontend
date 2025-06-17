export type CookieOptions = {
  path?: string;
  maxAge?: number;
  secure?: boolean;
  sameSite?: 'Lax' | 'Strict' | 'None';
};

export function setCookie(name: string, value: string, options: CookieOptions = {}) {
  let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;
  cookieString += `; Path=${options.path || '/'}`;

  if (options.maxAge) {
    cookieString += `; Max-Age=${options.maxAge}`;
  }

  cookieString += `; SameSite=${options.sameSite || 'Lax'}`;
  if (options.secure || process.env.NODE_ENV === 'production') {
    cookieString += `; Secure`;
  }

  document.cookie = cookieString;
}

export function getCookies(): Record<string, string> {
  if (typeof document === 'undefined') return {};

  return document.cookie.split(';').reduce((acc, cookieStr) => {
    const [name, ...rest] = cookieStr.trim().split('=');
    acc[decodeURIComponent(name)] = decodeURIComponent(rest.join('='));
    return acc;
  }, {} as Record<string, string>);
}

export function getCookie(name: string) {
  const cookies = getCookies();
  return cookies[name] || null;
}

export function deleteCookie(name: string) {
  document.cookie = `${encodeURIComponent(name)}=; Path=/; Max-Age=0`;
}
