<template>
  <div class="hello">
    <!-- input for creating SVG -->
    <!-- <h1>あなたの性癖をここに入力しよう</h1> -->
    <TitleLabel title="あなたの性癖をここに入力しよう" />
    <input v-model="line1" class="seiheki-form" type="text" placeholder="1行目（２０文字以内）" maxlength='20'><br>
    <input v-model="line2" class="seiheki-form" type="text" placeholder="2行目（２０文字以内）" maxlength='20'><br>
    <input v-model="line3" class="seiheki-form" type="text" placeholder="3行目（２０文字以内）" maxlength='20'><br>
  
    <!-- SVG preview -->
    <svg ref="svgCard" viewBox="0 0 200 100">
      <rect x="0" y="0" width="200" height="100" fill="#fff" stroke="#ff69b4" stroke-width="15"></rect>
      <text x="50%" y="40%" font-size="8px" text-anchor="middle">{{line1}}</text>
      <text x="50%" y="50%" font-size="8px" text-anchor="middle">{{line2}}</text>
      <text x="50%" y="60%" font-size="8px" text-anchor="middle">{{line3}}</text>
    </svg>

    <button @click="button_action" class="create_img_button">性癖をツイート！</button>

  </div>
</template>

<script>
import firebase from 'firebase'
import TitleLabel from '@/components/Title_label.vue'

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
  components: { 
    TitleLabel
  },
  data () {
    return {
      line1: '',
      line2: '',
      line3: '',
      uuid: '1', // 適当に採番する
      tweet_url: '',
      description: 'Vue.jsとFirebaseでOGP生成アプリをつくってみます',
    }
  },
  methods: {
    async button_action() {
      await this.create()
      this.tweet()
    },
    async create() {
      // refでsvgCardをsvgに設定しているのでthis.$refs.svgCardで要素を取れます
      // var tweet_url
      var now = Date.now()
      this.tweet_url = "https://seiheki-bakuro.firebaseapp.com/bigben?image_name=" + now + ".png"

      await svg2imageData(this.$refs.svgCard, async (data) => {
        const sRef = firebase.storage().ref()
        const fileRef = sRef.child(now + '.png')
        
        // Firebase Cloud Storageにアップロード
        await fileRef.putString(data, 'data_url');
        const url = await fileRef.getDownloadURL()

        // Firestoreに保存しておく
        const card = db.collection('cards').doc(this.uuid)
        await card.set({
          url,
          message: this.description
        });
      })
    },
    async tweet() {
      const shareURL = 'https://twitter.com/intent/tweet?text=' + '私の性癖暴露カード ' + '%20%23性癖暴露 %20%23性癖 ' + '&url=' + this.tweet_url;
      location.href = shareURL
    }
  }
}
</script>


<style>
  input{
    font-size:16px;
  }
  input[type="text"]:focus,
  texture:focus {
      box-shadow: 0 0 7px #3498db;
      border: 1px solid #3498db;
  }

  .seiheki-form {
    width: 80%;
    display: block;
    margin-left: auto;
    margin-right: auto;
    padding: 0.8em;
    outline: none;
    border: 1px solid #DDD;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    border-radius: 3px;
    font-size: 16px;
  }

  .create_img_button {
    display: block;
    margin-left: auto;
    margin-right: auto;
    padding: 0.5em 1em;
    text-decoration: none;
    border-radius: 4px;
    color: #ffffff;
    background-image: linear-gradient(45deg, rgb(253, 0, 241) 0%, #ff95e8 100%);
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.29);
    border-bottom: solid 3px #c58668;
    width: 300px;
    height: 80px;
    font-size: 28px;
  }
  .create_img_button:active {
    -webkit-transform: translateY(4px);
    transform: translateY(4px);
    box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.2);
    border-bottom: none;
  }
</style>