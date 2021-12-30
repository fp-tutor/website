import type { NextApiRequest, NextApiResponse } from 'next'
import { GoogleSpreadsheet } from 'google-spreadsheet'

const envVars = [
  'GOOGLE_SPREADSHEET_ID',
  'GOOGLE_SERVICE_ACCOUNT_EMAIL',
  'GOOGLE_PRIVATE_KEY',
]

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  for (const varName of envVars) {
    if (typeof process.env[varName] === 'undefined') {
      throw new Error(`No ${varName} environment variable set`)
    }
  }

  const doc = new GoogleSpreadsheet(process.env.GOOGLE_SPREADSHEET_ID)

  await doc.useServiceAccountAuth({
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  })
  await doc.loadInfo()

  const sheet = doc.sheetsByIndex[req.body.id - 1]

  await sheet.addRow(req.body.form)
  console.log(req)
  res.status(200).json({ result: 'Hello' })
}
