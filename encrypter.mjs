#!/usr/bin/env node

/* eslint-disable */

import fs from 'fs'
import path from 'path'
import crypto from 'crypto'
import chalk from 'chalk'

const FILE_TO_ENCRYPT = process.argv[2]

if (!FILE_TO_ENCRYPT) {
	console.log('Usage: bin/encrypter.mjs <file to encrypt>')
	process.exit(1)
}

const SECRET = crypto.randomBytes(32)
const SECRET_STRING = SECRET.toString('hex')
const IV = crypto.randomBytes(16)
const IV_STRING = IV.toString('hex')
const cipher = crypto.createCipheriv('aes-256-cbc', SECRET, IV)
const fileContent = fs.readFileSync(path.join(process.cwd(), FILE_TO_ENCRYPT))
let encryptedFileContentBase64 = Buffer.concat([cipher.update(fileContent), cipher.final()]).toString('base64')
const object = { iv: IV_STRING, message: encryptedFileContentBase64 }
console.log(`\nJSON with encrypted message:\n\n${chalk.blue(JSON.stringify(object))}`)

console.log(`\n\nRandomly generated secret to decrypt the above:\n\n${chalk.red(SECRET_STRING)}\n`)
