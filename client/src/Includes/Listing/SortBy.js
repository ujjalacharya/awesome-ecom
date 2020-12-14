import React from 'react';
import { Row, Col } from "antd";

const SortBy = (props) => {
    return (
        <div>
            <ul className="sort-filter">
                <li onClick={() => { props.sortProducts('asc'); props.closeThisFilter(); }}>Ascending</li>
                <li onClick={() => { props.sortProducts('desc'); props.closeThisFilter(); }}>Descending</li>
            </ul>
            <div className="sticky-filter inside-filter-sticky">
                <Row style={{ width: "100%" }}>
                    <Col span={12}>
                        <div className="filter-type" onClick={props.closeThisFilter}>
                            <span>CLOSE</span>
                        </div>
                    </Col>
                    <Col span={12}>
                        <div
                            className="filter-type apply-type removeBorder"
                            onClick={props.closeThisFilter}
                        >
                            <span>APPLY</span>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default SortBy