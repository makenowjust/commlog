import low from 'lowlight/lib/core';

import bash from 'highlight.js/lib/languages/shell';
import css from 'highlight.js/lib/languages/css';
import crystal from 'highlight.js/lib/languages/crystal';
import javascript from 'highlight.js/lib/languages/javascript';
import ruby from 'highlight.js/lib/languages/ruby';
import shell from 'highlight.js/lib/languages/shell';
import xml from 'highlight.js/lib/languages/xml';

low.registerLanguage('bash', bash);
low.registerLanguage('css', css);
low.registerLanguage('crystal', crystal);
low.registerLanguage('javascript', javascript);
low.registerLanguage('ruby', ruby);
low.registerLanguage('shell', shell);
low.registerLanguage('xml', xml);

export const highlight = low.highlight;
export const highlightAuto = low.highlightAuto;
export const registerLanguage = low.registerLanguage;
