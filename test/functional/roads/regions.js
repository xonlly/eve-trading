
import Regions from '../../../src/getter/roads/region_id'

import expect from 'expect'

describe('regions',function(){

    beforeEach(function () {

            this.regions = new Regions( this.options )

    })

    it('get all regions on dataset', function ( done ) {

        const regions = this.regions.get()

        expect( regions )
            .toExist()
            .toBeA( Array )

        regions.map( r => {
            expect( r )
                .toIncludeKeys([ 'id', 'name' ])
        })

        done()

    })

    it('get by name region', function ( done ) {


        const name = this.regions.get()[0].name

        expect( this.regions.getByName( name ) )
            .toExist()
            .toBeA( Object )
            .toIncludeKeys([ 'id', 'name' ])

        done()

    })

    it('get by id region', function ( done ) {

        const id = this.regions.get()[0].id

        expect( this.regions.getById( id ) )
            .toExist()
            .toBeA( Object )
            .toIncludeKeys([ 'id', 'name' ])

        done()

    })

})
