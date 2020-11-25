import React, { Component } from "react";
import { Drawer } from "antd";
import _ from "lodash";
import Router, { withRouter } from "next/router";
import { AutoComplete } from "antd";
import { connect } from "react-redux";
import actions from "../../../redux/actions";

class SearchDrawer extends Component {
    state = {
        placement: "right",
        searchOptions: [],
        searchValue: "",
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.onCloseDrawer()
        Router.push("/search/[slug]", "/search/" + this.state.searchValue);
    };

    componentDidUpdate(prevProps) {
        let {
            listing: { getSearchKeywords },
        } = this.props;

        if (
            getSearchKeywords !== prevProps.listing.getSearchKeywords &&
            getSearchKeywords
        ) {
            let searchOpts = [];
            getSearchKeywords.map((opt) => {
                let ele = { value: opt };
                searchOpts.push(ele);
            });

            this.setState({
                searchOptions: searchOpts,
            });
        }
    }

    onChange = (e) => {
        this.setState({
            placement: e.target.value,
        });
    };

    render() {
        const { placement } = this.state;
        let { parentCate } = this.props;

        return (
            <>
                <Drawer
                    title="Search"
                    placement={placement}
                    closable={false}
                    onClose={this.props.onCloseDrawer}
                    visible={this.props.showDrawer}
                    key={placement}
                    className="mobile-menu-drawer search-drawer"
                >
                    <div className="menu-list alldepart">
                        <form onSubmit={this.handleSubmit}>
                            <AutoComplete
                                value={this.state.searchValue}
                                options={this.state.searchOptions}
                                style={{
                                    width: "100%",
                                }}
                                onSelect={(select) => {
                                    this.props.onCloseDrawer()
                                    Router.push("/search/[slug]", "/search/" + select);
                                    this.setState({ searchValue: select });
                                }}
                                onSearch={(search) => {
                                    this.props.getSearchKeywords(search);
                                    this.setState({ searchValue: search });
                                }}
                                placeholder="Search for products, brands and more"
                            />
                        </form>
                    </div>
                </Drawer>
            </>
        );
    }
}

export default connect((state) => state, actions)(withRouter(SearchDrawer));
