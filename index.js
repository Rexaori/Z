const handler = require("./handler.js");
const {
  default: makeWASocket,
    useSingleFileAuthState
  } = require("@adiwajshing/baileys");
  const P = require("pino");
  const fs = require("fs");

  const {
    state,
    saveState
  } = useSingleFileAuthState("session.json")
  async function connectToWhatsApp() {
    const conn = makeWASocket({
      auth: state,
      printQRInTerminal: true,
      logger: P({
        level: "debug"
      }),
      browser: ["NGAJI NGODING", "safari", "3.0"]
    });
    conn.ev.on('connection.update', (update) => {
      const {
        connection, lastDisconnect
      } = update
      if (connection === 'close') {
        const shouldReconnect = lastDisconnect?.error?.output?.statusCode !== (401 | 500)?false: true;
        console.log('connection closed due to ', lastDisconnect.error, ', reconnecting ', shouldReconnect)
        // // reconnect if not logged out
        if (!shouldReconnect) {
          connectToWhatsApp()
        }
      } else if (connection === 'open') {
        console.log('opened connection')
      }
    })
    //save State
    conn.ev.on ('creds.update',
      saveState)
    conn.ev.on("messages.upsert",
      async ({
        messages, type
      }) => {
        const msg = messages[0];
        if (msg.key.remoteJid == "status@broadcast")return;
        if (msg.key.fromMe) return;
        const pesan = msg.message?.conversation;
        const command = /!\w*/y.exec(pesan);
        const option = pesan.match(/#\w*/g);
        let data = await pesan.match(/:[\w .']*/gm);
        if (data) {
          data = await data.map((d) => {
            return d.replace(/: |:/gm, "");
          });
        }
        let listCmd = [
          "!daftar",
          "!izin",
          "!list",
          "!info",
          "!panduan",
          "!formulirppdb",
        ];
        let cmd = listCmd.find((c) => {
          return c == command;
        });

        // routes
        if (command == "!daftar") {
          handler.daftar(conn, msg, data);
        }
        if (command == "!izin") {
          conn.sendMessage(
            msg.key.remoteJid,
            {text:`menu ${command} masih dalam proses perbaikan`});
        }
        if (command == "!list") {
          handler.listSiswa(conn, msg.key.remoteJid, data);
        }
        if (command == "!info") {
          handler.info(conn, msg, option, data).catch((err) => {
            console.log(err);
          });
        }
        if (command == "!formulirppdb") {
          handler.formulir(conn, msg, data);
        }
        if (command == "!panduan") {
          conn.sendMessage(
            msg.key.remoteJid, {
              text: `berikut daftar menu layanan informasi yang tersedia di sini.\n*info jadwal KBM*\nketik\n!info #jadwal :Hari :kelas\ncontoh\n!info #jadwal :Ahad :6A\n\n*info pembayaran*\nuntuk melihat pembayaran, nomor wa yg digunakan harus terdaftar terlebih dahalu dengan nama siswa yang sudah ada di sistem. untuk melihat nama siswa yang sudah ada ada sistem ketikkan\n!list :kelas\ncontoh\n!list :6A\nsetelah itu ketik\n!daftar :Nama Siswa :kelas\ncontoh\n!daftar :Muhammad Rofasya Gibran :3\nuntuk penulisan nama harus sama persis dengan yang ada pada list/daftar siswa pada menu !list baik huruf kapital (besar), titik dan sebagainya. 1 nomer hanya bisa digunakan untuk 1 siswa. setelah terdaftar, untuk melihat data pembayaran, baik yang telah dibayarkan dan sisa tunggakan silahkan ketik\n!info #pembayaran\n\ndemikian informasi ini semoga bermanfaat`
            }
          );
        }
        if (command && !cmd) {
          conn.sendMessage(
            msg.key.remoteJid,
            {text:`menu ${command} tidak tersedia.\nketik *!panduan* untuk cara menggunakan layanan ini `});
        }
        if (!command) {
          conn.sendMessage(
            msg.key.remoteJid,
            {
              text: "Selamat datang di sistem layanan informasi MI RAUDLATUL ULUM PUTRA via WHATSAPP, \nketik *!panduan* untuk cara menggunakan layanan ini"
            }
          );
          return;
        }
      });
  }

  // run in main file
  connectToWhatsApp()

  //*info jadwal PAS*\nketik\n!info #jadwalpas :kelas\ncontoh\n!info #jadwalpas :6\n\n
