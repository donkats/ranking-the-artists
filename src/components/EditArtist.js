import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import ArtistContext from '../context/artistContext';

const EditArtist = (props) => {
  const artistContext = useContext(ArtistContext);
  const { artist } = artistContext.state;

  const selectedArtistIndex = artist.findIndex((artist) => artist.id === parseInt(props.match.params.id));
  const selectedArtistInfo = artistContext.state.artist[selectedArtistIndex];

  const [formData, setFormData] = useState({
    id: selectedArtistInfo.id,
    artistName: selectedArtistInfo.artistName,
    artistPhoto: selectedArtistInfo.artistPhoto,
    artistStars: selectedArtistInfo.artistStars,
  });

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [message, setMessage] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    props.onSubmit(formData);
    setMessage('Saved succesfully!');
    setFormData({
      artistName: formData.artistName,
      artistPhoto: formData.artistPhoto,
    });
  };

  const history = useHistory();

  return (
    <div>
      <h2 style={{ "margin-left": "20px" }}>Edit info for {formData.artistName}</h2>
      <form onSubmit={(e) => onSubmit(e)}>
        <p style={{ "margin-left": "20px" }}>Artist name:</p>
        <input
          type="text"
          placeholder="Change artist name"
          name="artistName"
          className="input"
          value={formData.artistName}
          required
          onChange={(e) => onChange(e)}
        />
        <p style={{ "margin-left": "20px" }}>Artist photo:</p>
        <input
          type="text"
          placeholder="Add your photo URL here"
          name="artistPhoto"
          className="input"
          value={formData.artistPhoto}
          onChange={(e) => onChange(e)}
        />
        <div>
          <button type="button" className="button" onClick={() => history.goBack()}>Back</button>
          <button type="submit" className="button">Save</button>
          <span style={{ "margin-left": "10px", "color": "blue" }}>{message}</span>
        </div>
      </form>
    </div>
  );
};

EditArtist.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }),
};

export default EditArtist;