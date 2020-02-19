import React, {Suspense} from 'react'

function WaitingComponent (Component){
    return props => (
        <Suspense fallback={`...Loading`}>
            <Component {...props} />
        </Suspense>
    );
}

export default WaitingComponent