export default function useApi() {
  const config = useRuntimeConfig();

  return {
    get: (url, options = {}) => {
      return $fetch(url, {
        baseURL: config.public.apiBase,
        params: {
          auth_token: config.public.apiToken,
          ...options.params,
        },
      });
    },
  };
}
