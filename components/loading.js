import { Spin } from 'antd'
export default ()=>{
    return <>
    <div className="loading">
        <Spin />
    </div>
    <style jsx>{`
        .loading{
            position:fixed;
            width:100%;
            top:64px;
            height:calc(100% - 128px);
            background:rgba(0,0,0,0.1);
            display:flex;
            align-items:center;
            justify-content:center;
            z-index:9;
        }
    `}</style>
    </>
}