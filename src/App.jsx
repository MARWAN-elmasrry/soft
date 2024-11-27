import React, { Component } from 'react';
import './app.css';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            UserName: '', // State for dynamic name
            UserPass: '', // State for dynamic password
            rows: [], // Initially empty, filled dynamically
        };
    }

    handleName = (event) => {
        this.setState({ UserName: event.target.value });
    };

    handlePass = (event) => {
        this.setState({ UserPass: event.target.value });
    };

    generateRows = () => {
        const { UserName, UserPass } = this.state;
        if (!UserName || !UserPass) {
            alert('Please enter both a name and a password!');
            return;
        }

        const rows = Array.from({ length: 1000 }, (_, index) => ({
            id: index,
            user: `${UserName}${index + 1}`,
            pass: UserPass,
            status: null,
        }));

        this.setState({ rows });
    };

    handleRemove = (id) => {
        this.setState((prevState) => ({
            rows: prevState.rows.filter((row) => row.id !== id),
        }));
    };

    handleOk = (id) => {
        this.setState((prevState) => ({
            rows: prevState.rows.map((row) =>
                row.id === id ? { ...row, status: 'ok' } : row
            ),
        }));
    };

    render() {
        return (
            <>
                <h1>Mail Generator</h1>
                <div>
                    <input
                        type="text"
                        placeholder="Name"
                        onChange={this.handleName}
                    />
                    <input
                        type="text"
                        placeholder="Password"
                        onChange={this.handlePass}
                    />
                    <button onClick={this.generateRows}>Generate</button>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>User</th>
                            <th>Pass</th>
                            <th>OK or Not</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.rows.map((row) => (
                            <tr key={row.id}>
                                <td
                                    style={{
                                        backgroundColor:
                                            row.status === 'ok' ? 'green' : 'transparent',
                                    }}
                                >
                                    {row.user}
                                </td>
                                <td
                                    style={{
                                        backgroundColor:
                                            row.status === 'ok' ? 'green' : 'transparent',
                                    }}
                                >
                                    {row.pass}
                                </td>
                                <td>
                                    <button onClick={() => this.handleOk(row.id)}>Ok</button>
                                    <button onClick={() => this.handleRemove(row.id)}>Not</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </>
        );
    }
}

export default App;
