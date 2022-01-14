import React from "react";
import './menu.css';
import './flex-common.css';

export const WORD = "word";
export const DEFINITION = "definition";

class Hideable extends React.Component {
    render() {
        let content;
        if (this.props.hidden) {
            content = this.props.title;
        } else {
            content = this.props.content;
        }

        return (
          <div
              className={`hideable hideable-${this.props.hidden}`}
              onClick={this.props.onClick}
          >
              {content}
          </div>
        );
    }
}

export class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            wordHidden: true,
            definitionHidden: true,
        }
    }

    /** Handler Methods **/
    handleClick(title) {
        let toggle;
        if (title === WORD) {
            toggle = !this.state.wordHidden;
            this.setState({
                wordHidden: toggle,
            })
        } else {
            toggle = !this.state.definitionHidden;
            this.setState({
                definitionHidden: toggle,
            })
        }
    }

    /** Render Methods **/
    render() {
        return (
          <div className={`menu`}>
              <Hideable
                  hidden={this.state.wordHidden}
                  title={WORD}
                  content={this.props.word}
                  onClick={() => this.handleClick(WORD)}
              />
              <Hideable
                  hidden={this.state.definitionHidden}
                  title={DEFINITION}
                  content={this.props.definition}
                  onClick={() => this.handleClick(DEFINITION)}
              />
          </div>
        );
    }
}