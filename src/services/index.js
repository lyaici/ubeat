import Config from '../config';
import FetchApi from './FetchApi';

const playlistService = new FetchApi(Config.api, '/playlists');
const playlistTrackService = new FetchApi(Config.api, '/playlists', '/tracks');
const searchService = new FetchApi(Config.api, '/search');
const searchUnsecureService = new FetchApi(Config.unsecure, '/search');
const artistService = new FetchApi(Config.api, '/artists');
const artistUnsecureService = new FetchApi(Config.unsecure, '/artists');
const artistAlbumsService = new FetchApi(Config.api, '/artists', '/albums');
const artistAlbumsUnsecureService = new FetchApi(Config.unsecure, '/artists', '/albums');
const albumService = new FetchApi(Config.api, '/albums');
const albumUnsecureService = new FetchApi(Config.unsecure, '/albums');
const albumTrackService = new FetchApi(Config.api, '/albums', '/tracks');
const albumTrackUnsecureService = new FetchApi(Config.unsecure, '/albums', '/tracks');
const loginService = new FetchApi(Config.api, '/login');
const tokenService = new FetchApi(Config.api, '/tokenInfo');
const logoutService = new FetchApi(Config.api, '/logout');
const registerService = new FetchApi(Config.api, '/signup');
const userService = new FetchApi(Config.api, '/users');


export default {
  playlistService,
  playlistTrackService,
  searchService,
  searchUnsecureService,
  artistService,
  artistAlbumsService,
  albumService,
  albumTrackService,
  loginService,
  tokenService,
  logoutService,
  registerService,
  artistUnsecureService,
  artistAlbumsUnsecureService,
  albumUnsecureService,
  albumTrackUnsecureService,
  userService
};
