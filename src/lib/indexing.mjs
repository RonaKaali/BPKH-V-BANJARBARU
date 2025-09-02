import algoliasearch from 'algoliasearch';
import * as fs from 'fs/promises';
import * as path from 'path';
import { JSDOM } from 'jsdom';

// Konfigurasi Algolia
const client = algoliasearch('6FCTIBAMIQ', '7edb841957d857a59608ef4f65595008');
const index = client.initIndex('dev_content');

const directoryToWalk = './src/app';
const baseUrl = 'https://bpkh-banjarbaru.vercel.app';

async function getFiles(dir) {
  const dirents = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    dirents.map((dirent) => {
      const res = path.resolve(dir, dirent.name);
      return dirent.isDirectory() ? getFiles(res) : res;
    })
  );
  return Array.prototype.concat(...files);
}

async function main() {
  const files = await getFiles(directoryToWalk);
  const pageFiles = files.filter((file) => file.endsWith('page.tsx'));

  const records = [];

  for (const file of pageFiles) {
    const fileContent = await fs.readFile(file, 'utf-8');
    const dom = new JSDOM(fileContent);
    const title = dom.window.document.querySelector('h1')?.textContent || '';
    
    // Change: Extract content only from the <main> tag to avoid indexing source code.
    let content = dom.window.document.querySelector('main')?.textContent || '';
    // Clean up whitespace
    content = content.replace(/\s+/g, ' ').trim();

    const urlPath = file
      .replace(directoryToWalk, '')
      .replace(/\\/g, '/')
      .replace('/page.tsx', '');
    const url = `${baseUrl}${urlPath || '/'}`;

    // Only index pages that have actual content
    if (content) {
      records.push({
        objectID: url,
        title,
        content,
        url,
      });
    }
  }

  try {
    // Clear existing index before adding new records
    await index.clearObjects();
    await index.saveObjects(records);
    console.log('Content re-indexed successfully with cleanup!');
  } catch (error) {
    console.error('Error re-indexing content:', error);
  }
}

main();
