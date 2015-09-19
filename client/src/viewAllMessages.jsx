var React = require('react');
var Message = require('./message');

var ViewAllMessages = React.createClass({
  render: function() {
    var messagesObject = this.props.messages; // from Firebase
    // Push messages from Firebase to messageRows
    var messageRows = [];
    for(messageKey in messagesObject){
      var commentRows = [];
      var message = messagesObject[messageKey];
      messageRows.push(
        <Message
          id={ this.props.id }
          uid={ message[4] }
          message={ message[0] }
          comments={ message[5] }
          votes={ message[3] }
          messageId={ message[2] }
          timestamp={ message[1] }/>
      )
    }

    // Sort Messages by time or popularity (ie number of votes)
    var messageRowsSortedOptions = {
      recent: messageRows.slice().sort(function(a,b){
        return new Date(b.props.timestamp) - new Date(a.props.timestamp);
      }),
      popular: messageRows.slice().sort(function(a,b){
        return b[3] - a[3];
      }),
      favorites: messageRows.filter(function(message){
        ///// ?? ??? ?? ? ? ? ? 
      }),

      myPosts: messageRows.filter(function(message){
       ////// ?? ? ? ? ?  ? ?
      })
    }
    return (
      <div style={ this.styles.messageRows }>
        { messageRowsSortedOptions[this.props.sortBy] }
      </div>
    )
  },

  styles: {
    messageRows: {
      padding: '10px',
    },
  }
});

module.exports = ViewAllMessages;
