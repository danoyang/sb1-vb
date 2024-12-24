import { AZURE_CONFIG } from './azure-config';

export async function generateSpeech(text: string, lang: string = 'es-ES'): Promise<string> {
  const ssml = `
    <speak version='1.0' xml:lang='${lang}'>
      <voice xml:lang='${lang}' xml:gender='Female' name='es-ES-ElviraNeural'>
        ${text}
      </voice>
    </speak>`;

  const response = await fetch(AZURE_CONFIG.ttsUrl, {
    method: 'POST',
    headers: {
      'Ocp-Apim-Subscription-Key': AZURE_CONFIG.apiKey,
      'Content-Type': 'application/ssml+xml',
      'X-Microsoft-OutputFormat': 'audio-16khz-128kbitrate-mono-mp3',
    },
    body: ssml,
  });

  if (!response.ok) {
    throw new Error('TTS request failed');
  }

  const audioBlob = await response.blob();
  return URL.createObjectURL(audioBlob);
}