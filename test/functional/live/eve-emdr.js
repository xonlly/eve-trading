
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

        var demoData = { version: '0.1',
          uploadKeys: [ { name: 'EMDR', key: 'CREST' } ],
          rowsets:
           [ { typeID: 17889,
               rows: [],
               regionID: 10000013,
               generatedAt: '2016-09-08T20:00:14.616867Z' },
             { typeID: 2281,
               rows: [],
               regionID: 10000013,
               generatedAt: '2016-09-08T20:00:14.616867Z' } ],
          resultType: 'orders',
          generator: { version: '0.1.0', name: 'eve-marketdata.com' }
      }

      const parsed = live.parse( demoData )

      done()

    })

})
