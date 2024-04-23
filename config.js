import { watchFile, unwatchFile } from "fs"
import chalk from "chalk"
import { fileURLToPath } from "url"
import fs from "fs"
import cheerio from "cheerio"
import fetch from "node-fetch"
import axios from "axios"
import moment from "moment-timezone"

global.owner = [
["212xxxx", '𝙊𝙬𝙣𝙚𝙧', true],]

global.mods = []
global.prems = []

global.obtenerQrWeb = 0;
global.keepAliveRender = 0;


global.botNumberCode = ""
global.confirmCode = ""

global.lenguajeGB = en
global.mid = enDefault
global.version_language = '1.0 (global-GB)'

global.Key360 = ["global"]
global.openai_key = 'sk-0'
global.openai_org_id = 'org-3'
global.keysZens = ["LuOlangNgentot", "c2459db922", "37CC845916", "6fb0eff124", "hdiiofficial", "fiktod", "BF39D349845E", "675e34de8a", "0b917b905e6f"]
global.keysxxx = keysZens[Math.floor(keysZens.length * Math.random())]
global.keysxteammm = ["29d4b59a4aa687ca", "5LTV57azwaid7dXfz5fzJu", "cb15ed422c71a2fb", "5bd33b276d41d6b4", "HIRO", "kurrxd09", "ebb6251cc00f9c63"]
global.keysxteam = keysxteammm[Math.floor(keysxteammm.length * Math.random())]
global.keysneoxrrr = ["5VC9rvNx", "cfALv5"]
global.keysneoxr = keysneoxrrr[Math.floor(keysneoxrrr.length * Math.random())]
global.lolkeysapi = "global"
global.itsrose = ["4b146102c4d500809da9d1ff"]
global.baileys = "@whiskeysockets/baileys"

global.APIs = { 
xteam: 'https://api.xteam.xyz',
dzx: 'https://api.dhamzxploit.my.id',
lol: 'https://api.lolhuman.xyz',
violetics: 'https://violetics.pw',
neoxr: 'https://api.neoxr.my.id',
zenzapis: 'https://api.zahwazein.xyz',
akuari: 'https://api.akuari.my.id',
akuari2: 'https://apimu.my.id',	
fgmods: 'https://api.fgmods.xyz', 
botcahx: 'https://api.botcahx.biz.id',
ibeng: 'https://api.ibeng.tech/docs',	
rose: 'https://api.itsrose.site',
popcat : 'https://api.popcat.xyz',
xcoders : 'https://api-xcoders.site'
},
   
global.APIKeys = { 
'https://api.xteam.xyz': `${keysxteam}`,
'https://api.lolhuman.xyz': `${lolkeysapi}`,
'https://api.neoxr.my.id': `${keysneoxr}`,	
'https://violetics.pw': 'beta',
'https://api.zahwazein.xyz': `${keysxxx}`,
'https://api.fgmods.xyz': 'DRLg5kY7', 
'https://api-fgmods.ddns.net': 'fg-dylux',
'https://api.botcahx.biz.id': 'Admin',
'https://api.ibeng.tech/docs': 'tamvan',
'https://api.itsrose.site': 'Rs-Zeltoria',
'https://api-xcoders.site': 'Frieren'
}
global.cheerio = cheerio
global.fs = fs
global.fetch = fetch
global.axios = axios
global.moment = moment


global.official = [
["21xxxxxxx", 'global', 1]]

global.mail = ''
global.desc = ''
global.desc2 = ''
global.country = ''


global.packname = ``
global.author = ``

global.vs = "1.7.0"
global.vsJB = "2.5 (Beta)"
global.gt = "𝙂𝙖𝙩𝙖𝘽𝙤𝙩-𝙈𝘿"



global.rg = '𝙍𝙀𝙎𝙐𝙇𝙏'
global.resultado = rg

global.ag = '𝙒𝘼𝙍𝙉𝙄𝙉𝙂'
global.advertencia = ag

global.iig = '𝙄𝙉𝙁𝙊𝙍𝙈𝘼𝙏𝙄𝙊𝙉'
global.informacion = iig

global.fg = '𝙀𝙍𝙍𝙊𝙍'
global.fallo = fg

global.mg = '𝙐𝙎𝙀𝘿 𝙄𝙏 𝙒𝙍𝙊𝙉𝙂'
global.mal = mg

global.eeg = '𝙍𝙀𝙋𝙊𝙍𝙏'
global.envio = eeg

global.eg = '𝙎𝙐𝘾𝘾𝙀𝙎𝙎'
global.exito = eg


global.wm = ""
global.igfg = ""
global.nomorown = "212xxxxxxx"

global.botdate = `Date :  ${moment.tz('America/Los_Angeles').format('DD/MM/YY')}`;
global.bottime = `Time : ${moment.tz('America/Los_Angeles').format('HH:mm:ss')}`;
global.fgif = {
key: {
participant : '0@s.whatsapp.net'},
message: { 
"videoMessage": { 
"title": wm,
"h": `Hmm`,
'seconds': '999999999', 
'gifPlayback': 'true', 
'caption': bottime,
'jpegThumbnail': fs.readFileSync('./media/menus/Menu3.jpg')
}}}

global.multiplier = 200

let file = fileURLToPath(import.meta.url);
watchFile(file, () => {
unwatchFile(file);
console.log(chalk.redBright("Update 'config.js'"));
import(`${file}?update=${Date.now()}`);
})
