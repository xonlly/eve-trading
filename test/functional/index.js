
import config from '../../src/config'

describe('functional',function(){

    beforeEach(function () {

        this.options = {
            config,
            mysql : false // add wercker db
        }

    })

    require('./live')

    require('./roads')

})
