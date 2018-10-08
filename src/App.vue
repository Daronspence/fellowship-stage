<template>
  <div id="app" class="mx-auto max-w-2xl flex justify-center flex-col min-h-screen">
    <div id="band" class="flex justify-between mb-8">
      <div class="w-1/2 flex justify-start flex-wrap">
        <person :person="getBandMember('bass')"></person>
        <person :person="getBandMember('drums')"></person>
        <person :person="getBandMember('piano')"></person>
        <person :person="getBandMember('guitar')"></person>
      </div>
      <div class="w-1/2 flex justify-end flex-wrap">
        <person :person="getBandMember('pads')"></person>
        <person :person="getBandMember('violin')"></person>
      </div>
    </div>
    <div id="singers">
      <draggable v-model="singers" class="flex justify-center py-8 flex-wrap">
        <singer v-for="(singer, index) in singers" :key="singer.name" :person="singer" :mics="mics" :index="index" :change-mic-value="changeMicValue"></singer>
      </draggable>
    </div>
    <stage></stage>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import singer from './components/Singer.vue'
import person from './components/Person.vue'
import stage from './components/Stage.vue'

export default {
  name: 'app',
  components: {
    draggable,
    singer,
    person,
    stage
  },
  data: function() {
    return {
      singers: [
        {
          name: 'Taylor Siemens',
          avatar: 'https://i.pravatar.cc/120',
          mic: 'lead'
        },
        {
          name: 'Alexandria Duarte',
          avatar: 'https://i.pravatar.cc/130',
          mic: 'bgv2'
        },
        {
          name: 'Sarah Roffler',
          avatar: 'https://i.pravatar.cc/121',
          mic: ''
        },
        {
          name: 'Myles Wren',
          avatar: 'https://i.pravatar.cc/131',
          mic: 'bgv3'
        },
        {
          name: 'Taylor Denton',
          avatar: 'https://i.pravatar.cc/132',
          mic: 'bgv1'
        },
        {
          name: 'Kraig Loyd',
          avatar: 'https://i.pravatar.cc/122',
          mic: 'co-lead'
        },
        {
          name: 'Jason Jackson II',
          avatar: 'https://i.pravatar.cc/140',
          mic: ''
        }
      ],
      band: [
        {
          name: 'Joel',
          instrument: 'bass',
          avatar: 'https://i.pravatar.cc/123'
        },
        {
          name: 'Zeke',
          instrument: 'pads',
          avatar: "https://i.pravatar.cc/125"
        },
        {
          name: 'Gailey',
          instrument: 'violin',
          avatar: "https://i.pravatar.cc/126"
        },
        {
          name: 'Nigel',
          instrument: 'piano',
          avatar: "https://i.pravatar.cc/127"
        },
        {
          name: 'Emmanuel',
          instrument: 'drums',
          avatar: "https://i.pravatar.cc/128"
        },
        {
          name: 'Bob',
          instrument: 'guitar',
          avatar: "https://i.pravatar.cc/129"
        }
      ],
      mics: [
        'lead', 'co-lead', 'bgv1', 'bgv2', 'bgv3', 'bgv4', 'bgv5', 'bgv6'
      ],
      singersOrder: []
    }
  },
  methods: {
    changeMicValue(val, index){
      this.singers[index].mic = val;
    },
    getBandMember(instrument){
      return this.band.find(member => member.instrument == instrument) || {};
    }
  },
  watch: {
    singers: {
      deep: true,
      handler: function(val){
        window.localStorage.setItem('singers', JSON.stringify(val));
      }
    }
  },
  created: function(){
    let oldSingers = JSON.parse(window.localStorage.getItem('singers'));
    
    if (!oldSingers)
      return;

    this.singers.forEach( singer => {
      var old = oldSingers.find(person => person.name === singer.name);
      if ( old ){
        singer.mic = old.mic;
      }
    });

    let oldSingersThatAreCurrentSingers = [];
    let singersCopy = JSON.parse(JSON.stringify(this.singers));

    // if current singer exactly matches old value, store it
    singersCopy.forEach(singer => {
      var target = singer;
      var targetKeys = Object.keys(target);
      var index = oldSingers.findIndex(function(entry) {
          var keys = Object.keys(entry);
          return keys.length == targetKeys.length && keys.every(function(key) {
              return target.hasOwnProperty(key) && entry[key] === target[key];
          });
      });
      if (index !== -1){
        oldSingersThatAreCurrentSingers.push(singer);
      }
    });

    // if all old singers are current singers, set old singers as current singers
    if ((this.singers.length === oldSingersThatAreCurrentSingers.length) && (this.singers.length === oldSingers.length)){
      this.singers = oldSingers;
    } else {
      // eslint-disable-next-line
      console.log('Singers did not match, ignoring order.');
    }
      
  }
}
</script>

<style lang="scss">


</style>
