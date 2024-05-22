export const PORT = 80
export const BOT_TOKEN = process.env.BOT_TOKEN
export const EXPLORER_URL="https://polygonscan.com"
export const WEBPAGE_DOMAIN="http://wallet-bridge.s3-website-us-east-1.amazonaws.com"
export const SERVER_DOMAIN='http://ec2-18-209-66-210.compute-1.amazonaws.com'
export const EVENTS_ENDPOINT=`${SERVER_DOMAIN}/event`
export const SIGNATURE_SOURCE=`${SERVER_DOMAIN}/signature?message={message}`
export const TRANSACTION_SOURCE=`${SERVER_DOMAIN}/transaction?value={value}`

