import React from "react";

class Lang extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 'EN',
        };
    }

    render() {
        return (
            <button
            className="block inline-block mt-4 px-3 py-2 lg:mt-0 leading-none border border-interactive text-interactive"
            // onClick={() => this.setState({value: 'RU'})}
            >
                {this.state.value}
            </button>
        );
    }
}

export default Lang;
