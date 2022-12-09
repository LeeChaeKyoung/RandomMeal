import React, {useEffect} from "react";
import SearchPlace from './SearchPlace';

const {kakao} = window;

const MapContainer = () => {
    
    useEffect(()=>{
        const container = document.getElementById('inMap');
            const options = {
                    center : new kakao.maps.LatLng(37.545062939083124,127.05564810533315),
                    level: 3
            };
        const map = new kakao.maps.Map(container,options);
    }, []);

    function SearchList(searchPlace){
        console.log(1);
        const container = document.getElementById('inMap');
        const options = {
                center : new kakao.maps.LatLng(37.545062939083124,127.05564810533315),
                level: 3
        };
        const searchOption = {
            location : options.center,
            radius : 200,
            size: 5
        };
    let listEl = document.getElementById('placeList');

    const map = new kakao.maps.Map(container,options);

    const ps = new kakao.maps.services.Places();
    console.log(2);
    console.log(searchPlace);

    removeAllChildNods(listEl);
    for(let i=0 ;i<searchPlace.length;i++){
    ps.keywordSearch(searchPlace[i], placeSearchCB, searchOption);
    }
    console.log(3);


    function placeSearchCB(data, status, pagination){
        if(status === kakao.maps.services.Status.OK){
            let bounds = new kakao.maps.LatLngBounds();
            for(let i=0; i<data.length;i++){
                console.log(data[i]);
                displayMarker(data[i]);
                displayList(data[i]);
                bounds.extend(new kakao.maps.LatLng(data[i].y,data[i].x));
            }

            map.setBounds(bounds);
        }
    }

    function displayMarker(place) {
        let marker = new kakao.maps.Marker({
            map: map,
            position: new kakao.maps.LatLng(place.y, place.x) 
        });
    }

    function displayList(place){
        let menuEl = document.getElementById('menu_wrap'),
        fragment = document.createDocumentFragment();

        console.log(place.place_name);
        let itemEl = getListItem(place);

        fragment.appendChild(itemEl);
        // menuEl.scrollTop = 0;

        listEl.appendChild(fragment);

    }
            
    function getListItem(place,index){
        let el = document.createElement('li'),
        itemStr = '<span className="markerbg marker_' + (index+1) + '"></span>'+
                    '<div className="info">'+
                        '<h5>'+place.place_name+'</h5>';
           
            el.innerHTML = itemStr;
            el.className = 'item';

return el;
    }

    function removeAllChildNods(el) {   
        while (el.hasChildNodes()) {
            el.removeChild (el.lastChild);
        }
    }

    }

    return(
        <>
            <div id='inMap' style={{
                width:'500px',
                height:'500px',
                display:'none'
            }}>
            </div>
            <button onClick={SearchList}>서치</button>
        </>
    );    
}

export default MapContainer;                