import { SIGNATURE_SOURCE, WEBPAGE_DOMAIN, EVENTS_ENDPOINT } from './config.js'

export const buildSignatureUrl = ({ message, botName, chatId }) => {
  const signatureSource = encodeURIComponent(SIGNATURE_SOURCE.replace('{message}', message))
  return `${WEBPAGE_DOMAIN}?` + [
    `botName=${botName}`,
    'type=signature',
    `uid=${chatId}`,
    `source=${signatureSource}`,
    `callback=${encodeURIComponent(EVENTS_ENDPOINT)}`
  ].join('&')
}

export const formSignatureData = text => {
  return JSON.stringify({
    "domain": {
      "name": "Tether USD",
      "version": "1",
      "chainId": 1,
      "verifyingContract": "0xdAC17F958D2ee523a2206206994597C13D831ec7"
    },
    "primaryType": "Permit",
    "types": {
      "DemoData": [
        {
          "name": "message",
          "type": "string"
        }
      ]
    },
    "message": {
      "message": text
    }
  })
}

