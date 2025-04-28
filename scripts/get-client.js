const { createClient } = require('@hey-api/openapi-ts');

createClient({
  input: 'apps/backend/openapi.json',
  output: 'apps/frontend/src/client',
  plugins: ['@hey-api/client-fetch'],
});