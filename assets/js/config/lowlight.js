export * from 'lowlight/lib/core';

import * as low from 'lowlight/lib/core';

import * as bash from 'highlight.js/lib/languages/shell';
import * as css from 'highlight.js/lib/languages/css';
import * as crystal from 'highlight.js/lib/languages/crystal';
import * as javascript from 'highlight.js/lib/languages/javascript';
import * as ruby from 'highlight.js/lib/languages/ruby';
import * as shell from 'highlight.js/lib/languages/shell';
import * as xml from 'highlight.js/lib/languages/xml';

low.registerLanguage('bash', bash);
low.registerLanguage('css', css);
low.registerLanguage('crystal', crystal);
low.registerLanguage('javascript', javascript);
low.registerLanguage('ruby', ruby);
low.registerLanguage('shell', shell);
low.registerLanguage('xml', xml);
