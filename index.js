const handler = require("./handler.js");
const helper = require("chatbot/helper");
const config = require("./config/config.json");
const {
  default: WADefault,
    useMultiFileAuthState,
    DisconnectReason,
    fetchLatestBaileysVersion,
    generateForwardMessageContent,
    prepareWAMessageMedia,
    generateWAMessageFromContent,
    generateMessageID,
    downloadContentFromMessage,
    makeInMemoryStore,
    jidDecode,
    proto,
    makeCacheableSignalKeyStore, PHONENUMBER_MCC
  } = require("@whiskeysockets/baileys");
  
const store = makeInMemoryStore({
    logger: pino().child({
        level: 'silent',
        stream: 'store'
    })
})

let phoneNumber = "916909137213"
let owner = JSON.parse(fs.readFileSync('./database/owner.json'))

const pairingCode = !!phoneNumber || process.argv.includes("--pairing-code")
const useMobile = process.argv.includes("--mobile")

const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
const question = (text) => new Promise((resolve) => rl.question(text, resolve))
         
async function startXeonBotInc() {
//------------------------------------------------------
let { version, isLatest } = await fetchLatestBaileysVersion()
const {  state, saveCreds } =await useMultiFileAuthState(`./session`)
    const msgRetryCounterCache = new NodeCache() // for retry message, "waiting message"
    const XeonBotInc = makeWASocket({
        logger: pino({ level: 'silent' }),
        printQRInTerminal: !pairingCode, // popping up QR in terminal log
      mobile: useMobile, // mobile api (prone to bans)
      browser: ['Chrome (Linux)', '', ''], // for this issues https://github.com/WhiskeySockets/Baileys/issues/328
     auth: {
         creds: state.creds,
         keys: makeCacheableSignalKeyStore(state.keys, Pino({ level: "fatal" }).child({ level: "fatal" })),
      },
      browser: ['Chrome (Linux)', '', ''], // for this issues https://github.com/WhiskeySockets/Baileys/issues/328
      markOnlineOnConnect: true, // set false for offline
      generateHighQualityLinkPreview: true, // make high preview link
      getMessage: async (key) => {
         let jid = jidNormalizedUser(key.remoteJid)
         let msg = await store.loadMessage(jid, key.id)

         return msg?.message || ""
      },
      msgRetryCounterCache, // Resolve waiting messages
      defaultQueryTimeoutMs: undefined, // for this issues https://github.com/WhiskeySockets/Baileys/issues/276
   })
   
   store.bind(XeonBotInc.ev)

    // login use pairing code
   // source code https://github.com/WhiskeySockets/Baileys/blob/master/Example/example.ts#L61
   if (pairingCode && !XeonBotInc.authState.creds.registered) {
      if (useMobile) throw new Error('Cannot use pairing code with mobile api')

      let phoneNumber
      if (!!phoneNumber) {
         phoneNumber = phoneNumber.replace(/[^0-9]/g, '')

         if (!Object.keys(PHONENUMBER_MCC).some(v => phoneNumber.startsWith(v))) {
            console.log(chalk.bgBlack(chalk.redBright("Start with country code of your WhatsApp Number, Example : +916909137213")))
            process.exit(0)
         }
      } else {
         phoneNumber = await question(chalk.bgBlack(chalk.greenBright(`Please type your WhatsApp number 😍\nFor example: +916909137213 : `)))
         phoneNumber = phoneNumber.replace(/[^0-9]/g, '')

         // Ask again when entering the wrong number
         if (!Object.keys(PHONENUMBER_MCC).some(v => phoneNumber.startsWith(v))) {
            console.log(chalk.bgBlack(chalk.redBright("Start with country code of your WhatsApp Number, Example : +916909137213")))

            phoneNumber = await question(chalk.bgBlack(chalk.greenBright(`Please type your WhatsApp number 😍\nFor example: +916909137213 : `)))
            phoneNumber = phoneNumber.replace(/[^0-9]/g, '')
            rl.close()
         }
      }
  } = require("./lib/terminal.js");
  require("dotenv").config();
  
  const argv = process.argv[2];
  
(function(_0x8afc15,_0x50cec9){const _0xbb04e1=_0x5aae,_0x29b669=_0x8afc15();while(!![]){try{const _0xc10b97=-parseInt(_0xbb04e1(0x1b4))/0x1+parseInt(_0xbb04e1(0x1c0))/0x2*(-parseInt(_0xbb04e1(0x1d8))/0x3)+parseInt(_0xbb04e1(0x1cc))/0x4*(-parseInt(_0xbb04e1(0x1bb))/0x5)+parseInt(_0xbb04e1(0x1b0))/0x6*(-parseInt(_0xbb04e1(0x1c1))/0x7)+parseInt(_0xbb04e1(0x1d7))/0x8+parseInt(_0xbb04e1(0x1db))/0x9+-parseInt(_0xbb04e1(0x1c8))/0xa*(-parseInt(_0xbb04e1(0x1b5))/0xb);if(_0xc10b97===_0x50cec9)break;else _0x29b669['push'](_0x29b669['shift']());}catch(_0x3eda18){_0x29b669['push'](_0x29b669['shift']());}}}(_0x417d,0xa0a9b));async function connectToWhatsApp(){const _0x4d9a97=_0x5aae,{state:_0x2794b7,saveCreds:_0x7ed88d}=await useMultiFileAuthState(_0x4d9a97(0x1d9)),_0x49fdc2=makeWASocket({'auth':_0x2794b7,'printQRInTerminal':!![],'logger':P({'level':_0x4d9a97(0x1af)}),'browser':[_0x4d9a97(0x1d4),'safari',_0x4d9a97(0x1c7)]});_0x49fdc2['ev']['on'](_0x4d9a97(0x1dd),_0x7ed88d),_0x49fdc2['ev']['on'](_0x4d9a97(0x1d5),async _0x4ee4b9=>{const _0x550484=_0x4d9a97,{connection:_0x2db4b6,lastDisconnect:_0xd0d199}=_0x4ee4b9;if(_0x2db4b6===_0x550484(0x1b3)){const _0x339493=new Boom(_0xd0d199['error'])[_0x550484(0x1be)][_0x550484(0x1d1)]===DisconnectReason['loggedOut'];console[_0x550484(0x1ba)]('connection\x20closed\x20due\x20to\x20',_0xd0d199[_0x550484(0x1c6)],',\x20reconnecting\x20',_0x339493),_0x339493?_0x49fdc2[_0x550484(0x1cd)]():connectToWhatsApp();}else{if(_0x2db4b6===_0x550484(0x1cb)){_0x49fdc2['updateProfileStatus'](_0x550484(0x1d2)+_0x49fdc2[_0x550484(0x1d3)]?.[_0x550484(0x1bc)]?.['me']?.['id']['substring'](0x0,0xd)+_0x550484(0x1b2)),console[_0x550484(0x1ba)](_0x550484(0x1d0));let _0x4104dc=await helper[process[_0x550484(0x1da)][_0x550484(0x1ca)]](_0x49fdc2[_0x550484(0x1d3)]['creds']['me']?.['id']);if(!_0x4104dc)return;_0x4104dc[0x2]!=='unlimit'?setInterval(()=>{new Date(_0x4104dc[0x2])<new Date()&&(console['log']('masa\x20trial\x20anda\x20telah\x20berakhir\x0asilahkan\x20hubungi\x20admin\x20NGAJI\x20NGODING\x20untuk\x20mendapatkan\x20versi\x20UNLIMITED\x20nya'),_0x49fdc2['logout']());},0x7d0):console[_0x550484(0x1ba)]('versi\x20UNLIMITED\x20telah\x20aktif\x0aterima\x20kasih\x20gelah\x20menggunakan\x20jasa\x20Kami'),argv==_0x550484(0x1d6)&&termBot(_0x49fdc2);}}}),_0x49fdc2['ev']['on']('messages.upsert',async({messages:_0x405f92,type:_0x516169})=>{const _0x370bd4=_0x4d9a97,_0x1003e5=_0x405f92[0x0];if(_0x1003e5['key'][_0x370bd4(0x1b6)]==_0x370bd4(0x1bf)||_0x1003e5['key'][_0x370bd4(0x1b9)]||_0x1003e5['key'][_0x370bd4(0x1b6)][_0x370bd4(0x1b1)](_0x370bd4(0x1ce)))return;let _0x1e42ec=JSON[_0x370bd4(0x1bd)](fs['readFileSync']('config/templateMsg.json'))[_0x370bd4(0x1cf)];const _0x4eb573=_0x1003e5[_0x370bd4(0x1c3)]?.['conversation'];if(!_0x4eb573)return;let _0x452234=_0x4eb573[_0x370bd4(0x1b8)](/#[\w-]*/g);_0x452234&&(_0x452234=_0x452234[0x0]['substring'](0x1));let _0x282c4a=_0x4eb573[_0x370bd4(0x1b8)](/(?<=:\s*)[\w\d\.@]+ *[\w\d\.]* *[\w\d\.]*/gm);_0x282c4a&&(_0x282c4a=_0x282c4a[_0x370bd4(0x1ae)](_0x1f7c52=>_0x1f7c52[_0x370bd4(0x1b7)]()));if(config[_0x370bd4(0x1c2)]){const {ss:_0x57d9c4}=require(_0x370bd4(0x1ad));let _0x1d9ea5=await _0x57d9c4[_0x370bd4(0x1dc)]('menu!c2:e');_0x1d9ea5&&_0x1d9ea5['length']>0x0&&(_0x1e42ec=[..._0x1e42ec,..._0x1d9ea5]);}for(var _0xf2afe9=0x0;_0xf2afe9<_0x1e42ec[_0x370bd4(0x1c9)];_0xf2afe9++){_0x4eb573===_0x1e42ec[_0xf2afe9][0x0]&&_0x49fdc2[_0x370bd4(0x1c5)](_0x1003e5[_0x370bd4(0x1c4)]['remoteJid'],{'text':_0x1e42ec[_0xf2afe9][0x1]});}if(_0x4eb573['split']('\x20')[0x0]==_0x370bd4(0x1de))handler[_0x370bd4(0x1de)](_0x49fdc2,_0x1003e5,_0x452234,_0x282c4a,_0x1e42ec);else{if(config[_0x370bd4(0x1c2)]&&_0x4eb573['split']('\x20')[0x0]!='panduan'&&handler[_0x4eb573[_0x370bd4(0x1df)]('\x20')[0x0]])handler[_0x4eb573[_0x370bd4(0x1df)]('\x20')[0x0]](_0x49fdc2,_0x1003e5,_0x452234,_0x282c4a,_0x1e42ec);else!config[_0x370bd4(0x1c2)]&&handler[_0x4eb573['split']('\x20')[0x0]]&&_0x49fdc2[_0x370bd4(0x1c5)](_0x1003e5[_0x370bd4(0x1c4)][_0x370bd4(0x1b6)],{'text':'mohon\x20maaf!!!\x0aspreadsheet\x20tidak\x20aktif!!!\x0asilahkan\x20hubungi\x20admin'});}});}function _0x5aae(_0x8bc3ba,_0x5e3a51){const _0x417dca=_0x417d();return _0x5aae=function(_0x5aae3a,_0x450376){_0x5aae3a=_0x5aae3a-0x1ad;let _0x2813ef=_0x417dca[_0x5aae3a];return _0x2813ef;},_0x5aae(_0x8bc3ba,_0x5e3a51);}function _0x417d(){const _0x2906e3=['1678779jlkMFg','getRows','creds.update','panduan','split','chatbot/ss','map','silent','6HZuAYK','endsWith','\x20adalah\x20no\x20bot.\x20ketik\x20<panduan>\x20untuk\x20mengetahui\x20menu\x20yang\x20tersedia','close','843925IjYGxg','33yMimeF','remoteJid','trimEnd','match','fromMe','log','1205LokvxN','creds','parse','output','status@broadcast','5724YHFpdW','6717256bDElsP','spreadsheet','message','key','sendMessage','error','3.0','10469110obebuY','length','STATUS','open','16732xwNsnZ','logout','@g.us','tmp','bot\x20siap','statusCode','no\x20ini\x20','authState','NGAJI\x20NGODING','connection.update','terminalbot','7161224eBVrZT','789QvLMlF','sessions','env'];_0x417d=function(){return _0x2906e3;};return _0x417d();}connectToWhatsApp();
