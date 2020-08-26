import React, { useState } from 'react';
import PropTypes from 'prop-types';

const CreateArtist = (props) => {
  const [artist, setArtist] = useState(0);

  const onChange = (e) => {
    setArtist({ ...artist, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onSubmit(artist.artistName);
    setArtist({
      artistName: '',
    });
  };

  return (
    <div>
      <h2 className="main-header">Ranking the Artists</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          placeholder="Add a new artist here"
          name="artistName"
          className="input"
          value={artist.artistName}
          required
          onChange={(e) => onChange(e)}
        />
        <button type="submit" className="button">Submit</button>
      </form>
    </div>

  );
};

CreateArtist.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default CreateArtist;