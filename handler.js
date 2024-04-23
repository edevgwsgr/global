import {generateWAMessageFromContent} from '@whiskeysockets/baileys';
import { smsg } from './lib/simple.js'
import { format } from 'util'
import { fileURLToPath } from 'url'
import path, { join } from 'path'
import { unwatchFile, watchFile } from 'fs'
import chalk from 'chalk'   
import fetch from 'node-fetch' 
 
/**
 * @type {import('@adiwajshing/baileys')}  
 */
const { proto } = (await import('@whiskeysockets/baileys')).default
const isNumber = x => typeof x === 'number' && !isNaN(x)
const delay = ms => isNumber(ms) && new Promise(resolve => setTimeout(function () {
clearTimeout(this)
resolve()
}, ms))

/**
 * Handle messages upsert
 * @param {import('@adiwajshing/baileys').BaileysEventMap<unknown>['messages.upsert']} groupsUpdate 
 */
export async function handler(chatUpdate) {
this.msgqueque = this.msgqueque || [];
this.uptime = this.uptime || Date.now();
if (!chatUpdate) {
return;
}
this.pushMessage(chatUpdate.messages).catch(console.error);
let m = chatUpdate.messages[chatUpdate.messages.length - 1];
if (!m) {
return;
}
if (global.db.data == null) await global.loadDatabase()
/*------------------------------------------------*/	     
if (global.chatgpt.data === null) await global.loadChatgptDB()
/*------------------------------------------------*/	
try {
m = smsg(this, m) || m
if (!m)
return
m.exp = 0
m.limit = false
m.money = false
try {
// TODO: use loop to insert data instead of this
let user = global.db.data.users[m.sender]
/*------------------------------------------------*/	            
let chatgptUser = global.chatgpt.data.users[m.sender];
if (typeof chatgptUser !== "object")
global.chatgpt.data.users[m.sender] = [];		
/*------------------------------------------------*/
if (typeof user !== 'object')
global.db.data.users[m.sender] = {}
if (user) {
if (!isNumber(user.exp)) user.exp = 0
if (!('premium' in user)) user.premium = false
if (!isNumber(user.joincount)) user.joincount = 1
if (!isNumber(user.money)) user.money = 150
if (!isNumber(user.limit)) user.limit = 15 	       
if (!('registered' in user)) user.registered = false
if (!('registroR' in user)) user.registroR = false
if (!('registroC' in user)) user.registroC = false  
if (!isNumber(user.IDregister)) user.IDregister = 0 
	
if (!user.registered) {
if (!('name' in user)) user.name = m.name
if (!('age' in user)) user.age = 0
if (!('descripcion' in user)) user.descripcion = 0
if (!('genero' in user)) user.genero = 0
if (!('identidad' in user)) user.identidad = 0
if (!('pasatiempo' in user)) user.pasatiempo = 0
if (!('tiempo' in user)) user.tiempo = 0 
if (!('miestado' in user)) user.miestado = 0
if (!('midLanguage' in user)) user.midLanguage = 0
if (!isNumber(user.premLimit)) user.premLimit = 0
if (!isNumber(user.premiumDate)) user.premiumDate = -1
if (!isNumber(user.regTime)) user.regTime = -1
}
	
if (!isNumber(user.counterPrivate)) user.counterPrivate = 0	                    		    
if (!isNumber(user.afk)) user.afk = -1
//if (!('autolevelup' in user))  user.autolevelup = true
if (!isNumber(user.reporte)) user.reporte = 0
if (!('role' in user)) user.role = '*NOVATO(A)* 🪤'
if (!isNumber(user.diamond)) user.diamond = 3
if (!isNumber(user.exp)) user.exp = 0
if (!isNumber(user.level)) user.level = 0
if (!isNumber(user.limit)) user.limit = 15
if (!isNumber(user.limitjoinfree)) user.limitjoinfree = 1
if (!isNumber(user.money)) user.money = 150
if (!isNumber(user.wallet)) user.wallet = 0
if (!isNumber(user.warn)) user.warn = 0
if (!user.lbars) user.lbars = '[▒▒▒▒▒▒▒▒▒]'
if (!user.job) user.job = 'Desempleo'
if (!user.premium) user.premium = false
if (!user.premium) user.premiumTime = 0
if (!user.rtrofi) user.rtrofi = 'Bronce'
} else
global.db.data.users[m.sender] = {
midLanguage: 0,
counterPrivate: 0,
afk: -1,
afkReason: '',
reporte: 0,
name: m.name,
age: 0,
genero: 0,
identidad: 0,
pasatiempo: 0,
tiempo: 0,
antispam: 0,
//autolevelup: true,
bank: 0,
banned: false,
BannedReason: '',
Banneduser: false,
diamond: 3,
exp: 0,
expg: 0,
exphero: 0,
expired: 0,
lbars: '[▒▒▒▒▒▒▒▒▒]',
level: 0,
limit: 15,
limitjoinfree: 1,
money: 100,
premium: false,
premiumTime: 0,
registered: false,
registroR: false,
registroC: false,
reglast: 0,
regTime: -1,
role: 'Novato',
roti: 0,
rtrofi: 'bronce',
skill: '',
skillexp: 0,	
}
let akinator = global.db.data.users[m.sender].akinator
if (typeof akinator !== 'object')
global.db.data.users[m.sender].akinator = {}
if (akinator) {
if (!('sesi' in akinator)) akinator.sesi = false
if (!('server' in akinator)) akinator.server = null
if (!('frontaddr' in akinator)) akinator.frontaddr = null
if (!('session' in akinator)) akinator.session = null
if (!('signature' in akinator)) akinator.signature = null
if (!('question' in akinator)) akinator.question = null
if (!('progression' in akinator)) akinator.progression = null
if (!('step' in akinator)) akinator.step = null
if (!('soal' in akinator)) akinator.soal = null
} else
global.db.data.users[m.sender].akinator = {
sesi: false,
server: null,
frontaddr: null,
session: null,
signature: null,
question: null,
progression: null,
step: null, 
soal: null
}   		
let chat = global.db.data.chats[m.chat]
if (typeof chat !== 'object')
global.db.data.chats[m.chat] = {}
		
if (chat) {
if (!('isBanned' in chat)) chat.isBanned = false         
if (!('welcome' in chat)) chat.welcome = false           
if (!('detect' in chat)) chat.detect = false               
if (!('sWelcome' in chat)) chat.sWelcome = ''          
if (!('sBye' in chat)) chat.sBye = ''                    
if (!('sPromote' in chat)) chat.sPromote = ''             
if (!('sDemote' in chat)) chat.sDemote = '' 
if (!('delete' in chat)) chat.delete = false                   
if (!('modohorny' in chat)) chat.modohorny = true       
if (!('stickers' in chat)) chat.stickers = false            
if (!('autosticker' in chat)) chat.autosticker = false      
if (!('audios' in chat)) chat.audios = false               
if (!('antiver' in chat)) chat.antiver = false             
if (!('antiLink' in chat)) chat.antiLink = false      
if (!('antiLink2' in chat)) chat.antiLink2 = false
if (!('antiTiktok' in chat)) chat.antiTiktok = false
if (!('antiYoutube' in chat)) chat.antiYoutube = false
if (!('antiTelegram' in chat)) chat.antiTelegram = false
if (!('antiFacebook' in chat)) chat.antiFacebook = false
if (!('antiInstagram' in chat)) chat.antiInstagram = false
if (!('antiTwitter' in chat)) chat.antiInstagram = false
if (!('antifake' in chat)) chat.antifake = false
if (!('reaction' in chat)) chat.reaction = true    
if (!('viewonce' in chat)) chat.viewonce = false       
if (!('modoadmin' in chat)) chat.modoadmin = false    
if (!('antitoxic' in chat)) chat.antitoxic = false
if (!('game' in chat)) chat.game = false
if (!('game2' in chat)) chat.game2 = false
if (!('simi' in chat)) chat.simi = false
if (!('antiTraba' in chat)) chat.antiTraba = false
if (!('autolevelup' in chat))  chat.autolevelup = false
if (!isNumber(chat.expired)) chat.expired = 0
} else
global.db.data.chats[m.chat] = {
isBanned: false,
welcome: false,
detect: false,
sWelcome: '',
sBye: '',
sPromote: '',
sDemote: '', 
delete: false,
modohorny: true,
stickers: false,
autosticker: false,
audios: false,
antiver: false,
antiLink: false,
antiLink2: false,
antiTiktok: false,
antiYoutube: false,
antiTelegram: false,
antiFacebook: false,
antiInstagram: false,
antiTwitter: false,
antifake: false,
reaction: true,
viewonce: true,
modoadmin: false,
antitoxic: false,
game: false, 
game2: false, 
simi: false,
antiTraba: false,
autolevelup: false,
expired: 0,
}
let settings = global.db.data.settings[this.user.jid]
if (typeof settings !== 'object') global.db.data.settings[this.user.jid] = {}
if (settings) {
if (!('self' in settings)) settings.self = false
if (!('autoread' in settings)) settings.autoread = true
if (!('autoread2' in settings)) settings.autoread2 = true
if (!('restrict' in settings)) settings.restrict = true
if (!('temporal' in settings)) settings.temporal = false
if (!('antiPrivate' in settings)) settings.antiPrivate = false
if (!('antiCall' in settings)) settings.antiCall = true
if (!('antiSpam' in settings)) settings.antiSpam = true 
if (!('modoia' in settings)) settings.modoia = false
if (!('jadibotmd' in settings)) settings.jadibotmd = false  
} else global.db.data.settings[this.user.jid] = {
self: false,
autoread: true,
autoread2: true,
restrict: true,
temporal: false,
antiPrivate: false,
antiCall: true,
antiSpam: true,
modoia: false, 
jadibotmd: true,
}} catch (e) {
console.error(e)
}

const isROwner = [conn.decodeJid(global.conn.user.id), ...global.owner.map(([number]) => number)].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
const isOwner = isROwner || m.fromMe
const isMods = isOwner || global.mods.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
//const isPrems = isROwner || global.prems.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
const isPrems = isROwner || global.db.data.users[m.sender].premiumTime > 0
if (opts['queque'] && m.text && !(isMods || isPrems)) {
let queque = this.msgqueque, time = 1000 * 5
const previousID = queque[queque.length - 1]
queque.push(m.id || m.key.id)
setInterval(async function () {
if (queque.indexOf(previousID) === -1) clearInterval(this)
await delay(time)
}, time)
}

if (opts['nyimak']) return
if (!isROwner && opts['self']) return 
if (opts['pconly'] && m.chat.endsWith('g.us')) return
if (opts['gconly'] && !m.chat.endsWith('g.us')) return
if (opts['swonly'] && m.chat !== 'status@broadcast') return
if (typeof m.text !== 'string')
m.text = ''

if (m.isBaileys) return
m.exp += Math.ceil(Math.random() * 10)
let usedPrefix
let _user = global.db.data && global.db.data.users && global.db.data.users[m.sender]

const groupMetadata = (m.isGroup ? ((conn.chats[m.chat] || {}).metadata || await this.groupMetadata(m.chat).catch(_ => null)) : {}) || {}
const participants = (m.isGroup ? groupMetadata.participants : []) || []
const user = (m.isGroup ? participants.find(u => conn.decodeJid(u.id) === m.sender) : {}) || {} // User Data
const bot = (m.isGroup ? participants.find(u => conn.decodeJid(u.id) == this.user.jid) : {}) || {}
const isRAdmin = user?.admin == 'superadmin' || false
const isAdmin = isRAdmin || user?.admin == 'admin' || false //user admins? 
const isBotAdmin = bot?.admin || false //Detecta sin el bot es admin

const ___dirname = path.join(path.dirname(fileURLToPath(import.meta.url)), './plugins')
for (let name in global.plugins) {
let plugin = global.plugins[name]
if (!plugin)
continue
if (plugin.disabled)
continue
const __filename = join(___dirname, name)
if (typeof plugin.all === 'function') {
try {
await plugin.all.call(this, m, {
chatUpdate,
__dirname: ___dirname,
__filename
})
} catch (e) {
// if (typeof e === 'string') continue
console.error(e)
for (let [jid] of global.owner.filter(([number, _, isDeveloper]) => isDeveloper && number)) {
let data = (await conn.onWhatsApp(jid))[0] || {}
if (data.exists)
m.reply(`${lenguajeGB['smsCont1']()}\n\n${lenguajeGB['smsCont2']()}\n*_${name}_*\n\n${lenguajeGB['smsCont3']()}\n*_${m.sender}_*\n\n${lenguajeGB['smsCont4']()}\n*_${m.text}_*\n\n${lenguajeGB['smsCont5']()}\n\`\`\`${format(e)}\`\`\`\n\n${lenguajeGB['smsCont6']()}`.trim(), data.jid)
}}}
if (!opts['restrict'])
if (plugin.tags && plugin.tags.includes('admin')) {
// global.dfail('restrict', m, this)
continue
}
const str2Regex = str => str.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&')
let _prefix = plugin.customPrefix ? plugin.customPrefix : conn.prefix ? conn.prefix : global.prefix
let match = (_prefix instanceof RegExp ? // RegExp Mode?
[[_prefix.exec(m.text), _prefix]] :
Array.isArray(_prefix) ? // Array?
_prefix.map(p => {
let re = p instanceof RegExp ? // RegExp in Array?
p :
new RegExp(str2Regex(p))
return [re.exec(m.text), re]
}) :
typeof _prefix === 'string' ? // String?
[[new RegExp(str2Regex(_prefix)).exec(m.text), new RegExp(str2Regex(_prefix))]] :
[[[], new RegExp]]
).find(p => p[1])
if (typeof plugin.before === 'function') {
if (await plugin.before.call(this, m, {
match,
conn: this,
participants,
groupMetadata,
user,
bot,
isROwner,
isOwner,
isRAdmin,
isAdmin,
isBotAdmin,
isPrems,
chatUpdate,
__dirname: ___dirname,
__filename
}))
continue
}
if (typeof plugin !== 'function')
continue
if ((usedPrefix = (match[0] || '')[0])) {
let noPrefix = m.text.replace(usedPrefix, '')
let [command, ...args] = noPrefix.trim().split` `.filter(v => v)
args = args || []
let _args = noPrefix.trim().split` `.slice(1)
let text = _args.join` `
command = (command || '').toLowerCase()
let fail = plugin.fail || global.dfail // When failed
let isAccept = plugin.command instanceof RegExp ? // RegExp Mode?
plugin.command.test(command) :
Array.isArray(plugin.command) ? // Array?
plugin.command.some(cmd => cmd instanceof RegExp ? // RegExp in Array?
cmd.test(command) :
cmd === command
) :
typeof plugin.command === 'string' ? // String?
plugin.command === command :
false

if (!isAccept)
continue
m.plugin = name
if (m.chat in global.db.data.chats || m.sender in global.db.data.users) {
let chat = global.db.data.chats[m.chat]
let user = global.db.data.users[m.sender]
if (!['owner-unbanchat.js'].includes(name) && chat && chat.isBanned && !isROwner) return // Except this
if (name != 'owner-unbanchat.js' && name != 'owner-exec.js' && name != 'owner-exec2.js' && name != 'tool-delete.js' && chat?.isBanned && !isROwner) return 
if (m.text && user.banned && !isROwner) {
if (user.antispam > 2) return
m.reply(`🚫 *ESTÁ BANEADO(A), NO PUEDE USAR COMANDOS*\n📑 *MOTIVO: ${user.messageSpam === 0 ? 'NO ESPECIFICADO' : user.messageSpam}*\n⚠️ \`\`\`SI ESTE BOT ES CUENTA OFICIAL Y TIENE EVIDENCIA QUE RESPALDE QUE ESTE MENSAJE ES UN ERROR, PUEDE EXPONER SU CASO EN:\`\`\`👉 *${ig}*\n👉 ${asistencia}`)
user.antispam++	
return
}

//Antispam		
if (user.antispam2 && isROwner) return
let time = global.db.data.users[m.sender].spam + 5000
if (new Date - global.db.data.users[m.sender].spam < 5000) throw console.log(`[ SPAM ]`) 
global.db.data.users[m.sender].spam = new Date * 1
}
		
let hl = _prefix 
let adminMode = global.db.data.chats[m.chat].modoadmin
let gata = `${plugins.botAdmin || plugins.admin || plugins.group || plugins || noPrefix || hl ||  m.text.slice(0, 1) == hl || plugins.command}`
if (adminMode && !isOwner && !isROwner && m.isGroup && !isAdmin && gata) return   
if (plugin.rowner && plugin.owner && !(isROwner || isOwner)) { //número bot owner
fail('owner', m, this)
continue
}
if (plugin.rowner && !isROwner) { //Owner
fail('rowner', m, this)
continue
}
if (plugin.owner && !isOwner) { //Propietario/Owner
fail('owner', m, this)
continue
}
if (plugin.mods && !isMods) { // Moderator
fail('mods', m, this)
continue
}
if (plugin.premium && !isPrems) { // Premium
fail('premium', m, this)
continue
}
if (plugin.group && !m.isGroup) { //Solo el grupo
fail('group', m, this)
continue
} else if (plugin.botAdmin && !isBotAdmin) { //Detecta si el bot es admins
fail('botAdmin', m, this)
continue
} else if (plugin.admin && !isAdmin) { //admins
fail('admin', m, this)
continue
}
if (plugin.private && m.isGroup) { //Solo chat privado
fail('private', m, this)
continue
}
if (plugin.register == true && _user.registered == false) { // user registrado? 
fail('unreg', m, this)
continue
}

m.isCommand = true
let xp = 'exp' in plugin ? parseInt(plugin.exp) : 10 // Ganancia de XP por comando
if (xp > 2000)
m.reply('Exp limit') // Hehehe
else               
if (!isPrems && plugin.money && global.db.data.users[m.sender].money < plugin.money * 1) {
//this.reply(m.chat, `🐈 𝙉𝙊 𝙏𝙄𝙀𝙉𝙀 𝙂𝘼𝙏𝘼𝘾𝙊𝙄𝙉𝙎`, m)
this.sendMessage(m.chat, {text: `🐈 𝙉𝙊 𝙏𝙄𝙀𝙉𝙀 𝙂𝘼𝙏𝘼𝘾𝙊𝙄𝙉𝙎`,  contextInfo: {externalAdReply :{ mediaUrl: null, mediaType: 1, description: null, title: gt, body: ' support@mee6.ai ', previewType: 0, thumbnail: gataImg.getRandom(), sourceUrl: accountsgb.getRandom()}}}, { quoted: m })         
continue     
}
			
m.exp += xp
if (!isPrems && plugin.limit && global.db.data.users[m.sender].limit < plugin.limit * 1) {
this.sendMessage(m.chat, {text: `${lenguajeGB['smsCont7']()} *${usedPrefix}buy*`,  contextInfo: {externalAdReply :{ mediaUrl: null, mediaType: 1, description: null, title: gt, body: ' support@mee6.ai ', previewType: 0, thumbnail: gataImg.getRandom(), sourceUrl: accountsgb.getRandom()}}}, { quoted: m })         
//this.reply(m.chat, `${lenguajeGB['smsCont7']()} *${usedPrefix}buy*`, m)
continue //Sin límite
}
if (plugin.level > _user.level) {
this.sendMessage(m.chat, {text: `${lenguajeGB['smsCont9']()} *${plugin.level}* ${lenguajeGB['smsCont10']()} *${_user.level}* ${lenguajeGB['smsCont11']()} *${usedPrefix}nivel*`,  contextInfo: {externalAdReply :{ mediaUrl: null, mediaType: 1, description: null, title: gt, body: ' 😻 𝗦𝘂𝗽𝗲𝗿 𝗚𝗮𝘁𝗮𝗕𝗼𝘁-𝗠𝗗 - 𝗪𝗵𝗮𝘁𝘀𝗔𝗽𝗽 ', previewType: 0, thumbnail: gataImg.getRandom(), sourceUrl: accountsgb.getRandom()}}}, { quoted: m })         
//this.reply(m.chat, `${lenguajeGB['smsCont9']()} *${plugin.level}* ${lenguajeGB['smsCont10']()} *${_user.level}* ${lenguajeGB['smsCont11']()} *${usedPrefix}nivel*`, m)
continue // Si no se ha alcanzado el nivel
}
let extra = {
match,
usedPrefix,
noPrefix,
_args,
args,
command,
text,
conn: this,
participants,
groupMetadata,
user,
bot,
isROwner,
isOwner,
isRAdmin,
isAdmin,
isBotAdmin,
isPrems,
chatUpdate,
__dirname: ___dirname,
__filename
}
try {
await plugin.call(this, m, extra)
if (!isPrems)
m.limit = m.limit || plugin.limit || false
m.money = m.money || plugin.money || false
} catch (e) {
// Error occured
m.error = e
console.error(e)
if (e) {
let text = format(e)
for (let key of Object.values(global.APIKeys))
text = text.replace(new RegExp(key, 'g'), '#HIDDEN#')
if (e.name)
for (let [jid] of global.owner.filter(([number, _, isDeveloper]) => isDeveloper && number)) {
let data = (await conn.onWhatsApp(jid))[0] || {}
if (data.exists)
m.reply(`${lenguajeGB['smsCont1']()}\n\n${lenguajeGB['smsCont2']()}\n*_${name}_*\n\n${lenguajeGB['smsCont3']()}\n*_${m.sender}_*\n\n${lenguajeGB['smsCont4']()}\n*_${m.text}_*\n\n${lenguajeGB['smsCont5']()}\n\`\`\`${format(e)}\`\`\`\n\n${lenguajeGB['smsCont6']()}`.trim(), data.jid)
}
m.reply(text)
}} finally {
// m.reply(util.format(_user))
if (typeof plugin.after === 'function') {
try {
await plugin.after.call(this, m, extra)
} catch (e) {
console.error(e)
}}
if (m.limit)
m.reply(+m.limit + lenguajeGB.smsCont8())
}
if (m.money)
m.reply(+m.money + ' 𝙂𝘼𝙏𝘼𝘾𝙊𝙄𝙉𝙎 🐱 𝙐𝙎𝘼𝘿𝙊(𝙎)')  
break
}}} catch (e) {
console.error(e)
} finally {
if (opts['queque'] && m.text) {
const quequeIndex = this.msgqueque.indexOf(m.id || m.key.id)
if (quequeIndex !== -1)
this.msgqueque.splice(quequeIndex, 1)
}
//console.log(global.db.data.users[m.sender])
let user, stats = global.db.data.stats
if (m) {
if (m.sender && (user = global.db.data.users[m.sender])) {
user.exp += m.exp
user.limit -= m.limit * 1
user.money -= m.money * 1
}

let stat
if (m.plugin) {
let now = +new Date
if (m.plugin in stats) {
stat = stats[m.plugin]
if (!isNumber(stat.total))
stat.total = 1
if (!isNumber(stat.success))
stat.success = m.error != null ? 0 : 1
if (!isNumber(stat.last))
stat.last = now
if (!isNumber(stat.lastSuccess))
stat.lastSuccess = m.error != null ? 0 : now
} else
stat = stats[m.plugin] = {
total: 1,
success: m.error != null ? 0 : 1,
last: now,
lastSuccess: m.error != null ? 0 : now
}
stat.total += 1
stat.last = now
if (m.error == null) {
stat.success += 1
stat.lastSuccess = now
}}}

try {
if (!opts['noprint']) await (await import(`./lib/print.js`)).default(m, this)
} catch (e) {
console.log(m, m.quoted, e)}
let settingsREAD = global.db.data.settings[this.user.jid] || {}  
if (opts['autoread']) await this.readMessages([m.key])
if (settingsREAD.autoread2) await this.readMessages([m.key])  
//if (settingsREAD.autoread2 == 'true') await this.readMessages([m.key])    
	    
if (db.data.chats[m.chat].reaction && m.text.match(/(ción|dad|aje|oso|izar|mente|pero|tion|age|ous|ate|and|but|ify)/gi)) {
let emot = pickRandom(["😀", "😃", "😄", "😁", "😆", "🥹", "😅", "😂", "🤣", "🥲", "☺️", "😊", "😇", "🙂", "🙃", "😉", "😌", "😍", "🥰", "😘", "😗", "😙", "😚", "😋", "😛", "😝", "😜", "🤪", "🤨", "🧐", "🤓", "😎", "🥸", "🤩", "🥳", "😏", "😒", "😞", "😔", "😟", "😕", "🙁", "☹️", "😣", "😖", "😫", "😩", "🥺", "😢", "😭", "😤", "😠", "😡", "🤬", "🤯", "😳", "🥵", "🥶", "😶‍🌫️", "😱", "😨", "😰", "😥", "😓", "🤗", "🤔", "🫣", "🤭", "🫢", "🫡", "🤫", "🫠", "🤥", "😶", "🫥", "😐", "🫤", "😑", "🫨", "😬", "🙄", "😯", "😦", "😧", "😮", "😲", "🥱", "😴", "🤤", "😪", "😮‍💨", "😵", "😵‍💫", "🤐", "🥴", "🤢", "🤮", "🤧", "😷", "🤒", "🤕", "🤑", "🤠", "😈", "👿", "👺", "🤡", "💩", "👻", "😺", "😸", "😹", "😻", "😼", "😽", "🙀", "😿", "😾", "🫶", "👍", "✌️", "🙏", "🫵", "🤏", "🤌", "☝️", "🖕", "🙏", "🫵", "🫂", "🐱", "🤹‍♀️", "🤹‍♂️", "🗿", "✨", "⚡", "🔥", "🌈", "🩷", "❤️", "🧡", "💛", "💚", "🩵", "💙", "💜", "🖤", "🩶", "🤍", "🤎", "💔", "❤️‍🔥", "❤️‍🩹", "❣️", "💕", "💞", "💓", "💗", "💖", "💘", "💝", "🏳️‍🌈", "👊", "👀", "💋", "🫰", "💅", "👑", "🐣", "🐤", "🐈"])
if (!m.fromMe) return this.sendMessage(m.chat, { react: { text: emot, key: m.key }})
}
function pickRandom(list) { return list[Math.floor(Math.random() * list.length)]}
}}

