import React, { useReducer } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { CREATE_ARTIST, UPDATE_ARTIST, INCREMENT_RATING, DECREMENT_RATING } from './context/types';
import ArtistContext from './context/artistContext';
import CreateArtist from './components/CreateArtist';
import UpdateArtist from './components/UpdateArtist';
import ArtistList from './components/ArtistList';
import artistReducer from './context/artistReducer';
import initialState from './context/initialState';
import './App.css';

function App() {
  const [state, dispatch] = useReducer(artistReducer, initialState);

  return (
    <div className="App">
      <ArtistContext.Provider value={{ state, dispatch }}>
        <Router>

          <Route
            path="/list"
            render={() => (
              <ArtistList
                onClickMinus={(selectedId) => dispatch({ type: DECREMENT_RATING, id: selectedId })}
                onClickPlus={(selectedId) => dispatch({ type: INCREMENT_RATING, id: selectedId })}
              />
            )}
          />
          <Route
            path="/list"
            render={() => (
              <CreateArtist
                onSubmit={(name) => dispatch({ type: CREATE_ARTIST, artistName: name })}
              />
            )}
          />
          <Redirect to="/list" />
          <Switch>
            <Route
              exact path="/artist/:id"
              render={(props) => (
                <UpdateArtist {...props}
                  onSubmit={(data) => dispatch({
                    type: UPDATE_ARTIST,
                    id: data.id,
                    artistName: data.artistName,
                    artistPhoto: data.artistPhoto,
                    artistStars: data.artistStars,
                  })}
                />
              )}
            />
          </Switch>
        </Router>
      </ArtistContext.Provider>
    </div>
  );
}

export default App;