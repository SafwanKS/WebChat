if ("serviceWorker" in navigator) {
    window.addEventListener("load", function() {
        navigator.serviceWorker
        .register("/serviceWorker.js")
        .then(res => console.log("service worker registered"))
        .catch(err => console.log("service worker not registered", err))
    })
}

window.onload = function() {


    var firebaseConfig = {
        apiKey: "AIzaSyDo-vaJSbBn4VBybTDtuqxdGUE_Bz5pgz4",
        authDomain: "webchat-7adb2.firebaseapp.com",
        databaseURL: "https://webchat-7adb2-default-rtdb.firebaseio.com",
        projectId: "webchat-7adb2",
        storageBucket: "webchat-7adb2.appspot.com",
        messagingSenderId: "878839034368",
        appId: "1:878839034368:web:4f373d6d53ea7e7d7e5ee5",
        measurementId: "G-P0CE38MJGL"
    };

    firebase.initializeApp(firebaseConfig);

    var db = firebase.database()

    var userTheme;

    class WEB_CHAT {



        constructor() {

            this.userColor = null;

            this.stylesheet = document.createElement('link');

            this.stylesheet.setAttribute('rel', 'stylesheet');

            document.head.appendChild(this.stylesheet);

            var appl = this.get_theme();

            if (appl == 'dark') {

                this.stylesheet.href = 'dark-theme.css';

            } else {

                this.stylesheet.href = 'index.css';

            }

        }

        splash() {

            document.body.innerHTML = ''

            var splashScreen = document.createElement('div')

            splashScreen.setAttribute('id', 'splashScreen')

            var logo = document.createElement('img')

            logo.setAttribute('id', 'logoImg')

            logo.setAttribute('src', 'logo.png')

            splashScreen.appendChild(logo)

            document.body.appendChild(splashScreen)
        }

        welcome() {

            var parent = this;

            document.body.innerHTML = ''

            var welcomeScreen = document.createElement('div')

            welcomeScreen.setAttribute('id', 'welcomeScreen')

            var logo = document.createElement('img')

            logo.setAttribute('id', 'logoImg')

            logo.setAttribute('src', 'logo.png')

            var welcomeText = document.createElement('h2')

            welcomeText.innerHTML = 'Welcome to WebChat'

            var welcome_subText = document.createElement('p')

            welcome_subText.innerHTML = 'Meet and connect strangers online'

            var inputName = document.createElement('input')

            inputName.setAttribute('type', 'text')

            inputName.setAttribute('id', 'inputName')

            inputName.setAttribute('placeholder', 'Enter your name')



            var join_btn = document.createElement('button')

            join_btn.setAttribute('id', 'join_btn')

            join_btn.innerHTML = 'Join'

            const colorCodes = ["#8B0000",
                // Deep Red
                "#006400",
                // Deep Green
                "#00008B",
                // Deep Blue
                "#8B8B00",
                // Deep Yellow
                "#8B4500",
                // Deep Orange
                "#4B0082",
                // Deep Purple
                "#008B8B",
                // Deep Cyan
                "#8B008B",
                // Deep Magenta
                "#228B22",
                // Forest Green
                "#800000",
                // Maroon
                "#0055FF",
                // Deep Sky Blue
                "#8B4789",
                // Dark Orchid
                "#DAA520",
                // Goldenrod
                "#E9967A",
                // Dark Salmon
                "#4169E1",
                // Royal Blue
                "#3CB371",
                // Medium Sea Green
                "#008B8B",
                // Dark Teal
                "#CD5C5C",
                // Indian Red
                "#A0522D",
                // Sienna
                "#2F4F4F"];
            var randomIndex = Math.floor(Math.random() * colorCodes.length);
            this.userColor = colorCodes[randomIndex];


            inputName.onkeyup = function() {

                if (inputName.value.length > 0) {

                    join_btn.classList.add('active')

                    join_btn.onclick = function() {

                        parent.save_name(inputName.value)

                        parent.save_color(parent.userColor);

                        parent.save_theme('light')

                        console.log(parent.userColor);


                        location.reload()

                    }

                } else {

                    join_btn.classList.remove('active')

                }

            }

            welcomeScreen.appendChild(logo)

            welcomeScreen.appendChild(welcomeText)

            welcomeScreen.appendChild(welcome_subText)

            welcomeScreen.appendChild(inputName)

            welcomeScreen.appendChild(join_btn)

            document.body.appendChild(welcomeScreen)

        }

        chat() {

            document.body.innerHTML = ''

            this.info()

            this.messages()

            this.inputSec()

            this.refresh_chat()

        }

        profile() {}

        info() {

            var aboutDiv = document.createElement('div')

            aboutDiv.setAttribute('id', 'aboutDiv')

            var logo = document.createElement('img')

            logo.setAttribute('src', 'logo.png')

            logo.setAttribute('id', 'logo')

            var installAppBtn = document.createElement('div')

            installAppBtn.setAttribute('id', 'installAppBtn')

            var installTxt = document.createElement('p')

            installTxt.setAttribute('id', 'installTxt')

            installTxt.innerHTML = 'Install App'

            var modeBack = document.createElement('div')

            modeBack.setAttribute('class', 'modeBack')

            var displayMode = document.createElement('i')

            displayMode.setAttribute('class', 'material-symbols-outlined')

            var userTheme = this.get_theme()

            if (userTheme == 'light') {

                displayMode.innerHTML = 'dark_mode'

            } else {

                displayMode.innerHTML = 'light_mode'

            }

            modeBack.onclick = () => {

                if (userTheme == 'light') {

                    this.save_theme('dark')

                    userTheme = 'dark'

                    displayMode.innerHTML = 'light_mode'

                    this.stylesheet.href = 'dark-theme.css'

                    this.refresh_chat()

                } else {

                    this.save_theme('light')

                    userTheme = 'light'

                    displayMode.innerHTML = 'dark_mode'

                    this.stylesheet.href = 'index.css'

                    this.refresh_chat()

                }

            }
            
          //  installAppBtn.style.display = 'none';

            window.addEventListener('beforeinstallprompt', (event) => {

                event.preventDefault();

                const installPromptEvent = event;

                installAppBtn.style.display = 'block';

                installAppBtn.onclick = function() {


                    installPromptEvent.prompt();

                    installPromptEvent.userChoice.then((choiceResult) => {
                        if (choiceResult.outcome === 'accepted') {
                            console.log('User accepted the install prompt');
                        } else {
                            console.log('User dismissed the install prompt');
                        }
                    });

                    installAppBtn.style.display = 'none';

                }


            });

            var accInfo = document.createElement('div')

            accInfo.setAttribute('id', 'accInfo')

            var span = document.createElement('span')

            var accName = document.createElement('p')

            accName.innerHTML = this.get_name()

            var profile = document.createElement('i')

            profile.classList.add('gg-profile')

            accName.style.color = this.get_color();

            accName.style.fontWeight = '800'



            aboutDiv.appendChild(logo)

            aboutDiv.appendChild(span)

            aboutDiv.appendChild(modeBack)

            modeBack.appendChild(displayMode)

            installAppBtn.appendChild(installTxt)

            aboutDiv.appendChild(installAppBtn)

            accInfo.appendChild(profile)

            accInfo.appendChild(accName)

            aboutDiv.appendChild(accInfo)

            document.body.appendChild(aboutDiv)

        }

        messages() {

            var messagesDiv = document.createElement('div')

            messagesDiv.setAttribute('id', 'messagesDiv')

            document.body.appendChild(messagesDiv)


        }

        inputSec() {

            var parent = this

            var inputDiv = document.createElement('div')

            inputDiv.setAttribute('id', 'inputDiv')

            var inputTextBack = document.createElement('div')

            inputTextBack.setAttribute('id', 'inputTextBack')

            var msgInput = document.createElement('input')

            msgInput.setAttribute('id', 'msgInput')

            msgInput.setAttribute('placeholder', 'Enter message')


            var iconsDivBack = document.createElement('div')

            iconsDivBack.setAttribute('id', 'iconsDivBack')

            var uploadBtn = document.createElement('div')

            uploadBtn.setAttribute('id', 'uploadBtn')

            var sendBtn = document.createElement('div')

            sendBtn.setAttribute('id', 'sendBtn')

            sendBtn.classList.add('sendBtnBack')

            var uploadIcon = document.createElement('i')

            uploadIcon.setAttribute('id', 'uploadIcon')

            uploadIcon.classList.add('gg-add')

            var sendIcon = document.createElement('i')

            sendIcon.setAttribute('id', 'sendIcon')

            sendIcon.classList.add('material-icons')

            sendIcon.innerHTML = 'send'

            msgInput.onkeyup = function() {

                if (msgInput.value.length > 0) {

                    var clickable = true

                    sendBtn.classList.add('activeBtn')

                    sendBtn.classList.remove('sendBtnBack')

                } else {

                    clickable = false

                    sendBtn.classList.remove('activeBtn')

                    sendBtn.classList.add('sendBtnBack')

                }

                if (clickable == true) {

                    sendBtn.onclick = function() {

                        if (msgInput.value.length > 0) {

                            parent.send_message(msgInput.value)

                            msgInput.value = ''

                            sendBtn.classList.remove('activeBtn')

                            sendBtn.classList.add('sendBtnBack')


                        }


                    }

                }

            }

            inputTextBack.appendChild(msgInput)

            uploadBtn.appendChild(uploadIcon)

            sendBtn.appendChild(sendIcon)

            iconsDivBack.appendChild(uploadBtn)

            iconsDivBack.appendChild(sendBtn)

            inputDiv.appendChild(inputTextBack)

            inputDiv.appendChild(iconsDivBack)

            document.body.appendChild(inputDiv)



        }



        get_name() {

            if (localStorage.getItem('name') != null) {

                return localStorage.getItem('name')

            } else {

                return null

            }


        }

        save_name(name) {

            localStorage.setItem('name', name)

        }

        save_color(color) {

            localStorage.setItem('color', color);

        }

        get_color() {

            return localStorage.getItem('color');

        }

        save_theme(theme) {

            localStorage.setItem('theme', theme)

        }

        get_theme() {

            if (localStorage.getItem('theme') != null) {

                return localStorage.getItem('theme')

            } else {

                return 'light'

            }
        }

        set_profile(link) {

            localStorage.setItem('profileLink', link)

        }

        get_profile() {

            return localStorage.getItem('profileLink')

        }


        send_message(message) {

            var parent = this

            if (parent.get_name() == null && message == null) {

                return

            }

            db.ref('chats/').once('value', function(message_object) {

                var index = parseFloat(message_object.numChildren()) + 1

                db.ref('chats/' + `message_${index}`).set({

                    name: parent.get_name(),

                    message: message,

                    color: parent.get_color(),

                    index: index

                })

                .then(function() {



                    parent.refresh_chat()

                })

            })

        }





        refresh_chat() {

            var chat_content_container = document.getElementById('messagesDiv')


            // Get the chats from firebase

            db.ref('chats/').on('value', function(messages_object) {

                // When we get the data clear chat_content_container

                chat_content_container.innerHTML = ''

                // if there are no messages in the chat. Retrun . Don't load anything

                if (messages_object.numChildren() == 0) {

                    return

                }


                // OK! SO IF YOU'RE A ROOKIE CODER. THIS IS GOING TO BE

                // SUPER EASY-ISH! I THINK. MAYBE NOT. WE'LL SEE!


                // convert the message object values to an array.

                var messages = Object.values(messages_object.val());

                var guide = [] // this will be our guide to organizing the messages

                var unordered = [] // unordered messages

                var ordered = [] // we're going to order these messages


                for (var i, i = 0; i < messages.length; i++) {

                    // The guide is simply an array from 0 to the messages.length

                    guide.push(i+1)

                    // unordered is the [message, index_of_the_message]

                    unordered.push([messages[i], messages[i].index]);

                }


                // Now this is straight up from stack overflow 🤣

                // Sort the unordered messages by the guide

                guide.forEach(function(key) {

                    var found = false

                    unordered = unordered.filter(function(item) {

                        if (!found && item[1] == key) {

                            // Now push the ordered messages to ordered array

                            ordered.push(item[0])

                            found = true

                            return false

                        } else {

                            return true

                        }

                    })

                })


                // Now we're done. Simply display the ordered messages

                ordered.forEach(function(data) {

                    var name = data.name

                    var message = data.message

                    var color = data.color


                    var message_container = document.createElement('div')

                    message_container.setAttribute('class',
                        'message_container')


                    var message_inner_container = document.createElement('div')

                    message_inner_container.setAttribute('class',
                        'message_inner_container')


                    var message_user_container = document.createElement('div')

                    message_user_container.setAttribute('class',
                        'message_user_container')


                    var message_user = document.createElement('p')

                    message_user.setAttribute('class',
                        'message_user')

                    message_user.innerText = name;

                    if (localStorage.getItem('theme') == 'dark') {

                        switch (color) {
                            case '#8B0000':
                                color = '#FF0000';
                                break;
                            case '#006400':
                                color = '#00FF00';
                                break;
                            case '#00008B':
                                color = '#0000FF';
                                break;
                            case '#8B8B00':
                                color = '#FFFF00';
                                break;
                            case '#8B4500':
                                color = '#FFA500';
                                break;
                            case '#4B0082':
                                color = '#8A2BE2';
                                break;
                            case '#800000':
                                color = '#00CED1';
                                break;
                            case '#008B8B':
                                color = '#FF00FF';
                                break;
                            case '#8B008B':
                                color = '#228B22';
                                break;
                            case '#228B22':
                                color = '#800000';
                                break;
                            case '#0055FF':
                                color = '#00BFFF';
                                break;
                            case '#8B4789':
                                color = '#9932CC';
                                break;
                            case '#DAA520':
                                color = '#DAA520';
                                break;
                            case '#E9967A':
                                color = '#E9967A';
                                break;
                            case '#4169E1':
                                color = '#4169E1';
                                break;
                            case '#3CB371':
                                color = '#3CB371';
                                break;
                            case '#008B8B':
                                color = '#008080';
                                break;
                            case '#CD5C5C':
                                color = '#CD5C5C';
                                break;
                            case '#A0522D':
                                color = '#A0522D';
                                break;
                            case '#2F4F4F':
                                color = '#556B2F';
                                break;
                            default:
                                color = "#ffffff";
                            }

                        }



                        message_user.style.color = color

                        var message_content_container = document.createElement('div')

                        message_content_container.setAttribute('class',
                            'message_content_container')


                        var message_content = document.createElement('p')

                        message_content.setAttribute('class',
                            'message_content')

                        message_content.innerText = message;


                        message_user_container.append(message_user)

                        message_content_container.append(message_content)

                        message_inner_container.append(message_user_container,
                            message_content_container)

                        message_container.append(message_inner_container)


                        messagesDiv.append(message_container)

                    });



                    messagesDiv.scrollTop = messagesDiv.scrollHeight + 20;

                })


            }



        }

        var app = new WEB_CHAT();

        app.splash()

        setTimeout(function() {

            if (app.get_name() != null) {

                app.chat()

            } else {

                app.welcome()
            }

        },
            2000);

    }
