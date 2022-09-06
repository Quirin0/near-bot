const {
	MessageType
} = require("@adiwajshing/baileys");
const fs = require("fs-extra")

const { getBuffer } = require('../lib/myfunc')
const { color, bgcolor } = require('../lib/color')

let setting = JSON.parse(fs.readFileSync('./setting.json'))



module.exports = welcome = async (pires, anu) => {
	    const welkom = JSON.parse(fs.readFileSync('./database/group/welcome.json'))
	    const isWelcome = welkom.includes(anu.jid)
		
		
    
	    if (!isWelcome) return
		try {
			    mem = anu.participants[0]
			    console.log(anu)
                try {
                pp_user = await pires.getProfilePicture(mem)
                } catch (e) {
                pp_user = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60'
            }
                try {
                pp_grup = await pires.getProfilePicture(anu.jid)
                } catch (e) {
                pp_grup = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60'
            }
            if (anu.action == 'add' && mem.includes(pires.user.jid)) {
            pires.sendMessage(anu.jid, 'Olá! Obrigado por me convidar, se você quiser usar um bot de digitação !menu', 'conversation')
            }
            if (anu.action == 'demote') {
            mdata = await pires.groupMetadata(anu.jid)
            member = mdata.participants.length
        	num = anu.participants[0]
            anu_user = pires.contacts[mem]
            teks = `Parabéns a @${num.split('@')[0]}\nVocê foi rebaixado, Ex-Administrador Agora Membro`
	        buff = await getBuffer(`http://hadi-api.herokuapp.com/api/card/demote?nama=${encodeURI(anu_user.notify)}&member=${member}&pesan=${encodeURI(anu_user.notify)} rebaixadokkkk&pp=${pp_user}&bg=${pp_grup}`)
	        
		pires.sendMessage(mdata.id, buff, MessageType.image, {caption: teks, contextInfo: {"mentionedJid": [num]}})
		}
		if (anu.action == 'promote') {
            mdata = await pires.groupMetadata(anu.jid)
            member = mdata.participants.length
        	num = anu.participants[0]
            anu_user = pires.contacts[mem]
            teks = `Parabéns a @${num.split('@')[0]}\nVocê foi promovido, de membro a administrador`
	        buff = await getBuffer(`http://hadi-api.herokuapp.com/api/card/promote?nama=${encodeURI(anu_user.notify)}&member=${member}&pesan=${encodeURI(anu_user.notify)} admir&pp=${pp_user}&bg=${pp_grup}`)
	        
		pires.sendMessage(mdata.id, buff, MessageType.image, {caption: teks, contextInfo: {"mentionedJid": [num]}})
		}
             if (anu.action == 'add' && !mem.includes(pires.user.jid)) {
             if (!welkom.includes(anu.jid)) return
                mdata = await pires.groupMetadata(anu.jid)
                memeg = mdata.participants.length
            	num = anu.participants[0]
                let v = pires.contacts[num] || { notify: num.replace(/@.+/, '') }
                anu_user = v.vname || v.notify || num.split('@')[0]
                teks = `eae *${anu_user}* Bem-vindo ao nosso grupo`
	            buff = await getBuffer(`http://hadi-api.herokuapp.com/api/card/welcome?nama=${anu_user}&descriminator=0&memcount=${memeg}&gcname=${encodeURI(mdata.subject)}&pp=${pp_user}&bg=https://i.postimg.cc/rFkw8MpX/IMG-20210807-151325.jpg`)
		        pires.sendMessage(mdata.id, buff, MessageType.image, {caption: teks, contextInfo: {"mentionedJid": [num]}})
		}
            if (anu.action == 'remove' && !mem.includes(pires.user.jid)) {
            if (!welkom.includes(anu.jid)) return
                mdata = await pires.groupMetadata(anu.jid)
            	num = anu.participants[0]
                let w = pires.contacts[num] || { notify: num.replace(/@.+/, '') }
                anu_user = w.vname || w.notify || num.split('@')[0]
                memeg = mdata.participants.length
                out = `Adeus *${anu_user}*    talvez um dia volte kkkkk`
                buff = await getBuffer(`http://hadi-api.herokuapp.com/api/card/goodbye?nama=${anu_user}&descriminator=0&memcount=${memeg}&gcname=${encodeURI(mdata.subject)}&pp=${pp_user}&bg=https://i.postimg.cc/rFkw8MpX/IMG-20210807-151325.jpg`)
                pires.sendMessage(mdata.id, buff, MessageType.image, {caption: out, contextInfo: {"mentionedJid": [num]}})
            }
		} catch (e) {
			console.log('Error : %s', color(e, 'red'))
		}
	}
