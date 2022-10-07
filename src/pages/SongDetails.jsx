/* eslint-disable operator-linebreak */
/* eslint-disable jsx-quotes */
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { DetailsHeader, Error, Loader, RelatedSongs } from '../components';

import { setActiveSong, playPause } from '../redux/features/playerSlice';
import {
  useGetSongDetailsQuery,
  useGetSongRelatedQuery,
} from '../redux/services/shazamCore';

const SongDetails = () => {
  const dispatch = useDispatch();
  const { songid, id: artistId } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  const { data: songData, isFetching: isFetchingSongDetails } =
    useGetSongDetailsQuery({ songid });
  const {
    data,
    isFetching: isFetchinRelatedSongs,
    error,
  } = useGetSongRelatedQuery({ songid });

  if (isFetchingSongDetails && isFetchinRelatedSongs) {
    return <Loader title='Searching song details' />;
  }

  if (error) return <Error />;

  const pauseClickHandler = () => {
    dispatch(playPause(false));
  };

  const playClickHandler = (song, i) => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

  return (
    <div className='flex flex-col'>
      <DetailsHeader artistId='' songData={songData} />

      <div className='mb-10'>
        <h2 className='text-white text-3xl font-bold'>Lyrics:</h2>

        <div className='mt-5'>
          {songData?.sections[1].type === 'LYRICS' ? (
            songData?.sections[1].text.map((line) => (
              <p className='text-gray-400 text-base my-1'>{line}</p>
            ))
          ) : (
            <p className='text-gray-400 text-base my-1'>
              Sorry, no lyrics found.
            </p>
          )}
        </div>
      </div>

      <RelatedSongs
        data={data}
        isPlaying={isPlaying}
        artistId={artistId}
        activeSong={activeSong}
        handlePauseClick={pauseClickHandler}
        handlePlayClick={playClickHandler}
      />
    </div>
  );
};

export default SongDetails;
