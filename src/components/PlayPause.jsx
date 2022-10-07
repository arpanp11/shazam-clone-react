/* eslint-disable jsx-quotes */
/* eslint-disable no-confusing-arrow */
import { FaPauseCircle, FaPlayCircle } from 'react-icons/fa';

const PlayPause = ({ isPlaying, activeSong, song, handlePlay, handlePause }) =>
  // eslint-disable-next-line implicit-arrow-linebreak
  isPlaying && activeSong?.title === song.title ? (
    <FaPauseCircle size={35} className='text-gray-300' onClick={handlePause} />
  ) : (
    <FaPlayCircle size={35} className='text-gray-300' onClick={handlePlay} />
  );

export default PlayPause;
