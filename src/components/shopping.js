import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
//const router = express.Router();
import Navbar from './navbar';
//import ProductOnLine from './productOnLine';
//import DownloadPage from './downloadPage';
class Shopping extends React.Component {
  //  constructor(props) {
  //      super(props);
      // this.state={ posts : [] };
      // fetch('http://localhost:9002/Category_list/')
      // .then(response =>{
      //     response.json();
      // })
      // .then(posts => {
      //     this.setState({posts})
      // })
      // .then( (err) => {
      //     console.log(err);
      // })

    //}

    render() {
    return (
      <div className="App">
      <Router>
        <Navbar />
       </Router>

      </div>

    );




};
};

export default Shopping;
