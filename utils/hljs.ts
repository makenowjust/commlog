// @ts-nocheck

import hljs from "highlight.js/lib/core";

import bash from "highlight.js/lib/languages/bash";
import crystal from "highlight.js/lib/languages/crystal";
import css from "highlight.js/lib/languages/css";
import javascript from "highlight.js/lib/languages/javascript";
import ruby from "highlight.js/lib/languages/ruby";
import scala from "highlight.js/lib/languages/scala";
import shell from "highlight.js/lib/languages/shell";
import xml from "highlight.js/lib/languages/xml";
import yaml from "highlight.js/lib/languages/yaml";

hljs.registerLanguage("bash", bash);
hljs.registerLanguage("crystal", crystal);
hljs.registerLanguage("css", css);
hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("ruby", ruby);
hljs.registerLanguage("scala", scala);
hljs.registerLanguage("shell", shell);
hljs.registerLanguage("xml", xml);
hljs.registerLanguage("yaml", yaml);

export default hljs;
