import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { store } from '../../app/store'
import { createBrowserHistory } from 'history';
import { getParkDetail } from './ParkUtil';
import { naverInitMap, naverInitPano } from './ParkMap';
import { ParkAroundPlaces } from './ParkAroundPlaces';

export function ParkDetail() {
    const history = createBrowserHistory();
    const navigate = useNavigate();
    const { parkIdx } = useParams();
    const [parkDetail, setParkDetail] = useState({});
    const location = useLocation();
    
    useEffect(() => {
        //document.querySelectorAll("META")[4].content = document.title + ":::" + location.state.parkName;
        window.scrollTo(0, 0);
        history.listen(({action}) => {
            if(action === 'POP') {
                //dispatch(backToMainList());
                if(store.getState().search.conditions != '') {
                    navigate(`/?condition=${store.getState().search.conditions}`);
                }
                else {
                    navigate(`/`);
                }
            }
        });
        
        const fetchDetail = async () => {
            let fetch = null;
            if(store.getState().search.baseList.length > 0) {
                fetch = store.getState().search.baseList[parkIdx-1];
            }
            else {
                fetch = await getParkDetail(parkIdx);
            }
            setParkDetail(fetch);
        }
        fetchDetail();
    }, []);

    useEffect(() => {
        if(parkDetail != null) {
            naverInitMap(parkDetail.lat, parkDetail.lng);
            naverInitPano(parkDetail.lat, parkDetail.lng);
        }
    },[parkDetail]);
    
    const goList = () => {
        if(store.getState().search.conditions != '') {
            navigate(`/?condition=${store.getState().search.conditions}`);
        }
        else {
            navigate(`/`);
        }
    }

    const gotoHome = (e, templateUrl) => {
        e.preventDefault();
        window.open(templateUrl, '_blank');
    }

    const pop = (e, guidanceUrl) => {
        e.preventDefault();
        window.open(guidanceUrl, '_blank');
    }

    return (
        <section>
            <div id="detail" className="detail">
                <div className="btn_area">
                    <button type="button" onClick={() => goList()}>목록</button>
                </div>
                <hr />
                <div id="info">
                    <h2 className="hide">전체개요</h2>
                    <h3 className="hide">공원명</h3>
                    <p><span className="sp_title">{parkDetail.name}</span></p>
                    <div className="info_content">
                        <div className="info_map">
                            <div className="thumbnail">
                                <h3 className="hide">썸네일</h3>
                                <p><span className="sp_thumbnail">
                                    <img src={parkDetail.img} width={360} height={300}></img>
                                    <a href="#" onClick={(e) => pop(e, parkDetail.guidance)}>
                                        <img src={parkDetail.guidance} width={360} height={300}></img>
                                    </a>
                                </span></p>
                            </div>
                            <div className="visit_map">
                                <h2>{parkDetail.address}</h2>
                                <div id="map" className="park_map">
                                </div>
                            </div>
                        </div>
                        <div className="park_intro">
                            <h3 className="hide">공원 설명</h3>
                            <textarea className="ta_detail" cols={80} rows={10} value={parkDetail.content} readOnly>
                            </textarea>
                        </div>
                        <div id="pano" className="park_pano">
                        </div>
                        <div className="etcs">
                            <div className="main_equip">
                                <h2 className="hide">시설</h2>
                                <h3>주요시설</h3>
                                <p>{parkDetail.main_equip}</p>
                                <hr/>
                                <h3>주요식물</h3>
                                <p>{parkDetail.main_plants}</p>
                                <hr/>
                                <h3>유의사항</h3>
                                <p>{parkDetail.use_refer}</p>
                            </div>
                            <div className="adminpart">
                                <h2 className="hide">관리부서</h2>
                                <h3>관리부서</h3>
                                <div>
                                    <p>{parkDetail.adminpart}</p>
                                    <p>{parkDetail.admintel}</p>
                                </div>
                                <hr/>
                                <p><button onClick={(e) => gotoHome(e, parkDetail.template)}>홈페이지 바로가기</button></p>
                                {/* <p>{parkDetail.template}</p> */}
                            </div>
                        </div>
                        <div className="visit_road">
                            <h2>주변 정보</h2>
                            <div id="around_map" className="around_map">
                            </div>
                            <ParkAroundPlaces lat={parkDetail.lat} lng={parkDetail.lng} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}