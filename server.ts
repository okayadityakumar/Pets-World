import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

// Body parser with 50mb limit for high-res photo uploads
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Ensure /public/uploads directory exists
const uploadsDir = path.resolve(__dirname, 'public/uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Serve uploaded assets statically
app.use('/uploads', express.static(uploadsDir));
app.use('/assets', express.static(path.resolve(__dirname, 'public/assets')));

const assetsFilePath = path.resolve(__dirname, 'src/data/permanentWebsiteAssets.json');

// Helper to read assets manifest
const readAssetsManifest = () => {
  try {
    if (fs.existsSync(assetsFilePath)) {
      const content = fs.readFileSync(assetsFilePath, 'utf-8');
      return JSON.parse(content);
    }
  } catch (err) {
    console.error('Error reading assets manifest:', err);
  }
  return {
    isLocked: false,
    websiteBackground: '',
    storeAccessories: {},
    clinicServices: {},
    lockedAt: '',
  };
};

// Helper to write assets manifest
const writeAssetsManifest = (data: any) => {
  const dir = path.dirname(assetsFilePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(assetsFilePath, JSON.stringify(data, null, 2), 'utf-8');
};

// 1. POST /api/upload-photo: writes uploaded image file to /public/uploads/
app.post('/api/upload-photo', async (req, res) => {
  try {
    const { filename, base64Data, category } = req.body;

    if (!base64Data) {
      return res.status(400).json({ success: false, error: 'No image data provided' });
    }

    // Match data URL prefix (e.g. data:image/png;base64,...)
    let mimeType = 'image/jpeg';
    let base64Clean = base64Data;
    const matches = base64Data.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);

    if (matches && matches.length === 3) {
      mimeType = matches[1];
      base64Clean = matches[2];
    }

    let extension = 'jpg';
    if (mimeType.includes('png')) extension = 'png';
    else if (mimeType.includes('webp')) extension = 'webp';
    else if (mimeType.includes('svg')) extension = 'svg';
    else if (mimeType.includes('jpeg') || mimeType.includes('jpg')) extension = 'jpg';

    const safePrefix = (category || filename || 'photo')
      .replace(/[^a-zA-Z0-9_-]/g, '_')
      .toLowerCase()
      .slice(0, 32);

    const generatedFilename = `${safePrefix}_${Date.now()}.${extension}`;
    const targetPath = path.join(uploadsDir, generatedFilename);

    const buffer = Buffer.from(base64Clean, 'base64');
    fs.writeFileSync(targetPath, buffer);

    const relativeUrl = `/uploads/${generatedFilename}`;

    return res.json({
      success: true,
      url: relativeUrl,
      filename: generatedFilename,
      bytes: buffer.length,
    });
  } catch (error: any) {
    console.error('Error handling upload:', error);
    return res.status(500).json({ success: false, error: error.message || 'Upload failed' });
  }
});

// 2. GET /api/locked-assets: returns current manifest
app.get('/api/locked-assets', (req, res) => {
  const manifest = readAssetsManifest();
  return res.json({ success: true, data: manifest });
});

// 3. POST /api/save-locked-assets: saves manifest directly into src/data/permanentWebsiteAssets.json
app.post('/api/save-locked-assets', (req, res) => {
  try {
    const incomingData = req.body;
    const current = readAssetsManifest();
    const updated = {
      ...current,
      ...incomingData,
    };
    writeAssetsManifest(updated);
    return res.json({ success: true, data: updated });
  } catch (error: any) {
    console.error('Error saving assets:', error);
    return res.status(500).json({ success: false, error: error.message || 'Save failed' });
  }
});

// 4. POST /api/lock-website: sets isLocked: true
app.post('/api/lock-website', (req, res) => {
  try {
    const current = readAssetsManifest();
    const updated = {
      ...current,
      isLocked: true,
      lockedAt: new Date().toISOString(),
    };
    writeAssetsManifest(updated);
    return res.json({ success: true, data: updated });
  } catch (error: any) {
    console.error('Error locking website:', error);
    return res.status(500).json({ success: false, error: error.message || 'Lock failed' });
  }
});

// Vite Integration: Middleware mode in development, static in production
async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        host: '0.0.0.0',
        port: PORT,
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Pets World Pets Care full-stack server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
