import { SIGNATURE_SOURCE, TRANSACTION_SOURCE, WEBPAGE_DOMAIN, EVENTS_ENDPOINT } from './config.js'

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

export const buildTransactionUrl = ({ value, botName, chatId }) => {
  const transactionSource = encodeURIComponent(TRANSACTION_SOURCE.replace('{value}', value))
  return `${WEBPAGE_DOMAIN}?` + [
    `botName=${botName}`,
    'type=transaction',
    `uid=${chatId}`,
    `source=${transactionSource}`,
    `callback=${encodeURIComponent(EVENTS_ENDPOINT)}`
  ].join('&')
}


export const formSignatureData = text => {
  return {
    "domain": {
      "name": "Demo",
      "version": "1",
      "chainId": 1,
      "verifyingContract": "0x0000000000000000000000000000000000000000"
    },
    "primaryType": "DemoData",
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
  }
}

export const formTransactionData = value => {
  return {
    "chainId": 137,
    "address": "0x625E7708f30cA75bfd92586e17077590C60eb4cD",
    "abi": [
      "function approve(address spender, uint256 value)"
    ],
    "functionName": "approve",
    "args": [
      "0x0000000000000000000000000000000000000000",
      value
    ]
  }
}

