UserAccount = React.createClass({
  mixins: [React.addons.LinkedStateMixin],

  getInitialState: function(){
    return { email: "",
             address: "",
             city: "",
             state: "",
             orders: []};
  },

  componentDidMount: function() {
    UserStore.addChangeListener(this._userChanged);
    ApiUtil.fetchUserInfo(window.CURRENT_USER_ID);
  },

  _userChanged: function() {
    this.setState( UserStore.user() );
  },

  handleUserUpdate: function(e){
    e.preventDefault();
    ApiUtil.updateUser( this.state );
  },

  render: function(){
    return (
      <div className="container">
        <h3>Account Info</h3>
        <div className="form-group">
          <label>Email
            <input type="text" className="form-control" id="email"
                               valueLink={this.linkState("email")}/>
          </label>
        </div>

        <div className="form-group">
          <label>Address
            <input type="text" className="form-control" id="address"
                               valueLink={this.linkState("address")}/>
          </label>
        </div>
        <div className="form-group">
          <label>City
            <input type="text" className="form-control" id="city"
                               valueLink={this.linkState("city")}/>
          </label>
        </div>
        <div className="form-group">
          <label>State
            <input type="text" className="form-control" id="state"
                               valueLink={this.linkState("state")}/>
          </label>
        </div>
        <button type="submit"
                className="btn btn-default"
                onClick={this.handleUserUpdate}>Update</button>

        <h3>Past Orders</h3>
          <div> {
            this.state.orders.map(function(order) {
              return <PastOrder order={order} />;
            })
         }
         </div>
      </div>
    );
  }
});
