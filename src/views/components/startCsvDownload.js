import axios from 'axios';

async function startCsvDownload(csvUrl) {

  try {
    const response = await axios.get(csvUrl, { responseType: 'blob' });

    const blob = new Blob([response.data], { type: 'text/csv' });
    const blobUrl = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = 'users.csv';

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(blobUrl);
  } catch (error) {
    console.error('Error downloading CSV:', error);
  }
}

export default startCsvDownload;
