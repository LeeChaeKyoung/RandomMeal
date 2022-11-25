/* global kakao */
import React from "react";
const {kakao} = window;

function Maps() {
    /**마커를 담을 배열 */
    let markers = [];

    /** 지도 표시할 div */
    const mapContainer = document.getElementById('map'),
            mapOption = {
                center : new kakao.maps.LatLng(37.545062939083124,127.05564810533315), /** 회사위치 */
                level : 3
            };

    /** 지도 생성 */
    let map = new kakao.maps.Map(mapContainer, mapOption);

    /** 장소검색 객체 생성 */
    let ps = new kakao.maps.services.Places();

    /** 검색결과 목록이나 마커를 클릭했을때, 장소명을 보여줄 인포윈도우 만듬 */
    let infowindow = new kakao.maps.infowindow({zIndex:1});

    /** 키워드로 장소를 검색 */
    searchPlaces();

    /** 장소검색 함수 */
   function searchPlaces(){

    let keyword = document.getElementById('keyword').value;

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

            /** 지도에 표시되고있는 마커 제거(갱신) */
            removeMarker();

            for (let i=0; i<places.length; i++){

                /** 마커 생성하고 지도에 표시 */
                let placePosition = new kakao.maps.LatLng(places[i].y,places[i].x),
                    marker = addMarker(placePosition, i),
                    itemEl = getListItem(i, places[i]);

                    /** 검색된 장소들 위치를 기준으로 지도범위를 재설정 */
                    /** LatLngBounds 객체에 좌표 추가 */
                    bounds.extend(placePosition);

                    /**  목록에 마우스 오버시 지도마커 띄움*/
                    (function(marker, title) {
                        kakao.maps.event.addListener(marker, 'mouseover', function() {
                            displayInfowindow(marker, title);
                        });
            
                        kakao.maps.event.addListener(marker, 'mouseout', function() {
                            infowindow.close();
                        });
            
                        itemEl.onmouseover =  function () {
                            displayInfowindow(marker, title);
                        };
            
                        itemEl.onmouseout =  function () {
                            infowindow.close();
                        };
                    })(marker, places[i].place_name);
            
                    fragment.appendChild(itemEl);
                }

                    /** 검색결과 데이터를 목록에 추가함 */
                    listEl.appendChild(fragment);
                    menuEl.scrollTop = 0;

                    /** 데이터 기준으로 지도범위 재설정 */
                    map.setBounds(bounds);
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


   /** 마커 표시 함수 */
    function addMarker(position, idx, title) {
        let imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png', // 마커 이미지 url, 스프라이트 이미지를 사용(나중에 변경)
            imageSize = new kakao.maps.Size(36, 37),  // 마커 이미지의 크기
            imgOptions =  {
                spriteSize : new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
                spriteOrigin : new kakao.maps.Point(0, (idx*46)+10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
                offset: new kakao.maps.Point(13, 37) // 마커 좌표에 일치시킬 이미지 내에서의 좌표
            },
            markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions),
                marker = new kakao.maps.Marker({
                position: position, // 마커의 위치
                image: markerImage 
            });

        marker.setMap(map); // 지도 위에 마커를 표출합니다
        markers.push(marker);  // 배열에 생성된 마커를 추가합니다

        return marker;
    }

    /** 마커 제거 함수 */
        function removeMarker() {
            for ( let i = 0; i < markers.length; i++ ) {
                markers[i].setMap(null);
            }   
            markers = [];
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

        /** 목록, 마커 클릭시 인포윈도우에 장소명 표시 */
        function displayInfowindow(marker, title) {
            let content = '<div style="padding:5px;z-index:1;">' + title + '</div>';

            infowindow.setContent(content);
            infowindow.open(map, marker);
        }

        /** 검색결과 자식 Elment 제거 함수 */
        function removeAllChildNods(el) {   
            while (el.hasChildNodes()) {
                el.removeChild (el.lastChild);
            }
        }


  return (
    <>
        <div className="map_wrap">
            <div id="map" style={{width:'100%', height:"100%",position:"relative",overflow:"hidden"}}></div>

            <div id="menu_wrap" className="bg_whtie">
                <div class="option">
                    <div>
                        <form onSubmit={searchPlaces()}>
                        </form>
                    </div>
                </div>
                <hr/>
                <ul id="placeList"></ul>
            </div>
        </div>
        
    </>
  );
}

export default Maps;
