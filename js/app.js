const app = new Vue({
    el: '.app-wrapper',
    data: {
        profile:
        {
            name: 'Vincenzo',
            avatar: "img/profile.png"
        },
        contacts: [
            {
                name: 'Michele',
                avatar: 'img/avatar-01.png',
                visible: true,
                active: false,
                messages: [
                    {
                        date: '01/10/2020 15:30:55',
                        text: 'Hai portato a spasso il cane?',
                        status: 'sent',
                        menu: false
                    },
                    {
                        date: '01/10/2020 15:50:00',
                        text: 'Ricordati di dargli da mangiare',
                        status: 'sent',
                        menu: false
                    },
                    {
                        date: '01/10/2020 16:15:22',
                        text: 'Tutto fatto!',
                        status: 'received',
                        menu: false
                    }
                ],
            },
            {
                name: 'Fabio',
                avatar: 'img/avatar-02.png',
                visible: true,
                active: false,
                messages: [
                    {
                        date: '03/20/2020 16:30:00',
                        text: 'Ciao come stai?',
                        status: 'sent',
                        menu: false
                    },
                    {
                        date: '03/20/2020 16:30:55',
                        text: 'Bene grazie! Stasera ci vediamo?',
                        status: 'received',
                        menu: false
                    },
                    {
                        date: '03/20/2020 16:35:00',
                        text: 'Mi piacerebbe ma devo andare a fare la spesa.',
                        status: 'sent',
                        menu: false
                    }
                ],
            },
            {
                name: 'Samuele',
                avatar: 'img/avatar-03.png',
                visible: true,
                active: false,
                messages: [
                    {
                        date: '03/28/2020 10:10:40',
                        text: 'La Marianna va in campagna',
                        status: 'received',
                        menu: false
                    },
                    {
                        date: '03/28/2020 10:20:10',
                        text: 'Sicuro di non aver sbagliato chat?',
                        status: 'sent',
                        menu: false
                    },
                    {
                        date: '03/28/2020 16:15:22',
                        text: 'Ah scusa!',
                        status: 'received',
                        menu: false
                    }
                ],
            },
            {
                name: 'Luisa',
                avatar: 'img/avatar-04.png',
                visible: true,
                active: false,
                messages: [
                    {
                        date: '01/10/2020 15:30:55',
                        text: 'Lo sai che ha aperto una nuova pizzeria?',
                        status: 'sent',
                        menu: false
                    },
                    {
                        date: '01/10/2020 15:50:00',
                        text: 'Si, ma preferirei andare al cinema',
                        status: 'received',
                        menu: false
                    }
                ],
            },
        ],
        activeContact: '',
        newMessage: '',
        filter: ''
    },
    methods: {
        isAnyActive() {
            const activeObjects = this.contacts.filter(el => el.active == true);
            if (activeObjects.length == 0) {
                return false;
            } else {
                return true;
            }
        },
        isActive(el) {
            if (el.active) {
                return true;
            } else {
                return false;
            }
        },
        getLastMessage(contact) {
            if (contact.messages.length > 0) {
                const lastMessage = contact.messages[contact.messages.length - 1];
                return lastMessage;
            } else {
                return null;
            }
        },
        updateActive(contact) {
            this.activeContact.active = false;
            contact.active = true;
            this.activeContact = contact;
        },
        sendMessage(newMsg) {
            if (newMsg !== '') {
                const newMsgObject = {
                    date: dayjs(),
                    text: newMsg,
                    status: 'sent',
                    menu: false
                }
                this.activeContact.messages.push(newMsgObject);
                this.newMessage = '';
                this.getAnswer(this.activeContact);
            }
        },
        getAnswer(contact) {
            setTimeout(() => {
                const answerObject = {
                    date: dayjs(),
                    text: 'Ok!',
                    status: 'received',
                    menu: false
                }
                contact.messages.push(answerObject);
            }, 1000);
        },
        getHourMin(date) {
            return dayjs(date).format('HH:mm');
        },
        getLastAccess(contact) {
            if (this.activeContact !== '' && !contact) {
                if (dayjs(this.getLastMessage(this.activeContact).date).format('DD/MM/YYYY') === dayjs().format('DD/MM/YYYY')) {
                    return 'oggi alle ' + dayjs(this.getLastMessage(this.activeContact).date).format('HH:mm');
                } else {
                    return dayjs(this.getLastMessage(this.activeContact).date).format('DD MMM HH:mm');
                }
            }
            else if (contact) {
                if (dayjs(this.getLastMessage(contact).date).format('DD/MM/YYYY') === dayjs().format('DD/MM/YYYY')) {
                    return 'oggi alle ' + dayjs(this.getLastMessage(contact).date).format('HH:mm');
                } else {
                    return dayjs(this.getLastMessage(contact).date).format('DD MMM HH:mm');
                }
            }
        },
        searchContacts() {
            this.contacts.forEach(contact => {
                if (contact.name.toUpperCase().indexOf(this.filter.toUpperCase()) !== -1) {
                    contact.visible = true;
                } else {
                    contact.visible = false;
                }
            });
        },
        deleteMessage(index) {
            if (this.activeContact.messages.length > 1) {
                this.activeContact.messages.splice(index,1);
            } else {
                this.activeContact.messages = [{
                    text: '',
                    date: this.activeContact.messages[0].date,
                    status: 'last',
                    menu: false
                }]
            }
            let timeOut = setTimeout(() => {
                this.activeContact.messages.forEach((el,i) => {this.activeContact.messages[i].menu = false;}) 
            }, 50); 
        }
    }
})