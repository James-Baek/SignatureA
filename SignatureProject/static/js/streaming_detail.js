
new Vue({
  el: '#app',
  delimiters: ['%{','}'],
  data () {
    return {
      albums: [],
      // artists: [],
      image:"../../../media/photo/2019/01/방탄3.jpg",
      image1:"https://lastfm-img2.akamaized.net/i/u/300x300/ad656836a06e4267858d105ddd13fe04.png"
    }
  },
  mounted () {
    axios
      .get('http://127.0.0.1:8000/api/streaming/')
      .then(response => (this.albums = response.data.albums))
      
      
  }
  // mounted() {
  //   axios 
  //     .get('http://127.0.0.1:8000/api/streaming/')
  //     .then(response => (this.artists = response.data[0].artists))
  
})
