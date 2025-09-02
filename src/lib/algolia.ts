import algoliasearch from 'algoliasearch/lite';

const appId = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID || '6FCTIBAMIQ';
const apiKey = process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY || '7867b157e4ed5ab778b7207aa8924067';

export const searchClient = algoliasearch(appId, apiKey);
