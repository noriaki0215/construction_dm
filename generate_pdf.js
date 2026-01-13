const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  
  // HTMLファイルを読み込む
  const filePath = path.join(__dirname, 'construction-site-entry-standards-proposal.html');
  await page.goto(`file://${filePath}`, { waitUntil: 'networkidle0' });

  // Webフォントの読み込み完了を待機
  await page.evaluateHandle('document.fonts.ready');
  
  // 印刷用CSSメディアタイプのエミュレーション
  await page.emulateMediaType('print');

  // PDFを生成
  await page.pdf({
    path: 'output.pdf',
    format: 'A4',
    printBackground: true,
    margin: {
      top: '0',
      right: '0',
      bottom: '0',
      left: '0'
    }
  });

  await browser.close();
  console.log('PDF generated successfully: output.pdf');
})();
