import React, { useState, useMemo, useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { v4 } from 'uuid';
import ArtistContext from '../context/artistContext';

const ArtistList = (props) => {
  const [sortedArtists, setSortedArtists] = useState(0);
  const { state } = useContext(ArtistContext);
  const { artist } = state;

  useMemo(() => {
    const sorting = [...artist].sort((a, b) => b.artistStars - a.artistStars);
    setSortedArtists(sorting);
    return sorting;
  }, [artist]);

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th style={{ width: "120px" }} aria-label="Artist Photo">Photo</th>
            <th style={{ width: "300px" }}>Name</th>
            <th style={{ width: "200px" }}>Stars</th>
            <th style={{ width: "200px" }}>Adjust stars</th>
          </tr>
        </thead>
        <tbody>
          {Object.values(sortedArtists).filter((artist) => artist.id > 0).map((artist) => (
              <tr key={v4()}>
                <td style={{ width: "120px" }}>
                  {
                    artist.artistPhoto
                    && <img src={artist.artistPhoto} alt="" style={{ height: 100, width: 100 }} />
                  }
                </td>
                <td style={{ width: "300px" }}>
                  <Link to={`/artist/${artist.id}`}>
                    {artist.artistName}
                  </Link>
                </td>
                <td style={{ width: "200px" }}>
                  {artist.artistStars} <i className="fas fa-star" style={{ color: "yellow" }} />
                </td>
                <td style={{ width: "200px" }}>
                  <button type="button" className="button-rating" onClick={() => props.onClickMinus(artist.id)}>
                    <i className="fas fa-minus-circle fa-2x" style={{ color: "yellow" }} />
                  </button>
                  <button type="button" className="button-rating" onClick={() => props.onClickPlus(artist.id)}>
                    <i className="fas fa-plus-circle fa-2x" style={{ color: "yellow" }} />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

ArtistList.propTypes = {
  onClickMinus: PropTypes.func.isRequired,
  onClickPlus: PropTypes.func.isRequired
};

export default ArtistList;