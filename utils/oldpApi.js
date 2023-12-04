import OldpApi from 'oldp-api';

const defaultClient = OldpApi.ApiClient.instance;
const api_key = defaultClient.authentications['api_key'];
api_key.apiKey = process.env.OLDPAPI_KEY;
api_key.apiKeyPrefix = { Authorization: 'Token' };

export { OldpApi as OldAPIClient };