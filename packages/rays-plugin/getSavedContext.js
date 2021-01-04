import fetch from 'node-fetch';

export default async function getSavedContext() {
  const domain = process.env.NEXT_PUBLIC_CHEC_API_DOMAIN || 'https://api.chec.io';
  const response = await fetch(`${domain}/v1/rays/${process.env.COMMERCEJS_RAY_ID}`, {
    headers: {
      'X-Authorization': process.env.CHEC_SECRET_KEY,
      'Accept': 'application/json'
    }
  })

  if (response.status !== 200) {
    throw new Error('Could not load the ray from the API');
  }

  return (await response.json()).config;
}
