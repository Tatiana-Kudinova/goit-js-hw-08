import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);
const KEY_TIME = `videoplayer-current-time`;

player.on(
  `timeupdate`,
  throttle(function onTimeupdate(evt) {
    localStorage.setItem(KEY_TIME, JSON.stringify(evt.seconds));
  }),
  1000
);
const savedTime = localStorage.getItem(KEY_TIME);
player
  .setCurrentTime(savedTime)
  .then(function (seconds) {
    if (savedTime) {
      savedTime = JSON.parse(localStorage.getItem(KEY_TIME));
      //seconds = the actual time that the player seeked to
    }
  })
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        //the time was less than 0 or greater than the video’s duration
        break;

      default:
        // some other error occurred
        break;
    }
  });