/**
 * Handle groups participants update
 * @param {import('@adiwajshing/baileys').BaileysEventMap<unknown>['group-participants.update']} groupsUpdate 
 */
export async function participantsUpdate({ id, participants, action }) {
if (opts['self'])
return
// if (id in conn.chats) return // First login will spam
if (this.isInit)
return
if (global.db.data == null)
await loadDatabase()
let chat = global.db.data.chats[id] || {}
let text = ''
switch (action) {
case 'add':
case 'remove':
if (chat.welcome) {
let groupMetadata = await this.groupMetadata(id) || (conn.chats[id] || {}).metadata
for (let user of participants) {
let pp = gataMenu.getRandom()
try {
pp = await this.profilePictureUrl(user, 'image')
} catch (e) {
} finally {
let apii = await this.getFile(pp)                                      
const botTt2 = groupMetadata.participants.find(u => this.decodeJid(u.id) == this.user.jid) || {} 
const isBotAdminNn = botTt2?.admin === "admin" || false
text = (action === 'add' ? (chat.sWelcome || this.welcome || conn.welcome || 'Welcome, @user!').replace('@subject', await this.getName(id)).replace('@desc', groupMetadata.desc?.toString() || 'MEE6') :
(chat.sBye || this.bye || conn.bye || 'Bye, @user!')).replace('@user', '@' + user.split('@')[0])
			    
if (chat.antifake && isBotAdminNn && action === 'add') {
const numerosPermitidos = ["1", "2", "4", "6", "7", "8", "9"] //PUEDES EDITAR LOS USUARIOS QUE SE ELIMINARÁN SI EMPIEZA POR CUALQUIER DE ESOS NÚMEROS	
if (numerosPermitidos.some(num => user.startsWith(num))) {	
this.sendMessage(id, { text:`*${lenguajeGB['smsAvisoAG']()}${lenguajeGB['smsInt1']()} @${user.split("@")[0]} ${lenguajeGB['smsInt2']()}*`, mentions: [user] }, { quoted: null });          
let responseb = await this.groupParticipantsUpdate(id, [user], 'remove')
if (responseb[0].status === "404") return      
return    
}}    
let fkontak2 = { "key": { "participants":"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${user.split('@')[0]}:${user.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` }}, "participant": "0@s.whatsapp.net" }      
this.sendMessage(id, { text: text, 
contextInfo:{
forwardingScore: 9999999,
isForwarded: true, 
mentionedJid:[user],
"externalAdReply": {
"showAdAttribution": true,
"renderLargerThumbnail": true,
"thumbnail": apii.data, 
"title": [wm, '' + gt + '', 'support@mee6.ai'].getRandom(),
"containsAutoReply": true,
"mediaType": 1, 
sourceUrl: [md, channel1, channel2, channel3, yt, ig, paypal, fb].getRandom()}}}, { quoted: fkontak2 })
//this.sendFile(id, apii.data, 'pp.jpg', text, null, false, { mentions: [user] }, { quoted: fkontak2 })
}}}
			    
break
case 'promote':
case 'daradmin':
case 'darpoder':
text = (chat.sPromote || this.spromote || conn.spromote || '@user ```is now Admin```')
case 'demote':
case 'quitarpoder':
case 'quitaradmin':
if (!text)
text = (chat.sDemote || this.sdemote || conn.sdemote || '@user ```is no longer Admin```')
text = text.replace('@user', '@' + participants[0].split('@')[0])
if (chat.detect)
//this.sendMessage(id, { text, mentions: this.parseMention(text) })
break
}}

/**
 * Handle groups update
 * @param {import('@adiwajshing/baileys').BaileysEventMap<unknown>['groups.update']} groupsUpdate 
 */
export async function groupsUpdate(groupsUpdate) {
if (opts['self'] && !isOwner && !isROwner)
return
for (const groupUpdate of groupsUpdate) {
const id = groupUpdate.id
if (!id) continue
let chats = global.db.data.chats[id], text = ''
if (!chats?.detect) continue
// if (groupUpdate.desc) text = (chats.sDesc || this.sDesc || conn.sDesc || '```Description has been changed to```\n@desc').replace('@desc', groupUpdate.desc)
//if (groupUpdate.subject) text = (chats.sSubject || this.sSubject || conn.sSubject || '```Subject has been changed to```\n@subject').replace('@subject', groupUpdate.subject)
//if (groupUpdate.icon) text = (chats.sIcon || this.sIcon || conn.sIcon || '```Icon has been changed to```').replace('@icon', groupUpdate.icon)
if (groupUpdate.revoke) text = (chats.sRevoke || this.sRevoke || conn.sRevoke || '```Group link has been changed to```\n@revoke').replace('@revoke', groupUpdate.revoke)
if (!text) continue
await this.sendMessage(id, { text, mentions: this.parseMention(text) })
}}

export async function callUpdate(callUpdate) {
let isAnticall = global.db.data.settings[this.user.jid].antiCall  
if (!isAnticall) return
for (let nk of callUpdate) { 
if (nk.isGroup == false) {
if (nk.status == "offer") {
let callmsg = await this.reply(nk.from, `${lenguajeGB['smsCont15']()} *@${nk.from.split('@')[0]}*, ${nk.isVideo ? lenguajeGB.smsCont16() : lenguajeGB.smsCont17()} ${lenguajeGB['smsCont18']()}`, false, { mentions: [nk.from] })
//let data = global.owner.filter(([id, isCreator]) => id && isCreator)
//await this.sendContact(nk.from, data.map(([id, name]) => [id, name]), false, { quoted: callmsg })
await this.updateBlockStatus(nk.from, 'block')
}}}}

export async function deleteUpdate(message) {
try {
const { fromMe, id, participant } = message
if (fromMe) return 
let msg = this.serializeM(this.loadMessage(id))
let chat = global.db.data.chats[msg?.chat] || {}
if (!chat?.delete) return 
if (!msg) return 
const antideleteMessage = `*╭━━⬣ ${lenguajeGB['smsCont19']()} ⬣━━ 𓃠*
${lenguajeGB['smsCont20']()} @${participant.split`@`[0]}
${lenguajeGB['smsCont21']()}
*╰━━━⬣ ${lenguajeGB['smsCont19']()} ⬣━━╯*`.trim();
await this.sendMessage(msg.chat, {text: antideleteMessage, mentions: [participant]}, {quoted: msg})
this.copyNForward(msg.chat, msg).catch(e => console.log(e, msg))
} catch (e) {
console.error(e)
}}

global.dfail = (type, m, conn) => {
let msg = {
        rowner: '𝐐𝐮𝐞𝐬𝐭𝐨 𝐜𝐨𝐦𝐚𝐧𝐝𝐨 𝐞̀ 𝐝𝐢𝐬𝐩𝐨𝐧𝐢𝐛𝐢𝐥𝐞 𝐬𝐨𝐥𝐨 𝐩𝐞𝐫 𝐨𝐰𝐧𝐞𝐫 🕵🏻‍♂️',
        owner: '𝐐𝐮𝐞𝐬𝐭𝐨 𝐜𝐨𝐦𝐚𝐧𝐝𝐨 𝐞̀ 𝐝𝐢𝐬𝐩𝐨𝐧𝐢𝐛𝐢𝐥𝐞 𝐬𝐨𝐥𝐨 𝐩𝐞𝐫 𝐨𝐰𝐧𝐞𝐫 🕵🏻‍♂️',
        mods: '𝐐𝐮𝐞𝐬𝐭𝐨 𝐜𝐨𝐦𝐚𝐧𝐝𝐨 𝐥𝐨 𝐩𝐨𝐬𝐬𝐨𝐧𝐨 𝐮𝐭𝐢𝐥𝐢𝐳𝐳𝐚𝐫𝐞 𝐬𝐨𝐥𝐨 𝐚𝐝𝐦𝐢𝐧 𝐞 𝐨𝐰𝐧𝐞𝐫 ⚙️',
        premium: '𝐐𝐮𝐞𝐬𝐭𝐨 𝐜𝐨𝐦𝐚𝐧𝐝𝐨 𝐞̀ 𝐩𝐞𝐫 𝐦𝐞𝐦𝐛𝐫𝐢 𝐩𝐫𝐞𝐦𝐢𝐮𝐦 ✅',
        group: '𝐐𝐮𝐞𝐬𝐭𝐨 𝐜𝐨𝐦𝐚𝐧𝐝𝐨 𝐩𝐮𝐨𝐢 𝐮𝐭𝐢𝐥𝐢𝐳𝐳𝐚𝐫𝐥𝐨 𝐢𝐧 𝐮𝐧 𝐠𝐫𝐮𝐩𝐩𝐨 👥',
        private: '𝐐𝐮𝐞𝐬𝐭𝐨 𝐜𝐨𝐦𝐚𝐧𝐝𝐨 𝐩𝐮𝐨𝐢 𝐮𝐭𝐢𝐥𝐢𝐳𝐳𝐚𝐫𝐥𝐨 𝐢𝐧 𝐜𝐡𝐚𝐭 𝐩𝐫𝐢𝐯𝐚𝐭𝐚 👤',
        admin: '𝐐𝐮𝐞𝐬𝐭𝐨 𝐜𝐨𝐦𝐚𝐧𝐝𝐨 𝐞̀ 𝐝𝐢𝐬𝐩𝐨𝐧𝐢𝐛𝐢𝐥𝐞 𝐩𝐞𝐫 𝐬𝐨𝐥𝐢 𝐚𝐝𝐦𝐢𝐧 👑',
        botAdmin: '𝐃𝐞𝐯𝐢 𝐝𝐚𝐫𝐞 𝐚𝐝𝐦𝐢𝐧 𝐚𝐥 𝐛𝐨𝐭 👑',
        restrict: '🔐 𝐑𝐞𝐬𝐭𝐫𝐢𝐜𝐭 𝐞 𝐝𝐢𝐬𝐚𝐭𝐭𝐢𝐯𝐚𝐭𝐨 🔐'}[type]
let tg = { quoted: m, userJid: conn.user.jid }
let prep = generateWAMessageFromContent(m.chat, { extendedTextMessage: { text: msg, contextInfo: { externalAdReply: { title: lenguajeGB.smsAvisoAG().slice(0,-2), body: [wm, '' + gt + '', 'support@mee6.ai'].getRandom(), thumbnail: gataImg.getRandom(), sourceUrl: [md, channel1, channel2, channel3, yt, ig, paypal, fb].getRandom() }}}}, tg)
if (msg) return conn.relayMessage(m.chat, prep.message, { messageId: prep.key.id })
}

const file = global.__filename(import.meta.url, true);
watchFile(file, async () => {
unwatchFile(file);
console.log(chalk.redBright('Update \'handler.js\''));
if (global.reloadHandler) console.log(await global.reloadHandler());
  
if (global.conns && global.conns.length > 0 ) {
const users = [...new Set([...global.conns.filter((conn) => conn.user && conn.ws.socket && conn.ws.socket.readyState !== ws.CLOSED).map((conn) => conn)])];
for (const userr of users) {
userr.subreloadHandler(false)
}}});
