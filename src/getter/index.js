

import roads from './roads'
import live from './live'


live.init()


export default ( ...args ) => ({
    roads : roads( ...args ),
    live
})
