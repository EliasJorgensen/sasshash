// Libs
const FS = require('fs'),
      Path = require('path'),
      { spawn } = require('child_process')

// Utils
const { getHashFromFile } = require('./utils')

// Get args
const args = process.argv.splice(2)

// Only accept 2 args
if (args.length !== 2) {
    console.log("Usage: sasshash foo.scss bar[.css]")
    process.exit()
}

// Get paths from args
const paths = args.map(arg => Path.resolve(process.cwd(), arg))

// Create SASS spawn process
const sass = spawn('sass', ['--sourcemap=none', paths[0], '/tmp/sasshash.tmp.css'])

// Print error if sass returns one
sass.stderr.on('data', data => {
    console.error(`Error while running sasshash: ${data}`)
})

// Continue flow with compiled css file
sass.on('close', exitCode => {
    const hash = getHashFromFile('/tmp/sasshash.tmp.css')

    if (hash === null) {
        console.error('Well that didn\'t work out.. :(')
        process.exit()
    }

    let filename = paths[1].split('.')

    filename.length === 2
    ? filename = filename[0]
    : filename = filename.slice(0, -1).join('.')

    const data = FS.readFileSync('/tmp/sasshash.tmp.css')

    FS.writeFileSync(`${filename}.${hash}.css`, data)
})

