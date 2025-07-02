export default function useApi() {
  const config = useRuntimeConfig();

  return {
    get: (url, options = {}) => {
      return $fetch(url, {
        baseURL: config.public.apiBase,
        params: {
          api_key: config.public.apiKey,
          ...options.params,
        },
      });
    },
  };
}
