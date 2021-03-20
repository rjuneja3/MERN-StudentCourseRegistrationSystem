import CreateArticle from './CreateArticle';
import React, { useState } from 'react';
//
import axios from 'axios';
//
function View (props) {
  // read the info from props, coming from the ancestor component
  const { screen, setScreen } = props;
  // return a stateful value and funcion to update it
  const [data, setData] = useState();
  //
  const [article, setArticle] = useState('');
  // called when user clicks on Logout button
  // to clear the cookie and set the screen state variable 
  // back to its initial state.
  const deleteCookie = async () => {
    try {
      await axios.get('/signout');
      setScreen('auth');
    } catch (e) {
      console.log(e);
    }
  };
  // called when user clicks on Get Data button
  // end-point demonstrates another example for the use
  // of cookie specific response from the server.
  const verifyCookie = async () => {
    try {
      const res = await axios.get('/welcome');
      console.log(res.data)
      setData(res.data);
    } catch (e) {
      console.log(e);
    }
  }
  //
  const listArticles = (username) => {

    console.log('in lisArticles: ',username)
    //setArticle('n')

  }
  //
  const createArticle = () => {
    console.log('in createArticle')
    setArticle('y')

  }
  //
  return (
    <div className="App">
      {article !== 'y'
        ? <div>
            <p>{screen}</p>
            <p>{data}</p>
            <button onClick={verifyCookie}>Verify Cookie</button>
            <button onClick={createArticle}>Create Article</button>
            <button onClick={listArticles(data)}>List Articles</button>

            <button onClick={deleteCookie}>Log out</button>
          </div>            
        : <CreateArticle screen={screen} setScreen={setScreen} />
      }
    </div>
  );
}

//
export default View;