import * as core from '@actions/core'
import fs from 'fs'

import getLicenses from './licenses.js'

export async function run() {
  const path = core
    .getInput('path')
    .split(',')
    .map(path => path.trim())
  const includeDev = core.getBooleanInput('include-dev')
  const licensesFile = core.getInput('licenses-file')

  const licenses = await getLicenses({
    path,
    includeDev
  })

  if (licensesFile) {
    fs.writeFileSync(licensesFile, JSON.stringify(licenses, null, 2))
  }

  core.setOutput('licenses', licenses)
}
