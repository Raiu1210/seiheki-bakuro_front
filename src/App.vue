<template>
  <div class="hello">
    <!-- SVG preview -->
    <svg ref="svgCard" viewBox="0 0 200 100">
      <rect x="0" y="0" width="200" height="100" fill="#fff" stroke="#ff69b4" stroke-width="15"></rect>
      <text 
      x="50%" 
      y="50%" 
      font-size="8px"
      text-anchor="middle">{{msg}}</text>
    </svg>

    <!-- input for creating SVG -->
    <input v-model="msg" type="text">
    <button @click="create">create</button>
  </div>
</template>

<script>
import firebase from 'firebase'

// firebaseのconfig情報をペースト
const firebaseConfig = {
  apiKey: "AIzaSyCXqpWunMIA5H0tbSbRZOdjUVBOF0KIRGY",
  authDomain: "seiheki-bakuro.firebaseapp.com",
  databaseURL: "https://seiheki-bakuro.firebaseio.com",
  projectId: "seiheki-bakuro",
  storageBucket: "seiheki-bakuro.appspot.com",
  messagingSenderId: "562186276613",
  appId: "1:562186276613:web:a0cadba51b2e95a4a4716c",
  measurementId: "G-7K8E3E7GBL"
};
firebase.initializeApp(firebaseConfig)
const db = firebase.firestore()

// svgをpngに変換
const svg2imageData = (svgElement, successCallback, errorCallback) => {
  const canvas = document.createElement('canvas')
  canvas.width = 1200
  canvas.height = 630
  const ctx = canvas.getContext('2d')
  const image = new Image()
  image.onload = () => {
    ctx.drawImage(image, 0, 0, 1200, 630)
    successCallback(canvas.toDataURL())
  }
  image.onerror = (e) => {
    errorCallback(e)
  }
  const svgData = new XMLSerializer().serializeToString(svgElement)
  image.src = 'data:image/svg+xml;charset=utf-8;base64,' + btoa(unescape(encodeURIComponent(svgData)))
}

export default {
  name: 'hello',
  data () {
    return {
      msg: 'Hello World',
      uuid: '1', // 適当に採番する
      description: 'Vue.jsとFirebaseでOGP生成アプリをつくってみます'
    }
  },
  methods: {
    async create() {
      // refでsvgCardをsvgに設定しているのでthis.$refs.svgCardで要素を取れます
      svg2imageData(this.$refs.svgCard, async (data) => {
        const sRef = firebase.storage().ref()
        const now = Date.now()
        const fileRef = sRef.child(now + '.png')

        // Firebase Cloud Storageにアップロード
        await fileRef.putString(data, 'data_url');
        const url = await fileRef.getDownloadURL()
        // console.log(url)

        // Firestoreに保存しておく
        const card = db.collection('cards').doc(this.uuid)
        await card.set({
          url,
          message: this.description
        });
      })

      alert("画像生成したよ！")
    }
  }
}
</script>