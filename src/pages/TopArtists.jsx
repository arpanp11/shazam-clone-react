/* eslint-disable jsx-quotes */
import { ArtistCard, Error, Loader } from '../components';
import { useGetTopChartsQuery } from '../redux/services/shazamCore';

const TopArtists = () => {
  const { data, isFetching, error } = useGetTopChartsQuery();

  if (isFetching) return <Loader title='Loading artists...' />;

  if (error) return <Error />;

  return (
    <div className='flex flex-col'>
      {/* title */}
      <h2 className='font-bold text-3xl text-white text-left mt-4 mb-10'>
        Top artists
      </h2>

      {/* artist list */}
      <div className='flex flex-wrap sm:justify-start justify-center gap-8'>
        {data?.map((track) => (
          <ArtistCard key={track.key} track={track} />
        ))}
      </div>
    </div>
  );
};

export default TopArtists;
