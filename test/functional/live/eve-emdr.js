
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
               rows: [
                   [ 90100000,
                    4,
                    32767,
                    4515573533,
                    5,
                    1,
                    true,
                    '2016-07-07T14:41:44+00:00',
                    90,
                    60012199,
                    30001015 ],
                  [ 90100101,
                    3,
                    32767,
                    4561990003,
                    3,
                    1,
                    true,
                    '2016-08-23T01:09:01+00:00',
                    90,
                    60012880,
                    30001016 ],
               ],
               regionID: 10000013,
               generatedAt: '2016-09-08T20:00:14.616867Z' },
             { typeID: 2281,
               rows: [
                   [ 90100005.04,
                     2,
                     32767,
                     4580966170,
                     4,
                     1,
                     true,
                     '2016-07-20T20:02:02+00:00',
                     90,
                     60012898,
                     30001041 ],
                   [ 175000000,
                     1,
                     32767,
                     4591146003,
                     1,
                     1,
                     false,
                     '2016-07-15T00:18:00+00:00',
                     90,
                     60012904,
                     30001048 ],
                   [ 220000000,
                     1,
                     32767,
                     4611927923,
                     1,
                     1,
                     false,
                     '2016-08-16T04:10:26+00:00',
                     90,
                     60012778,
                     30001048 ],
                   [ 90100101.01,
                     2,
                     32767,
                     4615814077,
                     2,
                     1,
                     true,
                     '2016-08-23T01:41:21+00:00',
                     90,
                     60012754,
                     30001021 ]
               ],
               regionID: 10000013,
               generatedAt: '2016-09-08T20:00:14.616867Z' } ],
          resultType: 'orders',
          generator: { version: '0.1.0', name: 'eve-marketdata.com' },
          currentTime: '2016-09-08T21:18:18.197250Z',
          columns:
           [ 'price',
             'volRemaining',
             'range',
             'orderID',
             'volEntered',
             'minVolume',
             'bid',
             'issueDate',
             'duration',
             'stationID',
             'solarSystemID' ]
        }


      const parsed = live.parse( demoData )

      expect( parsed )
        .toExist()
        .toBeA( Object )
        .toIncludeKeys( [ 'version', 'rowsets', 'resultType', 'currentTime', 'columns' ])

        parsed.rowsets.map( r => {
            expect( r )
                .toBeA( Object )
                .toIncludeKeys( [ 'regionID', 'rows', 'typeID' ])

            r.rows.map( l => {
                expect( l )
                    .toBeA( Object )
                    .toIncludeKeys( parsed.columns )
            })
        } )

      done()

    })

})
