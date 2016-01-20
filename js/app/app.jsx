"use strict";

var stripe_url = 'https://api.stripe.com/v1/'
var secret_key = 'sk_test_HMRpJ7pv3EieQ9eHkYSSEVMg'

  var Backer = React.createClass({

  mixins: [ReactFireMixin],

  createCardToken: function() {
 var card = this.CreditCard.cardNumber.getValue();
 console.log(card);

  var cardDetails = {
    "card[number]": this.refs.cardNumber,
    "card[exp_month]": this.refs.expMonth,
    "card[exp_year]": this.refs.expYear,
    "card[cvc]": this.refs.cvc
  };

  console.log(cardDetails)

  var formBody = [];
  for (var property in cardDetails) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(cardDetails[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");

  return fetch(stripe_url + 'tokens', {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Bearer ' + secret_key
    },
    body: formBody
  });
},


    render: function() {

        var ButtonGroup = ReactBootstrap.ButtonGroup,
            Button  = ReactBootstrap.Button;

        return (<div className="container">

                    <h1>BACKER</h1>

                    <div className="panel panel-default credit-card-box">


                    <ArtistInfo></ArtistInfo>
                    <Button bsSize="large" onClick={this.createCardToken}>Submit</Button>
                    </div>
                </div>);
    }
});

var ArtistInfo = React.createClass({
render: function() {

    var Input = ReactBootstrap.Input,
        Button  = ReactBootstrap.Button;

    return (<div>

      <Input type="input" ref="name" className="form-control input-lg" id="name" placeholder="What do you call yourselves?" />
      <Input type="input" ref="about" className="form-control input-lg" id="cardNumber" placeholder="Say a bit about yourself." />


            </div>);
}
});



React.render(
  <Backer />, document.getElementById('app')
);
