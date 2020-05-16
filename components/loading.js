import { Spin } from 'antd'
export default ()=>{
    return <>
    <div className="loading">
        <Spin />
    </div>
    <style jsx>{`
        .loading{
            position:fixed;
            top:0;
            right:0;
            bottom:0;
            left:0;            
            background:rgba(0,0,0,0.1);
            display:flex;
            align-items:center;
            justify-content:center;
            z-index:9;
        }
    `}</style>
    </>
}