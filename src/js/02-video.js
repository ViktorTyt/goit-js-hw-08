//====Vimeo=======
import VimeoPlayer from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new VimeoPlayer(iframe);

const onPlayer = data =>
  localStorage.setItem('videoplayer-current-time', JSON.stringify(data.seconds));

player.on('timeupdate', throttle(onPlayer, 1000));

const getSavedTime = localStorage.getItem('videoplayer-current-time');

player.setCurrentTime(getSavedTime);
