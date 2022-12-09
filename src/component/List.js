import { useState} from "react";
import MapContainer from './MapContainer';
const {kakao} = window;

const List =() =>{
    /**데이터를 저장할 빈 배열 */
    const [checkedList, setCheckedList] = useState([]);


        /** onClick 이벤트로 눌렀을시 배열에 해당 카테고리 저장. 한번더 누르면 삭제 */
        function onListDataHandler(e){
            e.preventDefault();
            // this.toggleClass("active"); //카테고리 활성화 
            if(checkedList.indexOf(e.target.value)<0){
            setCheckedList(checkList => [...checkedList, e.target.value]); //배열에 이 카테고리 값을 넣는다
            }else{
            setCheckedList(checkList => checkedList.filter(List => List !== e.target.value)); //배열에 이 카테고리값을 제거한다
            }
            console.log(checkedList);
        }


    return(
        <>
            <button value='한식' className="category_box" onClick={onListDataHandler}>한식</button>
            <button value='중식' className="category_box" onClick={onListDataHandler}>중식</button>
            <button value='일식' className="category_box" onClick={onListDataHandler}>일식</button>
            <button value='분식' className="category_box" onClick={onListDataHandler}>분식</button>
            <div>{checkedList}</div>
            <div className = "map_wrap">
                <MapContainer searchPlace={checkedList} />
                <ul id="placeList"></ul>
            </div>
        </>
    )
}

export default List;