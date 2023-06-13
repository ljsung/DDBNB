import { SET_REVIEWMODAL } from "../modules/reviewmodal";
import reviewList from "../data/reviewList.json";
import { GET_REVIEW, GET_REVIEWLIST, PUT_REVIEW, POST_REVIEW, DELETE_REVIEW } from '../modules/ReviewModule';


export function getReviewList(page) {

    return async function (dispatch, getState) {

        dispatch({ type: SET_REVIEWMODAL, payload: reviewList });
    }
}



// 전체 리뷰 리스트 조회
export const callReviewListAPI = ({ currentPage }) => {

    // const token = window.localStorage.getItem('jwtToken');

    let URL;

    if (currentPage !== undefined || currentPage !== null) {
        URL = `http://localhost:8080/api/v1/reviews?page=${currentPage}`;
    } else {
        URL = 'http://localhost:8080/api/v1/reviews';
    }


    return async (dispatch, getState) => {

        const result = await fetch(URL, {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                "Accept": "*/*",
                // "Auth": token
            }
        })
            .then(response => response.json());

        if (result.status === 200) {
            dispatch({ type: GET_REVIEWLIST, payload: result.data });
            
            // console.log(result);
        }
    };
}



/* 상세 조회 */
export const callReviewDetailAPI = ({ reviewId }) => {

    const URL = `http://localhost:8080/api/v1/reviews/${reviewId}`;

    // const token = window.localStorage.getItem('jwtToken');

    return async (dispatch, getState) => {

        const result = await fetch(URL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
                // "Auth": token
            }
        })
            .then(response => response.json())

        if (result.status === 200) {
            dispatch({ type: GET_REVIEW, payload: result.data.reviews });
        }
        else {
            console.log("데이터 안돼");
        }

    };
}