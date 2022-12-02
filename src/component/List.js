import { useState, useEffect } from "react";
import $ from "jquery";
const {kakao} = window;

const List =() =>{
    /**데이터를 저장할 빈 배열 */
    const [checkedList, setCheckedList] = useState([]);


        /** onClick 이벤트로 눌렀을시 배열에 해당 카테고리 저장. 한번더 누르면 삭제 */
        function onListDataHandler(e){
            e.preventDefault();
            $(".category_box").toggleClass("active"); //카테고리 활성화 
            if(checkedList.indexOf(e.target.value)<0){
            console.log(checkedList);
            setCheckedList([...checkedList, e.target.value]); //배열에 이 카테고리 값을 넣는다
            console.log(checkedList);
            console.log(1);
            }else{
            console.log(checkedList);
            setCheckedList(checkedList.filter(List => List !== e.target.value)); //배열에 이 카테고리값을 제거한다
            console.log(checkedList);
            console.log(2);

            }
            
            console.log(checkedList);
        }
         useEffect(()=>{
                /** 지도 표시할 div */
                const mapContainer = document.getElementById('map'),
                mapOption = {
                    center : new kakao.maps.LatLng(37.545062939083124,127.05564810533315), /** 회사위치 */
                    level : 3
                };

                /** 지도 생성 */

                const map = new kakao.maps.Map(mapContainer, mapOption);
            },[])
         
            
            

            let ps = new kakao.maps.services.Places(); //카카오 장소검색 객체

                /** 키워드로 장소를 검색 */
                checkedList.forEach(searchPlaces);

                /** 장소검색 함수 */
            function searchPlaces(element, index, array){

                let keyword = checkedList[index].element;

                if(!keyword.replace(/^\s+|\s+$/g, '')){
                    alert('키워드를 입력하세요'); 
                    return false;
                }

                ps.keywordSearch(keyword, placeSearchCB);
            }

               /** 장소검색 완료시 콜백함수 */
            function placeSearchCB(data, status, pagination){
                if(status === kakao.maps.services.Status.OK){
                    /**정상 검색시 목록과 마커 출력 */
                    displayPlaces(data);

                    /**페이지 번호 표출 */
                    displayPagination(pagination);
                }else if(status === kakao.maps.services.Status.ZERO_RESULT){
                    alert('검색 결과 없음');
                    return;
                }else if(status === kakao.maps.services.Status.ERROR){
                    alert('검색 중 오류 발생');
                    return;
                }
            }
            


function displayPlaces(places){

    let listEl = document.getElementById('placesList'),
        menuEl = document.getElementById('menu_wrap'),
        fragment = document.createDocumentFragment(),
        bounds = new kakao.maps.LatLngBounds(),
        listStr = '';

        /** 검색결과 목록에 추가된 항목 제거 */
        removeAllChildNods(listEl);


        for (let i=0; i<places.length; i++){

            /** 마커 생성하고 지도에 표시 */
            let placePosition = new kakao.maps.LatLng(places[i].y,places[i].x),
                itemEl = getListItem(i, places[i]);

                /** 검색된 장소들 위치를 기준으로 지도범위를 재설정 */
                /** LatLngBounds 객체에 좌표 추가 */
                bounds.extend(placePosition);

                fragment.appendChild(itemEl);
            }

                /** 검색결과 데이터를 목록에 추가함 */
                listEl.appendChild(fragment);
                menuEl.scrollTop = 0;
}

            /** 목록 추가하는 함수 */
            function getListItem(index, places){
                let el = document.createElement('li'),
                itemStr = '<span class="markerbg marker_' + (index+1) + '"></span>' +
                            '<div class="info">' +
                            '   <h5>' + places.place_name + '</h5>';

                if (places.road_address_name) {
                    itemStr += '    <span>' + places.road_address_name + '</span>' +
                                '   <span class="jibun gray">' +  places.address_name  + '</span>';
                } else {
                    itemStr += '    <span>' +  places.address_name  + '</span>'; 
                }
                            
                itemStr += '  <span class="tel">' + places.phone  + '</span>' +
                            '</div>';           

                el.innerHTML = itemStr;
                el.className = 'item';

                return el;
            }

            /** 검색 결과 페이지 번호 출력 함수 */
            function displayPagination(pagination) {
                let paginationEl = document.getElementById('pagination'),
                    fragment = document.createDocumentFragment(),
                    i; 

                // 기존에 있던 페이지 번호 삭제
                while (paginationEl.hasChildNodes()) {
                    paginationEl.removeChild (paginationEl.lastChild);
                }

                for (i=1; i<=pagination.last; i++) {
                    let el = document.createElement('a');
                    el.href = "#";
                    el.innerHTML = i;

                    if (i===pagination.current) {
                        el.className = 'on'; 
                    } else {
                        el.onclick = (function(i) {
                            return function() {
                                pagination.gotoPage(i);
                            }
                        })(i);
                    }

                    fragment.appendChild(el);
                }
                paginationEl.appendChild(fragment);
            }

                /** 검색결과 자식 Elment 제거 함수 */
                function removeAllChildNods(el) {   
                    while (el.hasChildNodes()) {
                        el.removeChild (el.lastChild);
                    }
                }
            

    return(
        <>
            <button value='한식' className="category_box" onClick={onListDataHandler}>한식</button>
            <button value='중식' className="category_box" onClick={onListDataHandler}>중식</button>
            <button value='일식' className="category_box" onClick={onListDataHandler}>일식</button>
            <button value='분식' className="category_box" onClick={onListDataHandler}>분식</button>

            <div className="map_wrap">
            <div id="map" style={{width:'500px', height:"500px",position:"relative",overflow:"hidden"}}></div>

            <div id="menu_wrap" className="bg_whtie">
                <div className="option">
                    <div>
                    </div>
                </div>
                <hr/>
                <ul id="placeList"></ul>
                <div id="pagination"></div>
            </div>
        </div>
        </>
    )
}

export default List;