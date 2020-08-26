import React, { useReducer } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { CREATE_ARTIST, UPDATE_ARTIST, INCREMENT_RATING, DECREMENT_RATING } from './context/types';
import ArtistContext from './context/artistContext';
import CreateArtist from './components/CreateArtist';
import EditArtist from './components/EditArtist';
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
            path="/home"
            render={() => (
              <ArtistList
                onClickMinus={(decId) => dispatch({ type: DECREMENT_RATING, id: decId })}
                onClickPlus={(incId) => dispatch({ type: INCREMENT_RATING, id: incId })}
              />
            )}
          />
          <Route
            path="/home"
            render={() => (
              <CreateArtist
                onSubmit={(name) => dispatch({ type: CREATE_ARTIST, artistName: name })}
              />
            )}
          />
          <Redirect to="/home" />
          <Switch>
            <Route
              exact
              path="/artist/:id"
              render={(props) => (
                <EditArtist
                  {...props}
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