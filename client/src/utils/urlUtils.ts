export const fixUrl = (rootUrl: string) => {
    if (rootUrl.startsWith('/')) rootUrl = rootUrl.substring(1);
    return `http://127.0.0.1:8010/${rootUrl}`;
};
