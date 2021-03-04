const axios = require('axios');

class ApiController {
  static stoicQuotes (req, res, next) {
    axios({
      method: 'GET',
      url : 'https://stoic-server.herokuapp.com/random'
    })
      .then(quotes => {
        let data = quotes.data[0];
        let quote = data.body;
        // let author = data.author;
        res.status(200).json({quote});
      })
      .catch(err => {
         res.status(500).json({message : 'Internal server error'})
      })
  }

  static adviceQuotes (req, res, next) {
    axios({
      method: 'GET',
      url : 'https://api.adviceslip.com/advice'
    })
      .then(quotes => {
        let advice = quotes.data.slip.advice
        res.status(200).json({advice});
      })
      .catch(err => {
        res.status(500).json({message : 'Internal server error'})     
      })
  }

  static imageUrl (req, res, next) {
    axios({
      method: 'GET',
      url : 'https://pixabay.com/api/?key=20523048-b7ee6fb0ca4bddda7db47c400'
    })
      .then(image => {
        let length = image.data.hits.length;
        let indexRandom = Math.round(Math.random() * length-1);
        let imageUrl = image.data.hits[indexRandom].webformatURL;
        res.status(200).json({imageUrl});
      })
      .catch(err => {
        res.status(500).json({message : 'Internal server error'})     
      })
  }

}

module.exports = ApiController;