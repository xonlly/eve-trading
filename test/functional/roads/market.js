
import Market from '../../../src/getter/roads/market'

import expect from 'expect'

describe('market',function(){

    beforeEach(function () {

        this.market = new Market( this.options )

    })

    it('try hydrate from eveonline market orders', function ( done ) {

        this.market.getOrdersAll([ 10000002 ])
            .then( data => {

                expect( data )
                    .toExist()
                    .toBeA( Object )
                    .toIncludeKeys( [ 'items', 'totalCount', 'next', 'pageCount' ] )

                data.items.map( r => {
                    expect( r )
                        .toBeA( Object )
                        .toIncludeKeys(["buy", "issued", "price", "volume", "duration", "id", "minVolume", "volumeEntered", "range", "stationID", "type"])

                })

                done()

            })

    })

})
