import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DragLayer } from 'react-dnd';
import PersonPreview from './components/people/PersonCardDragPreview';

const layerStyle = {
  position: 'fixed',
  pointerEvents: 'none',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  zIndex: 10000,
};

const previewMap = {
    person: PersonPreview,
};

export class CustomDragLayer extends Component {
    static propTypes = {
        isDragging: PropTypes.bool.isRequired,
    };

    getItem = () => {
        const { item, offset, itemType } = this.props;
        const PreviewComponent = previewMap[itemType];
        if (!offset || !PreviewComponent) return null;

        const { x, y } = offset;
        const style = {
            transform: `translate(${x}px, ${y}px)`,
        };

        return (
            <div style={style}>
                <PreviewComponent {...item} />
            </div>
        );
    };

    render() {
        const { isDragging } = this.props;
        if (!isDragging) return null;
        const item = this.getItem();

        if (!item) return null;

        return (
            <div style={layerStyle}>
                {item}
            </div>
        );
    }
}

const collect = (monitor) => {
    return {
        isDragging: monitor.isDragging(),
        offset: monitor.getSourceClientOffset(),
        item: monitor.getItem(),
        itemType: monitor.getItemType(),
    };
};

export default DragLayer(collect)(CustomDragLayer);
