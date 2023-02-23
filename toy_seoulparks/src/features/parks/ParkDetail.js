import React, { useState, useEffect } from 'react';
import { getParkDetail } from './ParkUtil';
import { useParams } from 'react-router-dom';

export function ParkDetail() {
    const { parkIdx } = useParams();
    const [parkDetail, setParkDetail] = useState({});

    const goList = () => {
        window.location.href=`/`;
    }

    const gotoHome = (e, templateUrl) => {
        e.preventDefault();
        window.open(templateUrl, '_blank');
    }

    const pop = (e, guidanceUrl) => {
        e.preventDefault();
        window.open(guidanceUrl, '_blank');
    }

    useEffect(() => {
        const fetchDetail = async () => {
            const fetch = await getParkDetail(parkIdx);
            setParkDetail(fetch);
        }
        fetchDetail();
    },[]);

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
                    <p><span className="sp_title">{parkDetail.name} (소재지 : {parkDetail.zone})</span></p>
                    <div className='info_content'>
                        <h3 className="hide">썸네일</h3>
                        <p><span className="sp_thumbnail">
                            <img src={parkDetail.img} width={400} height={300}></img>
                            <a href="#" onClick={(e) => pop(e, parkDetail.guidance)}>
                                <img src={parkDetail.guidance} width={400} height={300}></img>
                            </a>
                        </span></p>
                        <h3 className="hide">개장일</h3>
                        <p><span className="sp_opendt">{parkDetail.open_dt} 개장</span></p>
                        <h3 className="hide">공원 설명</h3>
                        <p>
                            <textarea className="ta_detail" cols={80} rows={15} value={parkDetail.content} readOnly>
                            </textarea>
                        </p>
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
                                <h2>관리부서</h2>
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
                            <h2>오시는길</h2>
                            <p>{parkDetail.visit_road}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}