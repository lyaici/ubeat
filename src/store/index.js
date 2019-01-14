import Vue from 'vue';
import Vuex from 'vuex';
import Cookie from 'vue-cookie';
import VuexPersist from 'vuex-persistedstate';
import Service from '@/services';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    playlists: [],
    currentUser: {},
    currentSearch: [],
    currentArtist: {},
    artistAlbums: [],
    currentAlbum: {},
    currentUserProfile: {},
    userProfilePlaylists: [],
  },
  plugins: [VuexPersist({ storage: window.sessionStorage })],
  getters: {
    getCurrentUser(state) {
      return state.currentUser;
    },
    getPlaylists(state) {
      return state.playlists;
    },
    getCurrentSearch(state) {
      return state.currentSearch;
    },
    getCurrentArtist(state) {
      return state.currentArtist;
    },
    getArtistAlbums(state) {
      return state.artistAlbums;
    },
    getCurrentAlbum(state) {
      return state.currentAlbum;
    },
    getCurrentUserProfile(state) {
      return state.currentUserProfile;
    },
    getUserProfilePlaylists(state) {
      return state.userProfilePlaylists;
    }
  },
  mutations: {
    setCurrentUser(state, payload) {
      state.currentUser = payload;
      Cookie.set('token', payload.token, 1);
    },
    disconnection(state) {
      state.currentUser = {};
    },
    setCurrentSearch(state, payload) {
      state.currentSearch = payload.results;
    },
    clearCurrentSearch(state) {
      state.currentSearch = [];
    },
    setPlaylists(state, payload) {
      state.playlists = payload;
    },
    setUserProfilePlaylists(state, payload) {
      state.userProfilePlaylists = payload;
    },
    deletePlaylist(state, id) {
      state.playlists.splice(state.playlists.findIndex(x => x.id === id), 1);
    },
    deletePlaylistTrack(state, { playlistId, trackId }) {
      state.playlists = state.playlists.reduce((playlists, playlist) => {
        const actualPlaylist = playlist;
        if (playlist.id === playlistId) {
          actualPlaylist.tracks.splice(
            actualPlaylist.tracks.findIndex(x => x.trackId === trackId),
            1
          );
        }
        playlists.push(actualPlaylist);
        return playlists;
      }, []);
    },
    modifyPlaylists(state, { playlistId, playlistNewName }) {
      state.playlists = state.playlists.reduce((playlists, playlist) => {
        const actualPlaylist = playlist;
        if (playlist.id === playlistId) {
          actualPlaylist.name = playlistNewName;
        }
        playlists.push(actualPlaylist);
        return playlists;
      }, []);
    },
    setCurrentArtist(state, payload) {
      state.currentArtist = payload;
    },
    setArtistAlbums(state, payload) {
      state.artistAlbums = payload.results;
    },
    addPlaylist(state, playlist) {
      state.playlists.push(playlist);
    },
    addPlaylistTrack(state, { playlistId, track }) {
      state.playlists = state.playlists.reduce((playlists, playlist) => {
        const actualPlaylist = playlist;
        if (playlist.id === playlistId) {
          actualPlaylist.tracks.push(track);
        }
        playlists.push(actualPlaylist);
        return playlists;
      }, []);
    },
    setCurrentAlbum(state, payload) {
      state.currentAlbum = payload;
    },
    logout(state) {
      state.playlists = [];
      state.currentUser = {};
      state.currentSearch = [];
      state.currentArtist = {};
      state.artistAlbums = [];
      state.currentAlbum = {};
      state.currentUserProfile = {};
      Cookie.delete('token');
    },
    setCurrentUserProfile(state, payload) {
      state.currentUserProfile = payload;
    }
  },
  actions: {
    async loadPlaylists(context) {
      const result = await Service.playlistService.get(undefined, undefined, Cookie.get('token'));
      const payload = [];
      result.forEach((element) => {
        if (element.owner !== undefined) {
          if (element.owner.email === context.state.currentUser.email) payload.push(element);
        }
      });
      context.commit('setPlaylists', payload);
    },
    async loadUserProfilePlaylists(context) {
      const result = await Service.playlistService.get(undefined, undefined, Cookie.get('token'));
      const payload = [];
      result.forEach((element) => {
        if (element.owner !== undefined) {
          if (element.owner.email === context.state.currentUserProfile.email) payload.push(element);
        }
      });
      context.commit('setUserProfilePlaylists', payload);
    },
    async removePlaylist(context, id) {
      const response = await Service.playlistService.delete(id, undefined, Cookie.get('token'));
      if (response.status >= 200 && response.status <= 300) {
        context.commit('deletePlaylist', id);
        return true;
      }
      return false;
    },
    async updatePlaylist(context, { id, newName }) {
      const response = await Service.playlistService.update(id, { name: newName }, Cookie.get('token'));
      context.commit('modifyPlaylists', { playlistId: id, playlistNewName: newName });
      return response;
    },
    async removePlaylistTrack(context, { pId, tId }) {
      const response = await Service.playlistTrackService.delete(pId, tId, Cookie.get('token'));
      if (response.status >= 200 && response.status <= 300) {
        context.commit('deletePlaylistTrack', { playlistId: pId, trackId: tId });
        return true;
      }
      return false;
    },
    async addPlaylistTrack(context, { pId, track }) {
      const response = await Service.playlistTrackService.add(track, pId, Cookie.get('token'));
      if (response.status >= 200 && response.status <= 300) {
        context.commit('addPlaylistTrack', { playlistId: pId, track });
        return true;
      }
      return false;
    },
    async createPlaylist(context, playlistName) {
      const response = await Service.playlistService.add({
        name: playlistName,
        owner: context.state.currentUser.email
      }, undefined, Cookie.get('token'));
      const payload = await response.json();
      if (response.status >= 200 && response.status <= 300) {
        context.commit('addPlaylist', payload);
      }
    },
    async search(context, params) {
      const payload = await Service.searchService.get(undefined, params, Cookie.get('token'));
      context.commit('setCurrentSearch', payload);
    },
    async unsecureSearch(context, params) {
      const payload = await Service.searchUnsecureService.get(undefined, params);
      context.commit('setCurrentSearch', payload);
    },
    async loadArtist(context, id) {
      const payload = await Service.artistService.get(id, undefined, Cookie.get('token'));
      context.commit('setCurrentArtist', payload.results[0]);
    },
    async loadArtistUnsecure(context, id) {
      const payload = await Service.artistUnsecureService.get(id);
      context.commit('setCurrentArtist', payload.results[0]);
    },
    async loadArtistAlbums(context, id) {
      const payload = await Service.artistAlbumsService.get(id, undefined, Cookie.get('token'));
      context.commit('setArtistAlbums', payload);
    },
    async loadArtistAlbumsUnsecure(context, id) {
      const payload = await Service.artistAlbumsUnsecureService.get(id);
      context.commit('setArtistAlbums', payload);
    },
    async loadCurrentAlbum(context, id) {
      let response = await Service.albumService.get(id, undefined, Cookie.get('token'));
      const payload = response.results[0];
      response = await Service.albumTrackService.get(id, undefined, Cookie.get('token'));
      payload.tracks = response.results;
      context.commit('setCurrentAlbum', payload);
    },
    async loadCurrentAlbumUnsecure(context, id) {
      let response = await Service.albumUnsecureService.get(id);
      const payload = response.results[0];
      response = await Service.albumTrackUnsecureService.get(id);
      payload.tracks = response.results;
      context.commit('setCurrentAlbum', payload);
    },
    async login(context, payload) {
      const response = await Service.loginService.login(payload);
      if (response.status === 401) return 401;
      const user = await response.json();
      context.commit('setCurrentUser', user);
      context.dispatch('loadPlaylists');
      return 200;
    },
    async loginOnLoad(context, token) {
      const response = await Service.tokenService.get(undefined, undefined, token);
      context.commit('setCurrentUser', response);
      context.dispatch('loadPlaylists');
    },
    async register(context, payload) {
      const response = await Service.registerService.register(payload);
      if (response.status === 401) return 401;
      const user = await response.json();
      const userResponse = context.dispatch('login', { email: user.email, password: payload.password });
      if (userResponse === 200) return 200;
      return 500;
    },
    async logout(context) {
      await Service.logoutService.logout();
      context.commit('logout');
    },
    async loadCurrentUserProfile(context, id) {
      const payload = await Service.userService.get(id, undefined, Cookie.get('token'));
      context.commit('setCurrentUserProfile', payload);
    }
  },
});
