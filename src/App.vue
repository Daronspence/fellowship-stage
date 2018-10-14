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
        <instrumentalist :person="getBandMember('Bass Guitar')"></instrumentalist>
        <instrumentalist :person="getBandMember('Drums')"></instrumentalist>
        <instrumentalist :person="getBandMember('Piano')"></instrumentalist>
        <instrumentalist :person="getBandMember('Electric Guitar')"></instrumentalist>
        <instrumentalist :person="getBandMember('Acoustic Guitar')"></instrumentalist>
      </div>
      <div class="w-1/2 flex justify-end flex-wrap">
        <instrumentalist :person="getBandMember('Pads')"></instrumentalist>
        <instrumentalist :person="getBandMember('Violin')"></instrumentalist>
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
      seeded: false,
      singers: [],
      band: [],
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
        if (this.seeded){
          // eslint-disable-next-line
          console.log('setting singers in storage', val)
          window.localStorage.setItem('singers', JSON.stringify(val))
        }
      }
    }
  },
  created: function(){
    var that = this;
    fetch('/.netlify/functions/fetchTeam')
      .then(function(response) {
        return response.text();
      })
      .then(function(body){
        let r = JSON.parse(body);
        
        let bandTeam = r.included.find(team => team.attributes.name === "Worship Band");
        let singersTeam = r.included.find(team => team.attributes.name === "Front Line Worship Singers")

        let bandMembers = r.data.filter(member => member.relationships.team.data.id === bandTeam.id);

        let singers = r.data.filter(member => member.relationships.team.data.id === singersTeam.id);

        that.band = bandMembers.map(member => {
          return {
            name: member.attributes.name,
            instrument: member.attributes.team_position_name,
            avatar: member.attributes.photo_thumbnail
          }
        })

        that.singers = singers.map(singer => {
          return {
            name: singer.attributes.name,
            avatar: singer.attributes.photo_thumbnail,
            mic: ''
          }
        })

        let oldSingers = JSON.parse(window.localStorage.getItem('singers'));
    
        if (!oldSingers){
          that.seeded = true;
          return;
        }

        that.singers.forEach( singer => {
          var old = oldSingers.find(person => person.name === singer.name);
          if ( old ){
            singer.mic = old.mic;
          }
        });

        let oldSingersThatAreCurrentSingers = [];
        let singersCopy = JSON.parse(JSON.stringify(that.singers));

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
        if ((that.singers.length === oldSingersThatAreCurrentSingers.length) && (that.singers.length === oldSingers.length)){
          that.singers = oldSingers;
        } else {
          // eslint-disable-next-line
          console.log('Singers did not match, ignoring order.');
        }

        that.$nextTick(function(){
          that.seeded = true;
        });

      })
  }
}
</script>