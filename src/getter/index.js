

import roads from './roads'
import live from './live'


export default ( ...args ) => {

    live.init( ...args )

    return {
        roads : roads( ...args ),
        live
    }
}
