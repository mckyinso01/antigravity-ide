const fs = require('fs');
const path = require('path');

const gatzCinematicIndex = path.join(__dirname, 'gatzdevs-cinematic', 'index.html');
const gatzCinematic200 = path.join(__dirname, 'gatzdevs-cinematic', '200.html');
const gatzPortfolioIndex = path.join(__dirname, 'GatzDevPortfolio', 'index.html');
const gatzPortfolio200 = path.join(__dirname, 'GatzDevPortfolio', '200.html');

let html = fs.readFileSync(gatzCinematicIndex, 'utf8');

// Target marker after Saccade dossier
const targetSnippet = `          </div>
        </div>

      </div>


      <!-- ========================================================================= -->
      <!-- 100% FREE CUSTOM MODIFICATIONS & 3-GIVES MILESTONE TRUST GUARANTEE BANNER -->`;

const replacementSnippet = `          </div>
        </div>

      </div>
    </section>

    <!-- ========================================================================= -->
    <!-- 100% FREE CUSTOM MODIFICATIONS & 3-GIVES MILESTONE TRUST GUARANTEE BANNER -->`;

if (html.includes(targetSnippet)) {
  html = html.replace(targetSnippet, replacementSnippet);
  console.log('✅ Successfully closed </section> for #apps!');
} else {
  console.log('⚠️ Could not find exact snippet, checking regex...');
  html = html.replace(
    /(<!-- CLIENT FEEDBACK SURVEY & COMMERCIAL ACTION BAR[\s\S]*?<\/div>\s*<\/div>\s*<\/div>)\s*<!-- ========================================================================= -->\s*<!-- 100% FREE CUSTOM MODIFICATIONS/,
    '$1\n    </section>\n\n    <!-- ========================================================================= -->\n    <!-- 100% FREE CUSTOM MODIFICATIONS'
  );
  console.log('✅ Regex replacement applied for </section> #apps!');
}

// Synchronize all 4 files
fs.writeFileSync(gatzCinematicIndex, html, 'utf8');
fs.writeFileSync(gatzCinematic200, html, 'utf8');
fs.writeFileSync(gatzPortfolioIndex, html, 'utf8');
fs.writeFileSync(gatzPortfolio200, html, 'utf8');

console.log('🎉 Synchronized across all 4 master files!');
