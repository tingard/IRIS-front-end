import React from 'react';
import { imageStyle } from '../componentStyles';
import templateReplies from '../templateReplies';
import TemplateSelectorButton from './TemplateSelectorButton';

class ImageDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = { template: 'none' };
    this.addDefaultResponse.bind(this);
  }
  addDefaultResponse(type) {
    if (document.getElementById('responsePanel').innerHTML === templateReplies[this.state.template]) {
      this.setState({
        template: type,
      });
    } else if (confirm('Do you really want to reload a template?')) {
      this.setState({
        template: type,
      });
    }
  }
  reply() {
    const reply = this.responsePanel.innerHTML;
    this.props.sendReply(reply, this.props.imageID);
    this.props.router.transitionTo('/');
  }
  render() {
    const imStyle = Object.assign({
      backgroundImage: `url(${this.props.image.imageUrl})`,
    }, imageStyle);
    const capitalisedTag = this.props.image.tag.substr(0, 1).toUpperCase() +
      this.props.image.tag.substr(1);
    const templateReply = {
      __html: templateReplies[this.state.template],
    };
    return (
      <div className="w3-row" style={{ marginTop: '15px' }}>
        <div className="w3-col m6 l4" style={{ marginBottom: '20px' }}>
          <div className="w3-container">
            <div className="w3-card-4" style={{ minHeight: '500px' }}>
              <header style={{ padding: '10px 0' }}>
                <div className="w3-container">
                  <span className="w3-badge w3-green">{this.props.image.level}</span>
                  <b> {capitalisedTag}</b>
                </div>
              </header>
              <div className="w3-display-container" style={imStyle} />
              <div className="w3-row-padding">
                {this.props.image.message}
              </div>
            </div>
          </div>
        </div>
        <div className="w3-col m6 l8" style={{ marginBottom: '20px' }}>
          <div className="w3-container">
            <div className="w3-container w3-card-4 w3-display-container" style={{ minHeight: '500px' }}>
              <div className="w3-row" style={{ height: '42px' }}>
                <div className="w3-btn-bar w3-border" style={{ marginTop: '3px' }}>
                  <TemplateSelectorButton clickFunction={() => this.addDefaultResponse('graph')}>
                    Graph
                  </TemplateSelectorButton>
                  <TemplateSelectorButton clickFunction={() => this.addDefaultResponse('image')}>
                    Image
                  </TemplateSelectorButton>
                  <TemplateSelectorButton clickFunction={() => this.addDefaultResponse('other')}>
                    Other
                  </TemplateSelectorButton>
                </div>
              </div>
              <div className="w3-row">
                <div
                  id="responsePanel"
                  ref={(ref) => { this.responsePanel = ref; }}
                  contentEditable="true"
                  style={{
                    width: '100%',
                    minHeight: '300px',
                    padding: '3px',
                  }}
                  dangerouslySetInnerHTML={templateReply}
                />
              </div>
              <div className="w3-display-bottomright" style={{ padding: '15px' }}>
                <button className="w3-btn" onClick={() => { this.reply(); }}>Reply</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ImageDetails.propTypes = {
  image: React.PropTypes.object,
  sendReply: React.PropTypes.func,
  imageID: React.PropTypes.number.isRequired,
  router: React.PropTypes.object,
};

export default ImageDetails;
