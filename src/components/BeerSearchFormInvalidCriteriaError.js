import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';

class BeerSearchFormInvalidCriteriaError extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showError : this.props.visible
    }
    this.onShowError = this.onShowError.bind(this);
    this.onHideError = this.onHideError.bind(this);
  };
  
  onShowError() {
    this.setState({hideError : false});
  }
  
  onHideError() {
    this.setState({hideError : true});
  }
  
  render() {
    const style = this.props.visible ? {} : {display : 'none'};
    
    return (
      <div style={style}> 
        <React.Fragment>
          <Container>
          <Row>
            <Col>
              <Alert key="danger" variant="danger">
                <small>YOU MUST ENTER A LOCATION</small>
              </Alert>
            </Col>
          </Row>
          </Container>
        </React.Fragment>
      </div>

    )
  }
};

export default BeerSearchFormInvalidCriteriaError;