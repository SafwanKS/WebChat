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

            this.stylesheet.setAttribute('rel',
                'stylesheet');

            document.head.appendChild(this.stylesheet);

            var appl = this.get_theme();

            if (appl == 'dark') {

                this.stylesheet.href = 'dark-theme.css';

            } else {

                this.stylesheet.href = 'index.css';

            }

        }

        splash() {

            var parent = this;

            var userName = parent.get_name()

            if (localStorage.getItem('name') != null) {

                db.ref('users/' + userName).once('value', function(snapshot) {
                    if (snapshot.exists()) {} else {
                        localStorage.removeItem('name')
                        alert('Sorry. You are logged out because some technical issues.')
                        location.reload();
                    }
                });
            }

            document.body.innerHTML = ''

            var splashScreen = document.createElement('div')

            splashScreen.setAttribute('id',
                'splashScreen')

            var logo = document.createElement('img')

            logo.setAttribute('id',
                'logoImg')

            logo.setAttribute('src',
                'logo.png')

            splashScreen.appendChild(logo)

            document.body.appendChild(splashScreen)
        }

        welcome() {

            var parent = this;

            document.body.innerHTML = ''

            var welcomeScreen = document.createElement('div')

            welcomeScreen.setAttribute('id',
                'welcomeScreen')

            var logo = document.createElement('img')

            logo.setAttribute('id',
                'logoImg')

            logo.setAttribute('src',
                'logo.png')

            var welcomeText = document.createElement('h2')

            welcomeText.innerHTML = 'Welcome to WebChat'

            var welcome_subText = document.createElement('p')

            welcome_subText.innerHTML = 'Meet and connect strangers online'

            var inputName = document.createElement('input')

            inputName.setAttribute('type',
                'text')

            inputName.setAttribute('id',
                'inputName')

            inputName.setAttribute('placeholder',
                'Enter your name')



            var join_btn = document.createElement('button')

            join_btn.setAttribute('id',
                'join_btn')

            join_btn.innerHTML = 'Join'
            
            const randomUid = Math.floor(100000000000 + Math.random() * 900000000000);
            

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

                var username = inputName.value.trim();

                var isClickable = false

                var validUsername = /^[a-zA-Z0-9]+$/.test(username);

                if (username.length > 0 && validUsername) {

                    join_btn.style.display = 'block'

                    isClickable = true


                    join_btn.onclick = function() {

                        if (isClickable == true) {

                            var enteredUsername = inputName.value.toLowerCase()

                            db.ref('users/' + enteredUsername).once('value', function(snapshot) {

                                if (snapshot.exists()) {

                                    alert('Username already exists. Choose another.');

                                } else {

                                    parent.save_name(enteredUsername);

                                    parent.save_color(parent.userColor);

                                    parent.save_theme('light');
                                    
                                    localStorage.setItem('uid', randomUid)

                                    db.ref('users/' + enteredUsername).set({

                                        name: enteredUsername,

                                        color: parent.userColor,
                                        
                                        uid: randomUid,



                                        theme: 'light',

                                        blocked: false,

                                        verified: false

                                    });

                                    location.reload();

                                }

                            });

                        } else {

                            alert('Invalid username. ')

                        }

                    };



                } else {

                    join_btn.style.display = 'none'

                    isClickable = false

                }

            }

            welcomeScreen.appendChild(logo)

            welcomeScreen.appendChild(welcomeText)

            welcomeScreen.appendChild(welcome_subText)

            welcomeScreen.appendChild(inputName)

            welcomeScreen.appendChild(join_btn)

            document.body.appendChild(welcomeScreen)

        }




        home() {

            var userName = this.get_name()

            var activeUsers = db.ref('activeUsers/')

            activeUsers.once('value').then(function(snapshot) {

                if (!snapshot.hasChild(userName)) {

                    activeUsers.child(userName).set(true);

                    console.log('Username uploaded successfully');

                } else {

                    console.log('Username already exists in activeUsers');
                }
            }).catch(function(error) {

                console.error('Error checking/updating username:', error);

            });


            document.body.innerHTML = ''

            var parent = this

            console.log(parent)

            var homeScreen = document.createElement('div')

            homeScreen.id = 'homeScreen'

            var headDiv = document.createElement('div')

            headDiv.setAttribute('id',
                'headDiv')

            var logo = document.createElement('img')

            logo.id = 'logo'

            logo.src = 'logo.png'

            var heading = document.createElement('h2')

            heading.textContent = 'Chats'

            var gap = document.createElement('span')

            var profilePic = document.createElement('img')

            profilePic.id = 'profilePic'

            profilePic.src = 'profile.png'

            var homeBody = document.createElement('div')

            homeBody.id = 'homeBody'

            const searchBoxInput = document.createElement('input');

            searchBoxInput.type = 'text';

            searchBoxInput.id = 'search-box';

            searchBoxInput.placeholder = 'Search users';


            const globalChatBtn = document.createElement('div');
            globalChatBtn.id = 'global-chaf-btn';


            const globalChatHeading = document.createElement('h3');
            globalChatHeading.textContent = 'Global Chat';



            globalChatBtn.onclick = function() {

                if (!(window.innerWidth >= 768)) {
                    window.history.pushState({
                        id: 2
                    },
                        null,
                        '?q=Global_Chat')
                    localStorage.setItem('screen',
                        'Global_Chat')
                }

                parent.global_chat()

            }

            var typingTimer;

            var doneTypingInterval = 1000;


            var userlist = document.createElement('div')

            userlist.id = 'userList'

            userlist.setAttribute('class', 'userList')

            var noChatListDiv = document.createElement('div')

            noChatListDiv.id = 'noChatListDiv'

            var chatBubbleIcon = document.createElement('span')

            chatBubbleIcon.className = 'material-symbols-outlined'

            chatBubbleIcon.innerHTML = '&#xf189;'
            
            var noChatHeadTxt = document.createElement('h4')
            
            var noChatBodyTxt = document.createElement('p')

            noChatListDiv.appendChild(chatBubbleIcon)


            var loading_box = document.createElement('div')

            loading_box.setAttribute('id', "loading-box")

            loading_box.setAttribute('class', 'loading-box')

            var loadingTxt = document.createElement('p')

            loadingTxt.id = 'loadingTxt'

            loadingTxt.textContent = 'Searching...'

            var loader = document.createElement('span')

            loader.setAttribute('class', 'loader')

            loading_box.appendChild(loadingTxt)

            loading_box.appendChild(loader)


            searchBoxInput.addEventListener('input', function() {

                headDiv.style.display = 'none';
                globalChatBtn.style.display = 'none';
                userlist.innerHTML = ''
                userlist.appendChild(loading_box)

                if (searchBoxInput.value == null || searchBoxInput.value == '') {
                    headDiv.style.display = 'flex';
                    globalChatBtn.style.display = 'block';
                    document.getElementById('userList').innerHTML = '';
                    userlist.appendChild(noChatListDiv)

                }

                clearTimeout(typingTimer);

                typingTimer = setTimeout(function() {

                    userlist.innerHTML = '';

                    var inputValue = searchBoxInput.value.toLowerCase();

                    if (inputValue !== null && inputValue.trim() !== '') {
                        var usersRef = firebase.database().ref('users');

                        userlist.appendChild(loading_box)

                        localStorage.setItem('screen', 'search')

                        window.history.pushState({
                            id: 4
                        }, null, '?q=search')

                        usersRef.once("value", function(snapshot) {

                            userlist.removeChild(loading_box)

                            var userFound = false;


                            snapshot.forEach(function(childSnapshot) {



                                var userData = childSnapshot.val();
                                var userDisplayName = userData.name;
                                var userProfile = userData.profile || 'profile.png';

                                if (userDisplayName && userDisplayName.includes(inputValue)) {
                                    userFound = true
                                    var userItem = document.createElement('div');
                                    userItem.className = 'userItem';

                                    var userImg = document.createElement('img');
                                    userImg.src = userProfile;
                                    userImg.className = 'userImg';

                                    var userInfo = document.createElement('div');
                                    userInfo.className = 'userInfo';

                                    var displayNameElement = document.createElement('p');
                                    displayNameElement.textContent = userDisplayName;

                                    userInfo.appendChild(displayNameElement);
                                    userItem.appendChild(userImg);
                                    userItem.appendChild(userInfo);

                                    userlist.appendChild(userItem);

                                    userItem.onclick = () => {
                                        parent.chat(userDisplayName)
                                    }

                                }
                            });
                            if (!userFound) {

                                userlist.innerHTML = '<p>No users found</p>'

                            }
                        });
                    } else {

                        localStorage.setItem('screen', 'home')
                        headDiv.style.display = 'flex';
                        globalChatBtn.style.display = 'block';
                        userlist.appendChild(noChatListDiv)

                        userlist.removeChild(loading_box)


                    }
                },
                    doneTypingInterval);
            });

            function updateUsersList(parent) {

                var parent = parent;


            }


            headDiv.appendChild(logo)

            headDiv.appendChild(heading)

            headDiv.appendChild(gap)

            headDiv.appendChild(profilePic)

            homeScreen.appendChild(headDiv)

            homeBody.appendChild(searchBoxInput)

            globalChatBtn.appendChild(globalChatHeading)

            homeBody.appendChild(globalChatBtn)

            userlist.appendChild(noChatListDiv)

            homeBody.appendChild(userlist)

            homeScreen.appendChild(homeBody)

            document.body.appendChild(homeScreen)
        }

        chatWindow() {

            var chatWindowScreen = document.createElement('div')

            chatWindowScreen.setAttribute('id',
                'chatWindowScreen')

            if (window.innerWidth >= 768) {

                var noChatWindow = document.createElement('div')

                noChatWindow.id = 'noChatWindow'

                var noChatOpenedHeadTxt = document.createElement('h3')

                noChatOpenedHeadTxt.innerHTML = "It's nice to chat with someone"

                var noChatOpenedBodyTxt = document.createElement('p')

                noChatOpenedBodyTxt.id = 'noChatOpenedBodyTxt'

                noChatOpenedBodyTxt.innerHTML = 'Pick a chat from the left menu <br> and start your conversation'

                noChatWindow.appendChild(noChatOpenedHeadTxt)

                noChatWindow.appendChild(noChatOpenedBodyTxt)

                chatWindowScreen.appendChild(noChatWindow)


            }


            document.body.appendChild(chatWindowScreen)

        }

        chat(userId) {

            var chatWindowScreen = document.getElementById('chatWindowScreen')

            chatWindowScreen.innerHTML = ''


            if (window.innerWidth >= 768) {} else {

                document.body.innerHTML = ''

                app.chatWindow()

            }

            var chatScreen = document.createElement('div')

            chatScreen.id = 'chatScreen'

            var username = userId;

            var aboutDiv = document.createElement('div')

            aboutDiv.id = 'aboutDiv'

            var backIcon = document.createElement('span')

            backIcon.classList.add("material-symbols-outlined");

            backIcon.textContent = "arrow_back_ios_new"



            if (window.innerWidth >= 768) {
                backIcon.style.display = 'none'
            }

            backIcon.onclick = function() {
                history.back()
            }
            
            var profile = document.createElement('img')
            
            profile.id = 'profilePic'

            var usernameTxt = document.createElement('p')

            usernameTxt.setAttribute('id', 'usernameTxt')

            usernameTxt.textContent = username

            aboutDiv.appendChild(backIcon)
            
            aboutDiv.appendChild(profile)
            
            aboutDiv.appendChild(usernameTxt)

            var messageDiv = document.createElement('div')

            messageDiv.id = 'messageDiv'

            var inputDiv = document.createElement('div')

            inputDiv.id = 'inputDiv'

            chatScreen.appendChild(aboutDiv)

            chatScreen.appendChild(messageDiv)

            chatScreen.appendChild(inputDiv)

            var chatWindowScreen = document.getElementById('chatWindowScreen')

            chatWindowScreen.style.display = 'block'

            chatWindowScreen.appendChild(chatScreen)


        }


        global_chat() {

            var chatWindowScreen = document.getElementById('chatWindowScreen')

            chatWindowScreen.innerHTML = ''


            if (window.innerWidth >= 768) {} else {

                document.body.innerHTML = ''

                app.chatWindow()

                this.bottomSheet()

            }



            var globalChatScreen = document.createElement('div')

            globalChatScreen.id = 'globalChatScreen'

            var aboutDiv = document.createElement('div')

            aboutDiv.setAttribute('id',
                'aboutDiv')


            var backIcon = document.createElement('span')

            backIcon.classList.add("material-symbols-outlined");

            backIcon.textContent = "arrow_back_ios_new"



            if (window.innerWidth >= 768) {
                backIcon.style.display = 'none'
            }

            backIcon.onclick = function() {
                history.back()
            }

            var globalChatTxt = document.createElement('p')

            globalChatTxt.setAttribute('id', 'globalChatTxt')

            globalChatTxt.textContent = 'Global Chat'



            var activeUsersDiv = document.createElement('div')

            activeUsersDiv.setAttribute('id',
                'activeUsers')

            activeUsersDiv.onclick = () => {

                this.showBottomSheetView()

            }

            var circle = document.createElement('div')

            circle.setAttribute('id',
                'greenCircle')

            var activeUsersCount = document.createElement('p')

            activeUsersCount.setAttribute('id',
                'activeUsersCount')

            var activeUsersRef = db.ref('activeUsers')

            activeUsersRef.on('value',
                function(snapshot) {

                    activeUsersCount.innerHTML = snapshot.numChildren() + ' online';

                    activeUsersDiv.style.display = 'flex';

                },
                function(error) {

                    console.log(error);

                });

            var modeBack = document.createElement('div')

            modeBack.setAttribute('class',
                'modeBack')

            var displayMode = document.createElement('i')

            displayMode.setAttribute('class',
                'material-symbols-outlined')

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


            var accInfo = document.createElement('div')

            accInfo.setAttribute('id',
                'accInfo')

            var span = document.createElement('span')

            var accName = document.createElement('p')

            accName.innerHTML = this.get_name()

            var profile = document.createElement('i')

            profile.classList.add('gg-profile')

            accName.style.color = this.get_color();

            accName.style.fontWeight = '800'



            aboutDiv.appendChild(backIcon)

            aboutDiv.appendChild(globalChatTxt)

            aboutDiv.appendChild(span)

            aboutDiv.appendChild(modeBack)

            modeBack.appendChild(displayMode)

            activeUsersDiv.appendChild(circle)

            activeUsersDiv.appendChild(activeUsersCount)

            aboutDiv.appendChild(activeUsersDiv)


            accInfo.appendChild(profile)

            accInfo.appendChild(accName)

           // aboutDiv.appendChild(accInfo)

            var globalMessagesDiv = document.createElement('div')

            globalMessagesDiv.setAttribute('id',
                'globalMessagesDiv')



            var parent = this

            var inputDiv = document.createElement('div')

            inputDiv.setAttribute('id',
                'inputDiv')

            var inputTextBack = document.createElement('div')

            inputTextBack.setAttribute('id',
                'inputTextBack')

            var msgInput = document.createElement('input')

            msgInput.setAttribute('id',
                'msgInput')

            msgInput.setAttribute('placeholder',
                'Enter message')


            var iconsDivBack = document.createElement('div')

            iconsDivBack.setAttribute('id',
                'iconsDivBack')

            var uploadBtn = document.createElement('div')

            uploadBtn.setAttribute('id',
                'uploadBtn')

            var sendBtn = document.createElement('div')

            sendBtn.setAttribute('id',
                'sendBtn')

            sendBtn.classList.add('sendBtnBack')

            var uploadIcon = document.createElement('i')

            uploadIcon.setAttribute('id',
                'uploadIcon')

            uploadIcon.classList.add('gg-add')

            var sendIcon = document.createElement('i')

            sendIcon.setAttribute('id',
                'sendIcon')

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

            globalChatScreen.appendChild(aboutDiv)


            var loading_box = document.createElement('div')

            loading_box.setAttribute('id', "loading-box")

            loading_box.setAttribute('class', 'loading-box')

            var loadingTxt = document.createElement('p')

            loadingTxt.id = 'loadingTxt'

            loadingTxt.textContent = 'Loading...'

            var loader = document.createElement('span')

            loader.setAttribute('class', 'loader')

            loading_box.appendChild(loadingTxt)

            loading_box.appendChild(loader)

            globalMessagesDiv.appendChild(loading_box)

            globalChatScreen.appendChild(globalMessagesDiv)

            globalChatScreen.appendChild(inputDiv)

            var chatWindowScreen = document.getElementById('chatWindowScreen')

            chatWindowScreen.style.display = 'block'

            chatWindowScreen.appendChild(globalChatScreen)

            this.refresh_chat()


        }

        profile() {}

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

            var parent = this

            localStorage.setItem('theme', theme)

            var userName = this.get_name()

            db.ref('users/' + userName).set({
                color: parent.userColor,
                theme: theme,
                blocked: false,
                verified: false
            });

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

            db.ref('global_chat/chats/').once('value', function(message_object) {

                var index = parseFloat(message_object.numChildren()) + 1

                db.ref('global_chat/chats/' + `message_${index}`).set({

                    name: parent.get_name(),

                    message: message,

                    color: parent.get_color(),

                    deleted: false,

                    index: index

                })

                .then(function() {

                    parent.refresh_chat()

                    // parent.sendNotificationToAll(message);

                })

            })

        }

        bottomSheet() {

            const bottomSheet = document.createElement('div');
            bottomSheet.setAttribute('id', 'bottom-sheet')

            const sheetOverlay = document.createElement('div');
            sheetOverlay.id = 'sheet-overlay';
            sheetOverlay.onclick = function() {
                bottomSheet.classList.remove('show')
            }
            const content = document.createElement('div');
            content.id = 'content';

            const header = document.createElement('div');
            header.id = 'header';

            const dragIcon = document.createElement('div');
            dragIcon.id = 'drag-icon';

            const spanElement = document.createElement('span');
            dragIcon.appendChild(spanElement);

            header.appendChild(dragIcon);
            content.appendChild(header);

            const body = document.createElement('div');
            body.id = 'body';

            const h4Element = document.createElement('h4');
            h4Element.style.textAlign = 'center';
            h4Element.textContent = 'Active users';

            const activeUsersList = document.createElement('div');

            const activeUsersRef = db.ref('activeUsers');

            activeUsersRef.on('value', function(snapshot) {

                activeUsersList.innerHTML = '';

                snapshot.forEach(function(childSnapshot) {

                    var userName = childSnapshot.key;

                    var listItem = document.createElement('li');

                    listItem.textContent = userName;

                    activeUsersList.appendChild(listItem);
                });
            });


            body.appendChild(h4Element);

            body.appendChild(activeUsersList)

            content.appendChild(body);

            bottomSheet.appendChild(sheetOverlay);

            bottomSheet.appendChild(content);

            document.body.appendChild(bottomSheet)

        }

        showBottomSheetView() {

            var bottomSheetView = document.getElementById('bottom-sheet');

            if (bottomSheetView) {

                localStorage.setItem('screen', 'btsheet')

                localStorage.setItem('showBottomSheet', 'true')


                bottomSheetView.classList.add('show');

                window.history.pushState({
                    id: 3
                }, null, '?q=bottomSheet')
            } else {
                console.log('error')
            }
        }

        hideBottomSheet() {

            localStorage.setItem('screen', 'Global_Chat')

            localStorage.removeItem('showBottomSheet')

            var bottomSheetView = document.getElementById('bottom-sheet');

            bottomSheetView.classList.remove('show');



        }





        refresh_chat() {

            var chat_content_container = document.getElementById('globalMessagesDiv')

            db.ref('global_chat/chats/').on('value',
                function(messages_object) {

                    // When we get the data clear chat_content_container

                    chat_content_container.innerHTML = ''

                    // if there are no messages in the chat. Retrun . Don't load anything

                    if (messages_object.numChildren() == 0) {

                        return

                    }

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


                            globalMessagesDiv.append(message_container)

                        });



                        globalMessagesDiv.scrollTop = globalMessagesDiv.scrollHeight + 20;

                    })


            }




        }



        var app = new WEB_CHAT();

        app.splash()

        setTimeout(function() {

            if (app.get_name() != null) {

                window.history.pushState({
                    id: 1
                }, null, '?q=home')
                localStorage.setItem('screen', 'home')

                app.home()

                app.chatWindow()

                app.bottomSheet()

            } else {

                app.welcome()
            }

        },
            4000);


        window.addEventListener("popstate",
            handleEvent)

        function handleEvent() {


            var bottomSheetOpen = localStorage.getItem('showBottomSheet')

            var screen = localStorage.getItem('screen')

            if (!(bottomSheetOpen == null)) {

                app.hideBottomSheet()

            }

            if (screen == 'search') {

                app.home()

                app.chatWindow()

                localStorage.setItem('screen', 'home')
            }


            if (screen == 'Global_Chat') {

                app.home()

                app.chatWindow()

                localStorage.setItem('screen', 'home')
            }

            if (screen == 'home') {

                console.log('yes')

                var userName = localStorage.getItem('name')

                var childRef = db.ref('activeUsers/'+ userName);

                childRef.remove();

                var activeUsers = db.ref('activeUsers/')

                activeUsers.once('value').then(function(snapshot) {

                    if (!snapshot.hasChild(userName)) {

                        history.replaceState(null, null, window.location.href);

                        document.body.innerHTML = 'Press Back again to exit~'

                    }
                })





            }

        }


    }