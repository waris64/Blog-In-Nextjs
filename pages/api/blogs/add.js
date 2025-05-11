import fs from 'fs';
import path from 'path';
import formidable from 'formidable';
import Blog from '../../../models/Blog';
import connectMonog from '../../../lib/mongodb';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    await connectMonog();
    const uploadDir = path.join(process.cwd(), 'public/uploads');

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const form = formidable({
      uploadDir,
      keepExtensions: true,
      maxFileSize: 5 * 1024 * 1024, // 5MB limit
      filename: (name, ext, part) => {
        const timestamp = Date.now();
        const cleanName = part.originalFilename.replace(/\s+/g, '-').toLowerCase();
        return `${timestamp}-${cleanName}`;
      }
    });

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error('Form parse error:', err);
        return res.status(500).json({ message: 'Error parsing the form' });
      }

      const title = fields.title?.[0] || fields.title;
      const content = fields.content?.[0] || fields.content;
      const author = fields.author?.[0] || fields.author;
      const imageFile = files.file[0];

      if (!title || !content || !author || !imageFile) {
        return res.status(400).json({ message: 'All fields are required' });
      }

      try {
        const blog = new Blog({
          title,
          content,
          author,
          image: imageFile.newFilename,
        });

        await blog.save();
        return res.status(200).json({ message: 'Blog saved successfully' });
      } catch (saveErr) {
        console.error('DB save error:', saveErr);
        return res.status(500).json({ message: 'Failed to save blog to database' });
      }
    });

  } catch (err) {
    console.error('Unexpected server error:', err);
    return res.status(500).json({ message: 'Unexpected error' });
  }
}
