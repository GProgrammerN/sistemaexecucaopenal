import multiparty from 'multiparty';
import fs from 'fs';
import pdf from 'pdf-parse';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req, res) => {
  return new Promise((resolve, reject) => {

    if (req.method === 'POST') {
      const form = new multiparty.Form();

      form.parse(req, async (err, fields, files) => {
        if (err) {
          res.status(500).json({ error: 'File upload error' });
          return;
        }

        if (!files.pdf || files.pdf[0].headers['content-type'] !== 'application/pdf') {
          res.status(400).json({ error: 'Invalid PDF file' });
          return;
        }

        const pdfFilePath = files.pdf[0].path;

        const dataBuffer = fs.readFileSync(pdfFilePath);
        const data = await pdf(dataBuffer);
        const textContent = data.text;

        res.status(200).json({ text: textContent });
        resolve()
      });
    } else {
      res.status(405).json({ error: 'Method not allowed' });
      reject()
    }
  }).catch(error => {
    res.json(error)
    res.status(405).end()
    reject()
  })
}