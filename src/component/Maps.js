import React, {useEffect} from "react";
import { Link } from 'react-router-dom';

const Maps= () =>{

    return(
        <>
            <div style={{width:'100%',height:'30%',backgroundColor:'lightgreen',position:'absolute',top:'0px'}}>
                <div style={{position:'relative', top:'0px',left:'0px',border:'1px solid red',width:'100%',height:'100%'}}>
                    <div style={{position:'absolute' ,top:'40%', left:'42%', fontSize:'0.9em'}}>
                        <h2>대상 선정</h2>
                    </div>
                    <div style={{position:'absolute', top:'40%',right:'10%'}}>
                        <button style={{width:'100px',height:'60px',fontSize:'0.9em'}}>위치 설정</button>
                    </div>
                </div>
            </div>
            <section style={{position:'absolute',top:'40%',left:'30%'}}>
                <div style={{display:'flex'}}>
                    <Link to="/List"><div style={{width:'300px', height:'80px', border:'1px solid red', marginRight:'20px'}}>카테고리 검색</div></Link>
                    <div style={{width:'300px', height:'80px', border:'1px solid red'}}>현위치 검색</div>
                </div>
            </section>
        </>
    )
}

export default Maps;
