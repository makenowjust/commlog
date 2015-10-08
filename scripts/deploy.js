import path from 'path'
import ghpages from 'gh-pages'

const GH_TOKEN = process.env.GH_TOKEN
const COMMIT = process.env.TRAVIS_COMMIT_RANGE || process.env.TRAVIS_COMMIT

ghpages.publish(path.join(__dirname, '..', 'public'), {
  repo: `https://${GH_TOKEN}@github.com/MakeNowJust/commlog`,
  user: {
    name: 'TSUYUSATO Kitsune',
    email: 'make.just.on@gmail.com'
  },
  message: `[ci skip] update gh-pages in ${COMMIT}`,
  silent: true
}, () => {
  console.log(`done updating gh-pages in ${COMMIT}`)
})
