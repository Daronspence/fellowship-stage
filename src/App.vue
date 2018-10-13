<template>
  <div id="app" class="mx-auto max-w-2xl flex justify-center flex-col min-h-screen">
    <a href="https://fellowshipdallas.org" class="block absolute pin-b pin-l w-8 h-8 md:w-16 md:h-16 mb-2" target="_blank">
      <img src="./assets/logo.png" alt="Fellowship Dallas" />
    </a>
    <a href="https://github.com/daronspence/fellowship-stage" class="block absolute pin-b pin-r w-8 h-8 md:w-16 md:h-16 mb-2 mr-2" target="_blank">
      <img src="./assets/github.png" alt="Github Repo" />
    </a>
    <div id="band" class="flex justify-between mb-8">
      <div class="w-1/2 flex justify-start flex-wrap">
        <instrumentalist :person="getBandMember('bass')"></instrumentalist>
        <instrumentalist :person="getBandMember('drums')"></instrumentalist>
        <instrumentalist :person="getBandMember('piano')"></instrumentalist>
        <instrumentalist :person="getBandMember('guitar')"></instrumentalist>
      </div>
      <div class="w-1/2 flex justify-end flex-wrap">
        <instrumentalist :person="getBandMember('pads')"></instrumentalist>
        <instrumentalist :person="getBandMember('violin')"></instrumentalist>
      </div>
    </div>
    <div id="singers">
      <draggable v-model="singers" class="flex justify-center py-8 flex-wrap">
        <singer v-for="(singer, index) in singers" :key="singer.name" :person="singer" :mics="mics" :index="index" @change-mic="changeMicValue($event, index)"></singer>
      </draggable>
    </div>
    <stage></stage>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import person from './components/Person.vue'
import singer from './components/Singer.vue'
import instrumentalist from './components/Instrumentalist.vue'
import stage from './components/Stage.vue'

export default {
  name: 'app',
  components: {
    draggable,
    person,
    singer,
    instrumentalist,
    stage,
  },
  data: function() {
    return {
      singers: [
        {
          name: 'Taylor Siemens',
          avatar: 'https://api.adorable.io/avatars/120/',
          mic: ''
        },
        {
          name: 'Alexandria Duarte',
          avatar: 'https://api.adorable.io/avatars/130/',
          mic: ''
        },
        {
          name: 'Sarah Roffler',
          avatar: 'https://api.adorable.io/avatars/121/',
          mic: ''
        },
        {
          name: 'Myles Wren',
          avatar: 'https://api.adorable.io/avatars/131/',
          mic: ''
        },
        {
          name: 'Taylor Denton',
          avatar: 'https://api.adorable.io/avatars/132/',
          mic: ''
        },
        {
          name: 'Kraig Loyd',
          avatar: 'https://api.adorable.io/avatars/122/',
          mic: ''
        }
      ],
      band: [
        {
          name: 'Joel',
          instrument: 'bass',
          avatar: 'https://api.adorable.io/avatars/123/'
        },
        {
          name: 'Zeke',
          instrument: 'pads',
          avatar: "https://api.adorable.io/avatars/125/"
        },
        {
          name: 'Gailey',
          instrument: 'violin',
          avatar: "https://api.adorable.io/avatars/126/"
        },
        {
          name: 'Nigel',
          instrument: 'piano',
          avatar: "https://api.adorable.io/avatars/127/"
        },
        {
          name: 'Emmanuel',
          instrument: 'drums',
          avatar: "https://api.adorable.io/avatars/128/"
        },
        {
          name: 'Bob',
          instrument: 'guitar',
          avatar: "https://api.adorable.io/avatars/129/"
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
