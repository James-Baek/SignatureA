var app= new Vue({ 
    el:'#app',   // page-content-wrapper 로 하면 일렬로 배열됨.
    data: {
        albums: [],
        delimiters: ['${','}'],
        isActive: false,
        maxPlayCount:0,
        gridGap:30,
        gridMin:175,
        griditems:0
    },

mounted() {
        axios.get('http://127.0.0.1:8000/api/streaming/')
            .then(response => (this.albums = response.data.albums[0]));
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


