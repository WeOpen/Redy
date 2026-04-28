import { fileURLToPath } from 'node:url';

export const REDY_WELCOME_LINES = [
  '+-- Redy ------------------------+',
  '|      |  Redy is online.        |',
  '|   >_ |  Open source, warm.     |',
  '+--------------------------------+',
  '',
  '[WeOpen] Initializing environment...',
  '[Redy] Scanning branches...',
  '[Redy] Cherry-picking the best bits...',
  "[Redy] Ready. Let's build something open.",
];

export function renderRedyWelcome() {
  return REDY_WELCOME_LINES.join('\n');
}

function isCliEntrypoint(metaUrl: string, argvPath: string | undefined) {
  return Boolean(argvPath) && fileURLToPath(metaUrl) === argvPath;
}

if (isCliEntrypoint(import.meta.url, process.argv[1])) {
  console.log(renderRedyWelcome());
}
