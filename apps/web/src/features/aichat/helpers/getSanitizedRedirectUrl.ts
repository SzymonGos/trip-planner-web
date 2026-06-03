export const getSanitizedRedirectUrl = (url: string) => `/sign-in?redirect_url=${encodeURIComponent(url)}`;
