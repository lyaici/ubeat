<template>
  <div class="bio">
    <div class="artist-logo">
      <img :src='currentArtist.pictureArtist'>
    </div>
    <div class="artist-bio">
      <div class="artist-name">
        <h1>{{currentArtist.artistName}}</h1>
        <a target="_blank" :href="currentArtist.artistLinkUrl">
          <img src="@/assets/temp_album/AppleMusic.png">
        </a>
      </div>
      <div class="bio-paragraph">
        <p>{{currentArtist.bio}}</p>
        <p>{{currentArtist.primaryGenreName}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { Button } from '@/components/utils';

export default {
  name: 'Bio',
  props: {
    currentArtist: {
      type: Object,
      required: true,
    }
  },
  components: {
    Button,
  }
};
</script>

<style lang="scss" scoped>
@import '@/styles/typography.scss';
@import '@/styles/display.scss';

$img-size: 200px;
@media screen and (min-width: $tablet-bp){
  .bio {
    display: flex;
    flex-direction: row;
  }
}
@media screen and (max-width: $tablet-bp){
  .bio {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
}
.bio {
  .artist-logo {
    img {
      max-width: $img-size;
    }
    margin-right: 30px;
  }
  @media screen and (min-width: $tablet-bp){
    .artist-name {
      display: flex;
      flex-direction: row;
    } 
  }
  .artist-name {
    h1 {
      margin-right: 20px;
    }
    a {
      padding: 10px;
    }
  }
  .bio-paragraph {
    max-width: 500px;
    margin: 0 10px;
  }
}
</style>
