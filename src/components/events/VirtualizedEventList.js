import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Table, Column, InfiniteLoader } from 'react-virtualized';
import {
    moduleName,
    fetchLazy,
    selectEvent,
    eventListSelector
} from '../../ducks/events';
import 'react-virtualized/styles.css';

export class EventList extends Component {
    static propTypes = {
        loaded: PropTypes.bool.isRequired,
        fetchLazy: PropTypes.func.isRequired,
        selectEvent: PropTypes.func.isRequired,
    };

    componentDidMount() {
        this.props.fetchLazy();
    }

    handleRowClick = ({ rowData: { uid }}) => {
        this.props.selectEvent(uid);
    };

    rowGetter = ({ index }) => this.props.events[index];

    isRowLoaded = ({ index }) => index < this.props.events.length;

    loadMoreRows = () => {
        console.log('---', 'load more');
        this.props.fetchLazy();
    };

    render() {
        return (
            <InfiniteLoader
                isRowLoaded={this.isRowLoaded}
                rowCount={this.props.loaded ? this.props.events.length : this.props.events.length + 1}
                loadMoreRows={this.loadMoreRows}
            >
                {
                    ({ onRowsRendered, registerChild }) => (
                        <Table
                            ref={registerChild}
                            rowGetter={this.rowGetter}
                            rowCount={this.props.events.length}
                            width={700}
                            height={300}
                            headerHeight={50}
                            rowHeight={40}
                            overscanRowCount={5}
                            onRowClick={this.handleRowClick}
                            onRowsRendered={onRowsRendered}
                        >
                            <Column
                                label="title"
                                dataKey="title"
                                width={350}
                            />
                            <Column
                                label="where"
                                dataKey="where"
                                width={250}
                            />
                            <Column
                                label="when"
                                dataKey="month"
                                width={150}
                            />
                        </Table>
                    )
                }
            </InfiniteLoader>
        );
    }
}

export default connect(state => ({
    events: eventListSelector(state),
    loaded: state[moduleName].loaded,
}), { fetchLazy, selectEvent })(EventList);
