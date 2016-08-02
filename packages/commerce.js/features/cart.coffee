class Commerce.Cart

    constructor: (@m) ->

        @cart_id = @id()

    id: () ->
      #If using current cart token
      if @m.Storage.get('commercejs_cart_id') != null
        #CommercejsDebug('info', 'Existing cart session (token) reinstated', 'Using existing cart ' + @m.Storage.get('commercejs_cart_id'));
        return @m.Storage.get('commercejs_cart_id');
      else
        self = @m
        return @m.Request 'cart', 'GET', null, (data) ->
          self.Storage.set('commercejs_cart_id', data.cart_token)
          #CommercejsDebug('success', 'New cart session (token) created', 'Created new cart session (token). Cart id is ' + data.cart_token);
          return data.cart_token


    add: (data, callback) ->
      return @m.Request 'cart/' + @cart_id, 'POST', data, callback

    retrieve: (data, callback) ->
      return @m.Request 'cart/' + @cart_id, 'GET', null, callback

		capture: (token, data, callback) ->
		  return @m.Request 'checkout/'+token, 'POST', data, callback

    ###
    Will do later
    id: (reset = false, cart_token = false) ->

      #If using current cart token
      if not reset and not cart_token and @m.Storage.get('commercejs_cart_id') != null
        return @m.Storage.get('commercejs_cart_id');

      #if no cart token set to activate
      if not cart_token
        return @m.Request 'cart', 'GET', null, (data) ->
          new Commerce.Storage().set('commercejs_cart_id', data.cart_token)
          return data.cart_token

      #if cart token set
      if cart_token
        @m.Storage.set 'commercejs_cart_id', cart_token
        @cartId = cart_token
        return cart_token
      ###

    Event: ->
        ###
        myEvent = new CustomEvent('Chec',
                                  'detail': {
                                            first: "Chalupa",
                                            last: "Batman",
                                            random: Math.round(Math.random() * 1000)
                                            }
                                  )
        document.dispatchEvent myEvent
        ###
