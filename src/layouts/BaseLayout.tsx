import BaseLayoutApp from './BaseLayoutApp'

import { store } from '@/store'
import { Provider } from 'react-redux'

const layout = ({ children }:any) => {


    return (
        <>  
            <Provider store={store}>
                <BaseLayoutApp>
                    {children}
                </BaseLayoutApp>
            </Provider>
        </>
    )
};
export default layout;