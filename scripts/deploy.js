import 'shelljs/global';
import path from 'path';
import ghpages from 'gh-pages';

const GH_TOKEN = process.env.GH_TOKEN;
const rev = exec('git rev-parse --short HEAD').output;

ghpages.publish(path.join(__dirname, '..' , 'public'), {
  repo: `https://${GH_TOKEN}@github.com/MakeNowJust/commlog`,
  user: {
    name: 'TSUYUSATO Kitsune',
    email: 'make.just.on@gmail.com',
  },
  message: `[ci skip] update gh-pages at ${rev}`,
  silent: true,
}, () => {
  echo(`done updating gh-pages at ${rev}`);
});
