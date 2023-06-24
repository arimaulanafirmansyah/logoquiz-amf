const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

// Fungsi untuk mendownload gambar dan menyimpannya ke disk
async function downloadImage(url, outputPath) {
  const writer = fs.createWriteStream(outputPath);

  const response = await axios({
    url,
    method: 'GET',
    responseType: 'stream',
  });

  response.data.pipe(writer);

  return new Promise((resolve, reject) => {
    writer.on('finish', resolve);
    writer.on('error', reject);
  });
}

// Fungsi untuk melakukan scraping
async function scrapeLogoQuiz() {
  const url = 'https://logoquiz.net';
  
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    // Ambil semua elemen dengan class "questions" (soal dan jawaban)
    const questions = $('.questions');

    questions.each(async (index, element) => {
      const question = $(element).find('.question').text().trim();
      const answer = $(element).find('.answer').text().trim();
      const imageUrl = $(element).find('img').attr('src');

      // Ambil nama file dari URL gambar
      const imageName = path.basename(imageUrl);

      // Download dan simpan gambar soal
      await downloadImage(imageUrl, `./images/${imageName}`);

      console.log(`Soal ${index + 1}: ${question}`);
      console.log(`Jawaban ${index + 1}: ${answer}`);
      console.log(`Gambar ${index + 1}: ${imageUrl}`);
      console.log('---');
    });
  } catch (error) {
    console.error('Terjadi kesalahan:', error);
  }
}

// Panggil fungsi scraping
scrapeLogoQuiz();
