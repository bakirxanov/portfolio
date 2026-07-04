import axiosClient from './axiosClient';

/**
 * Sends the contact form payload to the backend.
 * Falls back to a simulated success if no real endpoint is configured,
 * so the UI remains fully demoable out of the box.
 */
export async function sendContactMessage(payload) {
  const hasRealEndpoint = Boolean(import.meta.env.VITE_API_BASE_URL);

  if (!hasRealEndpoint) {
    await new Promise((resolve) => setTimeout(resolve, 1400));
    return { success: true, mocked: true };
  }

  const { data } = await axiosClient.post('/contact', payload);
  return data;
}
