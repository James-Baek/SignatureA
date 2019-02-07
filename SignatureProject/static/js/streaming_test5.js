
new Vue({
    el: '#app',
    delimiters: ['%{','}'],
    data () {
      return {
        artists: [
        {image:"/media/photo/2019/01/방탄.jpg",
            url: "http://127.0.0.1:8000/photo/photo/2"
        },

        {image2:"/media/photo/2019/01/방탄2.jpg",
            url:"http://127.0.0.1:8000/photo/photo/3"
    },
        {image3:"/media/photo/2019/01/방탄3.jpg",
            url:"http://127.0.0.1:8000/photo/photo/3"
    },
        {image4:"/media/photo/2019/01/방탄4.jpg",
            url:"http://127.0.0.1:8000/photo/photo/1"
    },     
        {image5:"/media/photo/2019/01/beatles.jpg",
            url:"http://127.0.0.1:8000/photo/photo/4"
    },
        {image6:"/media/photo/2019/01/beatles2.jpg",
            url:"http://127.0.0.1:8000/photo/photo/5"
    },

        {image7:"/media/photo/2019/01/exid1.jpg",
            url:"http://127.0.0.1:8000/photo/photo/6"
    },
        {image8:"/media/photo/2019/01/exid2.jpg",
            url:"http://127.0.0.1:8000/photo/photo/7"
    },

        {image9:"/media/photo/2019/01/jackson.jpg",
            url:"http://127.0.0.1:8000/photo/photo/7"
    },
        {image10:"/media/photo/2019/01/jackson2.jpg",
            url:"http://127.0.0.1:8000/photo/photo/8"
    },
        {image11:"/media/photo/2019/01/jackson3.jpg",
            url:"http://127.0.0.1:8000/photo/photo/9"
    },
        {image12:"/media/photo/2019/01/muse.jpg"},
        {image13:"/media/photo/2019/01/muse1.jpg"},
        {image14:"https://lastfm-img2.akamaized.net/i/u/300x300/ad656836a06e4267858d105ddd13fe04.png"},
       
        ],
       
        albums:[

        ],
        isActive: false,
        maxPlayCount:0,
        gridGap:30,
        gridMin:175,
        griditems:0
      }
    },
    mounted () {
      axios
        .get('http://127.0.0.1:8000/api/streaming/')
        .then(response => (this.albums = response.data[0].albums))
        
    },
    methods: {
        isLoaded: function() {
            this.isActive = true;
        },
        m_percentage: function(value) {
            return parseInt((value * 100) / app.$data.maxPlayCount);
        },
        changeGridGap: function() {
            document.querySelector('main').style.setProperty('--grid-gap', this.gridGap + 'px');
        },
        changeGridMin: function() {
            document.querySelector('main').style.setProperty('--grid-min', this.gridMin + 'px');
        },
        changeGridItems: function() {
            var gridItemSetting = this.gridItems;
            if (this.gridItems == 0) {
                gridItemSetting = 'auto-fill';
            }
            document.querySelector('main').style.setProperty('--grid-items', gridItemSetting);
        }
    },
    computed: {
    },
    filters: {
        percentage: function(value) {
            return parseInt((value * 100) / app.$data.maxPlayCount);
        }
    }
});
    // mounted() {
    //   axios 
    //     .get('http://127.0.0.1:8000/api/streaming/')
    //     .then(response => (this.artists = response.data[0].artists))
    

  