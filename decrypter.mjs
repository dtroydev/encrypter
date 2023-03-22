#!/usr/bin/env node

/* eslint-disable */

import fs from 'fs'
import path from 'path'
import crypto from 'crypto'

const FILE_TO_DECRYPT = process.argv[2]
const SECRET_STR = process.argv[3]

if (!FILE_TO_DECRYPT || !SECRET_STR) {
	console.log('Usage: bin/decrypter.mjs <file to decrypt> <secret>')
	process.exit(1)
}

const encryptedFileContent = fs.readFileSync(path.join(process.cwd(), FILE_TO_DECRYPT)).toString()
const encryptedObject = JSON.parse(encryptedFileContent)
const SECRET = Buffer.from(SECRET_STR, 'hex')
const IV = Buffer.from(encryptedObject.iv, 'hex')
let decipher = crypto.createDecipheriv('aes-256-cbc', SECRET, IV)
const decryptedMessage = Buffer.concat([decipher.update(Buffer.from(encryptedObject.message, 'base64')), decipher.final()]).toString()

console.log(decryptedMessage)
