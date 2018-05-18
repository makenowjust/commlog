export * from 'lowlight/lib/core';

import * as low from 'lowlight/lib/core';

import * as bash from 'highlight.js/lib/languages/shell';
import * as crystal from 'highlight.js/lib/languages/crystal';
import * as javascript from 'highlight.js/lib/languages/javascript';
import * as ruby from 'highlight.js/lib/languages/ruby';
import * as shell from 'highlight.js/lib/languages/shell';

low.registerLanguage('bash', bash);
low.registerLanguage('crystal', crystal);
low.registerLanguage('jabascript', javascript);
low.registerLanguage('ruby', ruby);
low.registerLanguage('shell', shell);
