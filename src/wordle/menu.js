import React from "react";
import {SEED_URL_PREFIX} from "./wordleUtils.ts"
import './menu.css';
import './flex-common.css';

export const WORD = "Word";
export const DEFINITION = "Definition";
export const COPY = "Copy Sharable Link to Clipboard";

class MenuButton extends React.Component {
    render() {
        let content;
        if (this.props.hidden) {
            content = this.props.title;
        } else {
            content = this.props.content;
        }

        return (
          <div
              className={`menu-button hideable-${this.props.hidden}`}
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
            hiddenMap: new Map([
                [WORD, true],
                [DEFINITION, true],
                [COPY, true]
            ]),
        }
    }

    /** Handler Methods **/
    handleClick(title) {
        let hmap = this.state.hiddenMap;
        hmap.set(title, !hmap.get(title));
        this.setState({
            hiddenMap: hmap,
        })

    }

    handleClickDelayedReset(title) {
        this.handleClick(title);
        setTimeout(function(){
            let hmap = this.state.hiddenMap;
            hmap.set(title,  true);
            this.setState({hiddenMap: hmap});
        }.bind(this, title),700);
    }

    /** Render Methods **/
    render() {
        return (
          <div className={`menu`}>
              <MenuButton
                  hidden={this.state.hiddenMap.get(WORD)}
                  title={WORD}
                  content={this.props.word}
                  onClick={() => this.handleClick(WORD)}
              />
              <MenuButton
                  hidden={this.state.hiddenMap.get(DEFINITION)}
                  title={DEFINITION}
                  content={this.props.definition}
                  onClick={() => this.handleClick(DEFINITION)}
              />
              <MenuButton
                  hidden={this.state.hiddenMap.get(COPY)}
                  title={COPY}
                  content={"Copied!"}
                  onClick={() => {
                      navigator.clipboard.writeText(SEED_URL_PREFIX + this.props.seed);
                      this.handleClickDelayedReset(COPY)
                  }}
              />
          </div>
        );
    }
}

export class MenuBar extends React.Component {
    constructor(props) {
        super(props);
        console.log("MENU BAR CONSTRUCTOR")
        this.state = {
            expanded: false,
        };
    }

    /** Handle Methods **/
    toggleMenu() {
        this.setState({
            expanded: !this.state.expanded,
        });
    }

    /** Render Methods **/
    render() {
        let menu;
        if (this.state.expanded) {
            menu = <PopUp
                toggle={() => this.toggleMenu()}
                word={this.props.word}
                definition={this.props.definition}
                seed={this.props.seed}
            />
        }

        return (
            <div className={`menu-bar flex-container nowrap`}>
                <div className={`game-header menu-icon flex-item`}
                     onClick={() => this.toggleMenu()}>
                    <i className={`bi bi-list`} ></i>
                </div>
                <div className={`game-header flex-item`}>
                    <span>WORDLE+</span>
                </div>
                <div className={`game-header menu-icon flex-item`} style={{marginBottom: 5}}>
                </div>
                {menu}
            </div>
        );
    }
}

export default class PopUp extends React.Component {
    handleClick = () => {
        this.props.toggle();
    };
    render() {
        return (
            <div className="modal">
                <div className="modal_content">
                    <div className={`flex-item`} style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-start",
                        flexDirection: "row"}}>

                        <div className={`flex-item`}>
                            <span className="close" onClick={this.handleClick}>&times;</span>
                        </div>
                    </div>
                    <div className={`flex-item`}>
                        <Menu
                            word={this.props.word}
                            definition={this.props.definition}
                            seed={this.props.seed}
                        />
                    </div>
                </div>
            </div>
        );
    }
}