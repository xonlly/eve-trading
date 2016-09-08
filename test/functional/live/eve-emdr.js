
import live from '../../../src/getter/live'

import expect from 'expect'

describe('eve-emdr',function(){

    it('init', function () {
        return live.init()
    })

    it('disconnect', function () {
        return live.disconnect()
    })

    it('try parse data', function ( done ) {

        let isDone = false

        live.init()
        live.listen( r => {

            if ( r.length && !isDone ) {


                live.disconnect()
                isDone = true
                done()
            }

        } )
    })

})
