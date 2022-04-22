import BaseLayoutApp from './BaseLayoutApp'


const layout = ({ children }:any) => {


    return (
        <>  
            <BaseLayoutApp>
                {children}
            </BaseLayoutApp>
        </>
    )
};
export default layout;