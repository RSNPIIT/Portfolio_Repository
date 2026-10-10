import { PORTFOLIO_ZIP_BASE64 } from './zipData';

export function downloadPortfolioZip(filename = 'ramrup-satpati-portfolio.zip'): boolean {
  try {
    // 1. Convert base64 to binary byte array
    const binaryString = atob(PORTFOLIO_ZIP_BASE64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    // 2. Create Blob with application/zip MIME type
    const blob = new Blob([bytes], { type: 'application/zip' });
    const blobUrl = URL.createObjectURL(blob);

    // 3. Trigger download via synthetic anchor
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = blobUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();

    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(blobUrl);
    }, 1500);

    return true;
  } catch (err) {
    console.error('In-memory Blob download failed, falling back to data URI / direct URL:', err);
    try {
      // Fallback: Data URI
      const dataUri = `data:application/zip;base64,${PORTFOLIO_ZIP_BASE64}`;
      const a = document.createElement('a');
      a.href = dataUri;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      return true;
    } catch (e2) {
      console.error('Data URI download failed:', e2);
      return false;
    }
  }
}
