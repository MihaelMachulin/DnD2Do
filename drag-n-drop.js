


class Database {
    constructor() {

    }
    static baseUrl = 'https://dnd2do-default-rtdb.europe-west1.firebasedatabase.app/'
    static token = ''
    static localId = ''

    static save(item) {
        return fetch(Database.baseUrl + Database.localId + '.json', {
            // https://firebase.google.com/docs/database/rest/save-data
            method: 'POST',
            body: JSON.stringify(item), // Передаём данные в формате JSON
            headers: {
                'Content-Type': 'application/json' // Не понял что это
            }
        })
            .then(response => response.json())
            .then(response => {
                item.id = response.name
                return item
            })
    }

    static load() {
        return fetch(Database.baseUrl + Database.localId + '.json?auth=' + Database.token)
            .then(data => data.json())
    }

    static putKey(id, key, val) {
        return fetch(Database.baseUrl + Database.localId + '/' + id + '.json', {
            method: 'PATCH', // Именно PATCH меняет отдельные ключи, если бы был PUT он бы затёр все незаполненные поля объекта
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({[`${key}`]:`${val}`}) //
        })}

    static delete(id) {
        return fetch(Database.baseUrl + Database.localId + '/' + id + '.json', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json'}
        })}

    static login(email, password){
        console.log(email, password)
        const apiKey = 'AIzaSyDXamHwFUkY6Q9PeOGeER2FelnDEC8fJww'
        return fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`, {
            method: 'POST',
            body: JSON.stringify({ email, password, returnSecureToken: true }),
            headers: { 'Content-Type': 'application/json' }
        }).then(response => response.json())
            .then(data => [data.idToken, data.localId]) // data.idToken

        // {
        //     "kind": "identitytoolkit#VerifyPasswordResponse",
        //     "localId": "O63R8VUQKVapeNomPugpLLJn32H3",
        //     "email": "mim@ya.ru",
        //     "displayName": "",
        //     "idToken": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjJlMzZhMWNiZDBiMjE2NjYxOTViZGIxZGZhMDFiNGNkYjAwNzg3OWQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vZG5kMmRvIiwiYXVkIjoiZG5kMmRvIiwiYXV0aF90aW1lIjoxNjM3NjE0ODg2LCJ1c2VyX2lkIjoiTzYzUjhWVVFLVmFwZU5vbVB1Z3BMTEpuMzJIMyIsInN1YiI6Ik82M1I4VlVRS1ZhcGVOb21QdWdwTExKbjMySDMiLCJpYXQiOjE2Mzc2MTQ4ODYsImV4cCI6MTYzNzYxODQ4NiwiZW1haWwiOiJtaW1AeWEucnUiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsibWltQHlhLnJ1Il19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.iuk5uLf93KhPMnuCClMQ42FU057th2D9MT-y0oKnGYvOI_qLx7ne-G-xVBqBJwmITrX_w3QcDX8kPcmpvW2_6ZDFsK00ga2MV1Af9KFk3xtb2Hagn6KT9PENfJw16CkzkZtJp5M-E10Kwg4qIfbgevw2nswuzpgahGHfthydTmS7O20zxhjrkjIKYUvCQkCWUdoA-LVqaVEjTMR1GDwLiVMUgNecmhn7yLu_vlqnCRfGr97TOymuXF2qPpxM4sHo_a0QQjkls4BhsVXfLGWvm5mphtyEoPC462Ml1ld-IkPvzlsD338wsi5rYg9byAQuDDEmPPdfZKjgBxOpsFmVpw",
        //     "registered": true,
        //     "refreshToken": "AFxQ4_rr9FXgW0McY8qOv1tF_7kPlVRqgBug3E0djsLRKs2OSTNpIXUjSTRKcd3kpAouzEM0ap8LbchLhV0ssSgS-o1cXqIdj--cOycqME6zwkj6vRueOEVwPKDNU_5_rNR8vNbZzsDNk8R_qz840ny4kGfiq_2WNUPRJ1P9Dkl6V2iqzuT4-nA",
        //     "expiresIn": "3600"
        // }

    }
// Логин в Firebase по e-mail и паролю: https://firebase.google.com/docs/reference/rest/auth?hl=sr#section-sign-in-email-password

}



function auth() {
    Database.login('mim@ya.ru', 'azxsdc')
        .then(data => {Database.token = data[0]; Database.localId = data[1]})
        .then(() => loadContent())
}
auth()

class DragRoot {
}

class DragAble extends DragRoot {
    addItemListeners(item) {
        item.addEventListener('dragstart', this.dragstart)
        item.addEventListener('dragend',   this.dragend)
    }

    dragstart(event) {
        this.item = event.target
        event.target.classList.add('hold', 'dragitem')
        setTimeout(() => event.target.classList.add('hide'), 0)
    }

    dragend(event)  {
        event.target.classList.remove('hold', 'hide', 'dragitem')
    }
}

class DragOver extends DragRoot {
    addItemListeners(item) {
        item.addEventListener('dragenter', this.dragenter)
        item.addEventListener('dragover',  this.dragover)
        item.addEventListener('dragleave', this.dragleave)
        item.addEventListener('drop',      this.drop)
    }

    dragover (event){ event.preventDefault()}
    dragenter(event){ event.target.classList.add('hovered')}
    dragleave(event){ event.target.classList.remove('hovered')}
}


class DragItem extends DragAble{

    constructor() {
        super()
    }

    render() {
        const itm = document.createElement('textarea')
        itm.classList = 'item'
        itm.setAttribute('draggable', 'true')
        super.addItemListeners(itm)
        itm.addEventListener('dragstart', () => new Trasher().render())
        itm.addEventListener('dragenter', this.dragenter)
        itm.addEventListener('dragleave', this.dragleave)
        itm.addEventListener('drop', this.drop)
        itm.addEventListener('change', this.onchange)
        return itm
    }

    onchange(event){
        Database.putKey(this.id,  'text',  this.value)

    }

    dragend(event)  {
        event.target.classList.remove('hold', 'hide', 'dragitem')
        const trash = document.getElementById('trash')
        if(trash) { trash.remove() }
    }

    dragenter(event){ event.target.style.marginBottom = "50px"      }
    dragleave(event){ event.target.style.marginBottom = "0px"       }

    drop(event) {
        event.target.style.marginBottom = "0px"
        const holder = event.target.parentNode
        if(document.getElementById('adder').matches('.hold')) {
            const item = new DragItem().render()
            const itmObj = {hldID: `${holder.id}`, text: ''}
            event.target.insertAdjacentElement('afterend', item)
            Database.save(itmObj).then(() => {
                item.setAttribute('id', `${itmObj.id}`);
                setRowID(holder)             })
        } else {
            const itm = document.querySelector('.hold')
            Database.putKey(itm.id, 'hldID', holder.id)
            event.target.insertAdjacentElement('afterend', itm)
            event.target.classList.remove('hovered')
            setRowID(holder)
        }

        event.stopPropagation();
    }



}


function setRowID (target){
    let rows=0

    target.childNodes.forEach((itm)=>{
        Database.putKey(itm.id, 'rowID', rows)
        rows++
    })
}




class DragPlaceholder extends DragOver {

    constructor() {  super()

    }

    render() {
        const itm = document.createElement('div')
        itm.classList = 'placeholder'
        super.addItemListeners(itm)
        return itm
    }

    drop(event) {
        if(document.getElementById('adder').matches('.hold')) {
            const item = new DragItem().render()
            const itmObj = {hldID: `${event.target.id}`, text: ''}
            Database.save(itmObj).then(() => {
                item.setAttribute('id', `${itmObj.id}`);
                setRowID(event.target)       })
            event.target.appendChild(item)
        } else {
            const item = document.querySelector('.hold')
            Database.putKey(item.id, 'hldID', event.target.id)
            event.target.appendChild(item)
            event.target.classList.remove('hovered')
            setRowID(event.target)
        }

    }
}



class Adder extends DragAble {
    constructor() {  super() }

    render() {
        const itm = document.createElement('div')
        itm.setAttribute('id', 'adder')
        itm.setAttribute('draggable', 'true')
        itm.classList = 'item adder'
        itm.textContent = 'ADD'
        super.addItemListeners(itm)
        document.body.append(itm)
    }

    dragstart(event) {
        this.item = event.target
        event.target.classList.add('hold', 'dragitem')
    }

}


class Trasher extends DragOver {
    constructor() {  super() }

    render() {
        const itm = document.createElement('div')
        itm.setAttribute('id', 'trash')
        itm.classList = 'placeholder'
        itm.textContent = 'Trash'
        super.addItemListeners(itm)
        document.body.append(itm)
    }

    dragenter (){}

    dragleave(event) { event.target.remove() }

    drop(event){
        const itm = document.getElementsByClassName('item hold')[0]
        Database.delete(itm.id)
        itm.remove()
        event.target.remove()
    }
}


///// Логин \\\\\


///// Генерируем основной контент \\\\\
for (let i=1; i<=3; i++) {
    const holders = document.querySelector('.holders')
    const holder = new DragPlaceholder().render()
    holder.setAttribute('id', `hld${i}`)
    holders.append(holder)

}

const add = new Adder().render()

function loadContent() {
    Database.load()
        .then((json) => {
            itemsArray = []
            for (let key in json) {
                json[key].key = key
                itemsArray.push(json[key])
            }

            itemsArray.sort((a, b) => {
                return (a.hldID < b.hldID && -1) || (a.hldID > b.hldID && 1) ||
                       (a.rowID < b.rowID && -1) || (a.rowID > b.rowID && 1) ||0
            })

            itemsArray.forEach((itm) =>{
                const item = new DragItem().render()
                item.setAttribute('id', `${itm.key}`)
                item.value   = `${itm.text}`
                const  hldID = `${itm.hldID}`
                document.getElementById(hldID).appendChild(item)
            })


        })

}
