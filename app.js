const { Component } = React;
const { render } = ReactDOM;
const { Switch, Link, Route, HashRouter, Redirect } = ReactRouterDOM;
const api = "https://acme-users-api-rev.herokuapp.com/api/companies";

const Nav = () => {
    return (
        <nav>
            <Link to="/">Acme Company Profits with React Router</Link>
            <Link to="/companies">Companies</Link>
        </nav>
    )
}

const Welcome = () => {
    return (
        <h1>Welcome!!</h1>
    )
}

const Companies = (props) => {
    const {companies} = props;
    return (
        <ul>
            {companies.map((company, idx) => {
                return (
                    <li key={idx}>
                        <Link to={`/companies/${company.id}`}>{company.name}</Link>
                    </li>
                );
            })}
        </ul>
    )
}

class Profit extends React.Component {
    constructor() {
        super();
        this.state = {
            profits: []
        };
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        axios
          .get(api+'/'+id+'/companyProfits')
          .then(response => this.setState({ profits: response.data }));
    }

    render() {
        const {profits} = this.state;
        return (
            <ul>
            {profits.map((profit, idx) => {
                return (
                    <li key={idx}>
                        {profit.amount}
                    </li>
                );
            })}
            </ul>
        )
    }
}

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            companies: []
        };
    }

    componentDidMount() {
        axios
          .get(api)
          .then(response => this.setState({ companies: response.data }));
    }
    
    render() {
        const {companies} = this.state;
        //console.log(companies);
        return (
            <HashRouter>
                <Route component = {Nav} />
                <main>
                    <Route exact path='/' component = {Welcome} />
                    <Route exact path='/companies' render={
                        () => <Companies companies={companies}/>
                    } />
                    <Route path='/companies/:id' component = {Profit} />
                </main>  
            </HashRouter>
        );
    }
};

const root = document.querySelector('#root');
render(<App />, root);